# MetBA website rebuild: plan

Status: **awaiting approval**. No app code will be written until this plan is approved.

Copy marked `[DRAFT]` is mine and needs your review. Items marked **(Q)** are open questions, collected in section 11.

---

## 1. What I found on the current site

- Logo (`/wp-content/uploads/2024/08/1efa…b3.png`) is a **white-only PNG** with no brand colour. So the accent falls back to the deep green `#1F4D47` from the brief, unless the SVG you send has a colour in it.
- The homepage and About page both carry the licensure claim ("verified professionals who are actively licensed", "verified by licenses in each respective jurisdiction"). None of this wording will be carried over.
- Leadership on the About page: Founding Board (Aaron Grinhaus, Madaline Zannes, Reggie Tan, Amy Trachter) and Global Advisory Board (Mitch Jackson, Harrison Jordan, Sherena Hussain, Michael Kasdan, Tara Frater, John Tengström). I will use these names in mock data, with placeholder bios marked `[DRAFT]` until you send the real ones. **(Q1)**
- Old URLs to redirect: `/about/`, `/members/`, `/events/`, `/become-a-member/`, `/login/`.

## 2. Stack and versions (checked on npm today)

| Piece | Choice | Version |
|---|---|---|
| Framework | Next.js App Router, TypeScript, React | next 16.4, react 19.3 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens), shadcn/ui restyled | tailwind 4.3, shadcn CLI 4.22 |
| Fonts | Instrument Serif (Google, via `next/font`), Geist Sans + Geist Mono (`geist` package) | geist 1.8 |
| Data | Supabase Postgres + Storage, RLS on every table | supabase-js 2.118, @supabase/ssr 0.12 |
| Auth | **Clerk** (recommendation below) | @clerk/nextjs 7.9 |
| Email | Resend + React Email | resend 6.34 |
| PDF | @react-pdf/renderer | 4.9 |
| Payments | Stripe, behind `FEATURE_PAYMENTS` flag, off by default | stripe 23 |
| Hosting | Vercel, Vercel Cron, Vercel Analytics + Speed Insights | |
| Spam protection | Cloudflare Turnstile (free) on public forms | |
| Tests | Vitest (unit), Playwright (e2e), pgTAP via Supabase CLI (RLS) | |

The tooling suggested "Vercel Workflow" for this project. I don't think it's needed: the only scheduled work is reminder emails, and Vercel Cron handles that.

### Auth recommendation: Clerk over Auth.js

Clerk, for four reasons:

1. **RLS works out of the box.** Supabase supports Clerk as a third-party auth provider. Supabase verifies the Clerk session token directly, so RLS policies can use `auth.jwt()->>'sub'`. The member-only directory relies on that. Auth.js doesn't issue tokens Supabase can verify. We would have to mint and sign our own Supabase JWTs and keep the secrets in sync, and that is where security bugs tend to appear.
2. **LinkedIn and magic links are built in.** Clerk supports LinkedIn (OpenID Connect) and email magic links with no custom code. Auth.js needs a separate email provider plus a database adapter.
3. **Auth.js v5 is still a beta** (`5.0.0-beta.32`), and the stable release (v4) is an older generation of the library. I'd rather not build member auth on either.
4. **Less to build.** Clerk includes session management, bot protection on sign-up, and MFA for admin accounts.

Trade-offs:

- Clerk is a hosted vendor, so user identities live outside our database. To limit this, profile data stays in Supabase and only identity lives in Clerk.
- It's free up to a generous monthly-user limit. MetBA's size should fit comfortably, but it is a paid service above that limit. **(Q2)**
- Roles (Admin, Editor) are kept in our own `admin_roles` table, not in Clerk metadata, so RLS can check them in SQL.

One more option: **Supabase Auth** also does magic links, LinkedIn OIDC and native RLS, with one vendor fewer. It wasn't on your list, so I'm only raising it. **(Q3)**

## 3. Design system

Revised after the design pass (typeset, bolder, colorize, critique, polish, animate). The original tokens from the brief read as an AI template, and you approved departing from them. Design context lives in `.impeccable.md`; tokens live in `src/app/globals.css`.

### Type

- **Display:** Libre Caslon Display, regular only, tightened tracking. Caslon is the typeface of legal printing.
- **Quotes:** Libre Caslon Text italic.
- **Text and UI:** Libre Franklin, a Franklin Gothic revival (the American newspaper sans).
- **No monospace and no all-caps labels.** Small labels are sentence-case Franklin (`text-kicker`, `text-meta`).
- **Scale:** perfect fourth (1.333). Fluid `clamp()` for display sizes; body text fixed at 17px with 1.65 line height.
- **Fallback:** a hand-tuned fallback face (Times at 90.3%) so the hero doesn't reflow when the web font loads (CLS 0).

### Colour (OKLCH)

| Token | Use | Contrast |
|---|---|---|
| `paper` oklch(0.972 0.004 150) | Page | |
| `ink` oklch(0.2 0.014 172) | Text, primary buttons | 16.7:1 |
| `graphite` oklch(0.34 0.014 172) | Secondary text | 10.8:1 |
| `subtle` oklch(0.5 0.014 172) | Metadata | 5.5:1 |
| `control` oklch(0.6 0.012 170) | Form control borders | 3:1+ |
| `brand` oklch(0.43 0.075 168) | Links, kickers, focus | 7.2:1 |
| `night` oklch(0.175 0.012 172) | Featured event, footer | |
| `deep` oklch(0.3 0.052 170) | Law-library green: announcement bar, join section | |
| `brass` oklch(0.79 0.1 80) | Small highlights on dark surfaces only | 9.7:1 on night |

- **Neutrals:** tinted toward the brand green, never beige or pure grey.
- **Dark mode:** pages sit one step lighter than the night sections, so the emphasis rhythm survives.

### Shape and motion

- **Shape:** radius 2 to 4px and 1px rules.
- **No framed cards on the homepage.** Lists are ruled rows.
- **Hero entrance:** copy rises in a short stagger. The photo settles from a slight zoom, and on desktop it also unveils with a left-to-right wipe. The wipe is desktop-only because on phones the photo is the LCP element.
- **Scroll moments:** two image wipes, triggered once.
- **Interaction:** button press state, underline colour transitions, the announcement bar fades out when dismissed.
- **Reduced motion:** everything is off under `prefers-reduced-motion`.

### Homepage composition

1. Split hero with an image that bleeds off the right edge
2. Proof as a sentence
3. Audience rows
4. Dark next-event section with a docket list of upcoming events
5. Two-column topics contents
6. Lead insight with a text sidebar
7. "The Docket" newsletter masthead (name is `[DRAFT]`)
8. Directory search line
9. Deep-green join band
10. Dark footer

`/styleguide` shows every token and component in both modes.

## 4. Routes

### Public

| Route | Notes |
|---|---|
| `/` | Homepage, see section 5 |
| `/about` | Mission, Founding Board, Advisory Board, partners, contact form |
| `/membership` | Who can join, benefits, how verification works (membership status only), FAQ |
| `/join` | Sign-up: Clerk sign-up, then a profile onboarding stepper, then "application received" |
| `/sign-in` | Clerk sign-in ("Log in" in the utility bar) |
| `/directory` | Search and filters. Shows a reduced view to the public and a full view to members. Disclaimer banner |
| `/directory/[slug]` | Profile, contact relay form, "Report this profile" |
| `/events` | Upcoming events |
| `/events/past` | Archive, filterable by topic, year and format |
| `/events/[slug]` | Upcoming view, or Recap view once the event has ended |
| `/events/[slug]/check-in` | Attendees enter the check-in code (logged in) |
| `/insights`, `/insights/[slug]` | List and article |
| `/topics`, `/topics/[topic]` | Topic index, plus one hub per topic: insights, events, recaps, members |
| `/for-students`, `/for-the-public` | Audience pages |
| `/search` | Site-wide search (Postgres full-text across insights, events and visible members) |
| `/certificates/[id]` | Public verification of a certificate |
| `/newsletter/confirm`, `/newsletter/unsubscribe` | Double opt-in confirmation and unsubscribe |
| `/privacy`, `/terms`, `/code-of-conduct`, `/accessibility`, `/cookies` | Policy pages |

### Member (`/account`, sign-in required)

`/account` (overview and verification status), `/account/profile`, `/account/visibility`, `/account/events` (registrations and certificates), `/account/cpd` (log, totals, export), `/account/privacy` (data export and delete).

### Admin (`/admin`, Admin or Editor role)

`/admin` (dashboard), `/admin/applications` (review queue), `/admin/members`, `/admin/reports`, `/admin/events` (with tabs: details, speakers, CPD, registrations, attendance, certificates, recap), `/admin/speakers`, `/admin/insights`, `/admin/sponsors`, `/admin/settings` (announcement bar, proof-strip thresholds, feature flags). Role management is Admin only.

### API and system routes

- `/api/webhooks/clerk`: syncs users into `profiles`
- `/api/webhooks/stripe`: flagged off
- `/api/cron/reminders`: Vercel Cron, see 6.3
- `/api/contact`: relay
- `/api/newsletter`
- `/events/[slug]/calendar.ics`
- `/certificates/[id]/pdf`
- `opengraph-image.tsx` files for events, recaps and insights
- `sitemap.ts`, `robots.ts`

### Redirects (permanent, `statusCode: 301` in `next.config.ts`)

| Old | New |
|---|---|
| `/about/` | `/about` |
| `/members/` | `/directory` |
| `/events/` | `/events` |
| `/become-a-member/` | `/join` |
| `/login/` | `/sign-in` |
| `/wp-admin/*`, `/wp-login.php` | `/sign-in` |

I'll also ask for the full list of old WordPress pages and posts (from their sitemap.xml) and map any others. **(Q5)**

## 5. Homepage

1. **Announcement bar.** Text and link come from `site_settings`. Dismissal is remembered per announcement version in `localStorage`, so a new announcement shows again.
2. **Header.** Utility bar: Find a member · Events · Log in · **Join MetBA**. Main row: logo · About · Membership · Events & CPD · Insights · Directory · For the Public · search icon. On mobile, Join stays visible next to the menu button.
3. **Hero.** Full-bleed dusk skyline (or the intro video) with a dark overlay. Headline, one sentence, and two buttons: **"Join MetBA. It's free."** and **"Find a member"**.
   - Headline options `[DRAFT]`:
     - A. "The global community for emerging technology law."
     - B. "Where legal professionals shape the law of emerging technology."
     - C. "Building the practice of technology law, across every jurisdiction."
   - Supporting sentence `[DRAFT]`: "MetBA connects lawyers, law students and legal professionals working on AI, digital assets, Web3 and online platforms, in more than {N} countries."
4. **Proof strip.** Members, countries and events held, from live database counts (cached for 1 hour). Each number is hidden below a threshold set in admin. Proposed defaults: 250 members, 15 countries, 10 events. **(Q6)** If every number is hidden, the strip shows partner logos in Stone instead.
5. **Three audiences.**
   - For Lawyers `[DRAFT]`: "Meet peers, earn CPD, and list your practice in the member directory."
   - For Students `[DRAFT]`: "Join free, attend events, and start building a career in technology law."
   - For the Public `[DRAFT]`: "Learn what the directory is and how to find licensed counsel."
6. **Featured event.** A large card in a dark section with an image, a mono date line in the viewer's local time, format, speakers with photos, CPD label, and Register. This is the next event flagged `featured`, or else the next upcoming event.
7. **Topics.** A 4x2 grid (2x4 on mobile) of the 8 topics, each with a number in mono, a serif name, and a count of items.
8. **Latest.** Two latest insights and the latest recap.
9. **Directory teaser.** Search box with the placeholder "Search members by name, country or topic", which submits to `/directory?q=`.
10. **Join section (dark).**
    - Headline `[DRAFT]`: "Join the people building technology law."
    - Sentence `[DRAFT]`: "Membership is free for lawyers, law students and legal professionals."
    - Join button.
11. **Footer (dark).** Sitemap columns, newsletter sign-up, social links (LinkedIn, X, Instagram, Threads), legal links, theme toggle, and the line "MetBA does not provide legal advice." `[DRAFT]`

## 6. Features

### 6.1 Membership and verification

- **Sign-up:** magic link or LinkedIn. LinkedIn sign-in pre-fills the name, photo and LinkedIn URL. Onboarding asks for the remaining profile fields, with topics chosen from the 8.
- **Statuses** (`membership_status`): `pending` → `verified` → `lapsed`, plus `rejected` and `suspended`, which are admin-only and never shown publicly.
- **Review queue:** shows the application, the LinkedIn URL, and whether the email domain matches the stated firm or school, as a hint for the reviewer only. Approve, reject or request more info, each with a templated email.
- **Lapsed** is set by an admin, or automatically after a period without re-confirming. **(Q7)**
- **Badge wording** is exactly "Verified MetBA member". Jurisdictions always show the label "Self-reported".
- **Wording guard:** a unit test greps all copy and templates for banned phrases ("licensed", "bar-verified", "certified lawyer", "accredited" outside `CpdLabel`, and em dashes) and fails the build if any appear.
- **WordPress import:** `scripts/import-wordpress-members.ts` reads the CSV and creates profiles as `pending`, with visibility `hidden` until the member re-consents. It sends a re-consent email with a signed link to confirm the profile, choose visibility and accept the terms. It is idempotent on email and supports a dry-run mode. Members who never re-consent stay hidden.

### 6.2 Directory

- **Filters:** country, jurisdiction, topic, member type, language, open to referrals. Name and firm search uses `pg_trgm` fuzzy matching. Filters live in the URL so results can be shared.
- **Visibility:** `hidden` / `members` (default) / `public`. Enforced in RLS, not just in the UI. The public sees a reduced profile through a `directory_public` view that only exposes the allowed columns.
- **Contact relay:** the email goes to the member with the sender's reply-to address, and the member's address is never revealed. Spam protection: Turnstile, plus rate limits counted in Postgres (proposed 5 messages per sender per day and 20 per recipient per day), plus a honeypot field. All messages are logged in `contact_messages` for abuse review. Who can send is open, see **(Q8)**.
- **Report this profile:** saved to `profile_reports` and shown in `/admin/reports`.
- **Disclaimer** on every directory page `[DRAFT]`: "This directory lists MetBA members. It is not a referral service or a licensing register, and MetBA does not verify anyone's right to practise. Learn how to find licensed counsel."

### 6.3 Events and CPD

- **Times:** stored as `timestamptz` along with the event's IANA timezone. The server renders the time in the event's timezone, and `LocalTime` then switches it to the viewer's timezone in the browser. A small "(your time)" note avoids confusion.
- **CPD display rule**, enforced in two places:
  - The database rejects any row marked `accredited` that has no regulator and reference.
  - `CpdLabel` is the only component that renders CPD wording. It shows "Accredited by {regulator}, ref {number}" only when that data exists. Otherwise it shows "May be eligible for self-reported CPD. Check your regulator's rules."
- **Registration:** a single Postgres function does registration atomically, locking the event row so it can't overbook. If the event is full, the person goes on the waitlist with a position. When someone cancels, the first person on the waitlist is promoted and emailed. The join link is stored separately and readable only by registered attendees (enforced in RLS).
- **Emails:** confirmation with an `.ics` file attached, waitlist and promotion notices, and reminders 24 hours and 1 hour before. Reminders run on Vercel Cron every 15 minutes, and a `reminders_sent` table makes sure no one gets the same reminder twice. This frequency needs Vercel Pro, see **(Q9)**.
- **Attendance:** an admin checklist, or check-in codes. A check-in code is a 6-character code with a time window, stored hashed, and an attendee can only use it once.
- **Certificates:** generated with `@react-pdf/renderer` when attendance is confirmed, then stored in private Storage and served through a short-lived link.
  - ID format: `MBA-2026-7K3QX` (random, no ambiguous characters).
  - The QR code links to `/certificates/[id]`, which shows the member name, event, date, duration and CPD hours, or "Revoked".
- **CPD log:** attendance at a MetBA event adds a `cpd_entries` row automatically. Members can add external activities by hand, with an optional evidence file. Totals are shown by year and category, with export to CSV and PDF.

### 6.4 Recaps

- After an event ends, `/events/[slug]` shows the recap if one is published, or "Recap coming soon" if not.
- **Recap fields:** summary, 3 to 5 takeaways, recording URL with public or members-only visibility, slides, photos, speaker quotes, related insights.
- **Phase 4 "Draft recap" tool:** pasted notes go to the Anthropic API (`claude-sonnet-5`), and the output is saved as a draft only. Nothing is ever published automatically. This is a paid API, see **(Q10)**.

### 6.5 Insights

- The editor is Tiptap with headings, lists, links, quotes and images, stored as JSON and rendered on the server. Simple enough for non-technical editors, with nothing like WordPress's page-builder bloat.
- Fields: author (a speaker or member), topics, reading time calculated automatically, related events, and status (draft, published, scheduled).

### 6.6 Share images

`next/og` with Instrument Serif and Geist Mono loaded as fonts. The layout is the Night background, a white serif headline, a mono eyebrow (date and format, or topic), and the MetBA logo at bottom right.

### 6.7 Newsletter

- Our own double opt-in: a `newsletter_signups` record holds the pending confirmation token, and the contact is added to the Resend contact list only after it is confirmed.
- I'll check Resend's current contacts and audiences API when I build this. I know it has changed recently.

### 6.8 Admin

- Built into the app: shadcn data tables, forms with `react-hook-form` and `zod`, server actions, and optimistic updates. No separate CMS.
- Every write is recorded in `audit_log`.
- **Editors** manage content, events, attendance and recaps. **Admins** additionally manage the review queue, members, reports, roles and settings. **(Q11)**

### 6.9 Payments

Stripe Checkout code is in place but turned off by `FEATURE_PAYMENTS=false`, and `events.price_cents` defaults to 0. With the flag off, no Stripe keys are needed.

### 6.10 Privacy and cookies

- **Data export:** `/account/privacy` produces a JSON file (profile, registrations, CPD, certificates, messages sent).
- **Data deletion:** removes the profile, removes the user from Clerk, and anonymises registrations so aggregate counts survive. What happens to issued certificates is open, see **(Q12)**.
- **Cookies:** Vercel Analytics is cookieless, and Clerk's cookies are essential. If nothing non-essential is ever added, **no consent banner is legally needed**. I'll build the small, non-blocking `CookieNotice` with "Reject non-essential" as prominent as "Accept", but keep it switched off unless a non-essential tool is added.
- **Privacy policy:** drafted for GDPR, UK GDPR and PIPEDA, marked `[DRAFT – needs legal review]`.

## 7. Data model

All tables have RLS enabled, with deny-by-default and explicit policies. `uid()` means `auth.jwt()->>'sub'` (the Clerk user ID).

Helper functions: `is_staff()` (true for Admin or Editor) and `is_admin()`, both reading `admin_roles`; `is_verified_member()`.

**Enums:**
- `member_type`: lawyer, student, associate
- `membership_status`: pending, verified, lapsed, rejected, suspended
- `visibility`: hidden, members, public
- `event_format`: webinar, in_person, hybrid, virtual_venue
- `registration_status`: registered, waitlisted, cancelled
- `cpd_category`: substantive, professionalism, ethics, practice_management, other
- `accreditation_status`: none, pending, accredited
- `content_status`: draft, published, scheduled

The brief's `member_types` table becomes an enum, since there are only three fixed types.

| Table | Key columns | RLS summary |
|---|---|---|
| `profiles` | id uuid, clerk_user_id unique, slug, full_name, photo_path, headline, organisation, country_code, city, member_type, status, visibility, open_to_referrals, linkedin_url, website, bio, consented_at, timestamps | Owner can read and update their own row (status fields excluded). Staff have full access. Others go through the views below |
| `directory_public` (view) | reduced columns, only `verified` + `public` | Readable by anyone |
| `directory_members` (view) | full columns, only `verified` and not `hidden` | Verified members only |
| `verification_requests` | profile_id, linkedin_url, email_domain, notes, decision, decided_by, decided_at | Owner can insert and read their own. Staff have full access |
| `topics` | slug, name, description, sort | Public read, staff write |
| `profile_topics`, `profile_languages` | join tables | Follow the profile's rules |
| `jurisdictions` | id, country_code, subdivision, name, regulator_name | Public read. Seeded with about 120 jurisdictions |
| `profile_jurisdictions` | profile_id, jurisdiction_id (self-reported) | Follow the profile's rules |
| `events` | slug, title, summary, description, starts_at, ends_at, timezone, format, venue, capacity, price_cents, sponsor_id, featured, status, checkin_code_hash, checkin_window | Public read when published. Staff write |
| `event_private` | event_id, join_url | Readable only by registered attendees and staff |
| `speakers` | name, title, organisation, bio, photo_path, profile_id (optional) | Public read |
| `event_speakers`, `event_topics` | join tables | Public read |
| `event_cpd` | event_id, jurisdiction_id, hours numeric(4,2), category, accreditation_status, regulator, accreditation_ref; database check: accredited requires regulator and ref | Public read |
| `registrations` | event_id, profile_id, status, waitlist_position, created_at | Owner reads their own. Changes only through registration functions. Staff have full access |
| `attendance` | registration_id, method (admin, code), confirmed_at, confirmed_by | Owner read, staff write |
| `certificates` | id text, attendance_id, snapshot jsonb (name, event, hours at time of issue), pdf_path, issued_at, revoked_at | Public verification goes through a function returning only safe fields |
| `cpd_entries` | profile_id, source (metba, external), event_id, title, provider, date, hours, category, jurisdiction_id, evidence_path | Owner only, staff read |
| `recaps` | event_id unique, summary, takeaways text[], recording_url, recording_visibility, slides_path, status | Public read when published. The recording URL follows its visibility setting |
| `recap_media`, `recap_quotes` | photos, quotes with speaker_id | Public read when published |
| `insights` | slug, title, dek, body jsonb, author_speaker_id, published_at, status, reading_minutes | Public read when published |
| `insight_topics`, `insight_events` | join tables | Public read |
| `sponsors` | name, logo_path, url, tier | Public read |
| `contact_messages` | sender_profile_id or sender_email, recipient_profile_id, body, ip_hash, created_at | Insert through the relay route only. Staff read |
| `profile_reports` | profile_id, reporter, reason, status | Insert by anyone (with Turnstile). Staff read |
| `newsletter_signups` | email, token_hash, confirmed_at | Service role only |
| `reminders_sent` | registration_id, kind (24h, 1h) unique | Service role only |
| `admin_roles` | clerk_user_id, role (admin, editor) | Admin only |
| `site_settings` | key, value jsonb (announcement, thresholds, flags) | Public read for whitelisted keys, admin write |
| `audit_log` | actor, action, entity, entity_id, diff jsonb, at | Insert-only, admin read |

**Storage buckets:**
- `avatars`: public read, owner write
- `event-media`: public
- `slides`: public, or members-only through a signed link
- `certificates`: private, signed links only
- `cpd-evidence`: private, owner only

## 8. Third-party services

| Service | Use | Cost |
|---|---|---|
| Vercel | Hosting, previews, Cron, Analytics | Hobby is free but limits cron jobs to once a day and is for non-commercial use. **Pro ($20/month) is probably needed (Q9)** |
| Supabase | Database and Storage | Free tier for development. Pro ($25/month) is recommended at launch for daily backups **(Q9)** |
| Clerk | Auth | Free tier is likely enough **(Q2)** |
| Resend | Email and newsletter | Free tier is 3,000 emails/month. Probably $20/month once the newsletter grows |
| Cloudflare Turnstile | Spam protection | Free |
| Stripe | Payments (flagged off) | No cost until used |
| Anthropic API | Draft recap tool (Phase 4) | Usage-based, cents per recap **(Q10)** |
| Unsplash | Placeholder photos | Free |

Nothing paid is created without your go-ahead.

## 9. Quality and testing

- **Accessibility:**
  - axe checks in Playwright on every route, in both themes
  - a keyboard-only walkthrough of nav, filters, forms and dialogs
  - skip link, visible focus states
  - contrast checked against the token table in section 3
- **Mobile:** layouts start at 360px, with a Playwright check for horizontal overflow at 360px wide.
- **Performance:**
  - the hero image is preloaded and served in AVIF
  - fonts load through `next/font` with swap
  - interactive client components only where needed (filters, local time, forms)
  - static pages are pre-rendered and refreshed on change
  - Lighthouse runs in CI against the preview deployment, with 90+ budgets
- **SEO:**
  - `generateMetadata` on every page
  - structured data (JSON-LD): Organization on every page, Event on event pages, Article on insights
  - `sitemap.ts` and `robots.ts`, with `/account`, `/admin` and `/styleguide` excluded
- **Tests:**
  - **Vitest:** CPD totals, waitlist ordering, certificate ID format and PDF snapshot, `CpdLabel` wording rule, the banned-copy scan
  - **pgTAP:** RLS policies for each role (public, pending, verified, editor, admin) on every table
  - **Playwright:** sign-up flow, role gating, register and waitlist promotion, check-in, certificate verification

## 10. Phase checklist

Each phase ends with a commit, a preview deployment, and a stop for your review.

### Phase 0: Plan and look
- [ ] PLAN.md approved
- [ ] Next.js 16 + TypeScript + Tailwind v4 + shadcn scaffold, ESLint, Prettier, Vitest
- [ ] Tokens, fonts, light and dark themes, `/styleguide`
- [ ] Components listed in section 3
- [ ] Static homepage with typed mock data (`lib/mock/`): about 12 events, 9 insights, 30 members, 8 topics, leadership
- [ ] Banned-copy test
- [ ] Vercel project and preview deployment (needs your Vercel team, **Q13**)
- [ ] **Stop: review the look and feel**

### Phase 1: Public pages
- [ ] About, Membership, For Students, For the Public, Code of Conduct, Accessibility, Terms, Privacy (`[DRAFT – needs legal review]`)
- [ ] Insights list and article, Topics index and hubs, Events list and detail (upcoming view), past-events archive shell
- [ ] A data-access layer with the same interface for mock and real data, so pages don't change when Supabase arrives
- [ ] Redirects, metadata, JSON-LD, sitemap, robots
- [ ] **Stop: review**

### Phase 2: Members
- [ ] Supabase project, migrations, seed data, RLS and pgTAP tests
- [ ] Clerk + Supabase third-party auth, LinkedIn and magic link, user-sync webhook
- [ ] `/join` onboarding, `/account` profile, visibility and privacy (export and delete)
- [ ] Review queue, roles, audit log, Turnstile
- [ ] Directory with search, filters and public/member views, profile pages, contact relay, reports
- [ ] WordPress import script and re-consent email
- [ ] **Stop: review**

### Phase 3: Events and CPD
- [ ] Event admin (speakers, CPD, capacity, join link)
- [ ] Registration and waitlist functions and tests, emails with `.ics`, cron reminders
- [ ] Attendance (checklist and codes), certificate PDF, verification page
- [ ] CPD log, external entries, totals, CSV and PDF export
- [ ] **Stop: review**

### Phase 4: Recaps and launch
- [ ] Recap admin and display, past-events archive filters
- [ ] Insights editor (Tiptap), sponsors, announcement bar admin, dashboard polish
- [ ] Newsletter double opt-in, share images
- [ ] Draft recap tool (if Q10 is yes)
- [ ] Full accessibility and Lighthouse pass, `LAUNCH.md` checklist (DNS cutover, Clerk production keys, LinkedIn app review, email domain records, backups). **I won't touch DNS or production settings without asking**
- [ ] **Stop: review**

## 11. Open questions

1. **Leadership:** is the Founding Board and Advisory Board list from the current About page still accurate? Please send bios, photos and titles.
2. **Clerk:** OK to use Clerk on its free tier?
3. **Supabase Auth:** do you want to consider Supabase Auth instead of Clerk (one fewer vendor), or keep to the Clerk/Auth.js shortlist?
4. **Placeholder photos:** OK to use Unsplash city photography until event photos arrive? Can you send the intro video file?
5. **Old URLs:** are there other WordPress URLs worth redirecting, such as blog posts or individual event pages?
6. **Proof strip thresholds:** what minimums should hide a count (proposed 250 members, 15 countries, 10 events)? Roughly how many members are there today?
7. **Lapsed status:** should membership lapse automatically (for example, after 24 months without re-confirming), or only when an admin sets it?
8. **Contact relay:** who can send messages?
   - My proposal: verified members can message any member they can see. The public can only message members who chose Public visibility *and* turned on "open to referrals", with stricter limits.
   - There's also a tension: the directory is "not a referral service", yet there is an "open to referrals" toggle. I suggest relabelling it **"Open to referrals from other lawyers"** so it's clearly lawyer-to-lawyer. Your call.
9. **Hosting plans:** OK to plan for Vercel Pro (needed for frequent cron jobs and for commercial use) and Supabase Pro at launch? The free alternative for reminders is running them from a Supabase scheduled job.
10. **Draft recap tool:** OK to use the Anthropic API for it in Phase 4?
11. **Roles:** should Editors be able to approve membership applications, or Admins only?
12. **Certificates after deletion:** when a member deletes their account, should their certificates (a) remain verifiable using the name snapshot taken at issue time, or (b) be revoked?
13. **Accounts:** which Vercel team, GitHub org/repo and Supabase organisation should I use? Vercel CLI isn't installed on this machine. Should I install it, or work through the Vercel integration?
14. **Name and language:** should the header lead with the "MetBA" wordmark or the full "Metaverse Bar Association"? Is English-only OK at launch?
15. **Instagram and Threads:** what are the handles?
16. **Assets:**
    - logo SVG
    - intro video
    - event photos
    - partner and sponsor logos
    - the WordPress member export (CSV)
    - any regulator accreditation references
