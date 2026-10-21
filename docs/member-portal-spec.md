# Member portal, admin approval, live CPD and membership badge: specification

Status: **Draft for founding partner review.** Phase 1 (clickable preview) is built; nothing below Phase 1 is implemented.
Related: `PLAN.md` (overall plan, data model, rules). Copy marked `[DRAFT]` needs review.

---

## 1. What we are building

A members-only area of metba.io where approved members:

1. **Apply** to join, and wait for an administrator to approve them.
2. **Sign in** once approved.
3. See their **dashboard**: the next CPD event, their registrations and their CPD hours.
4. **Join live CPD events** inside metba.io. The event page switches from "upcoming" to "live" at start time; the session runs on Daily's webinar mode.
5. Watch the **CPD library**: recordings of every past event.
6. **Edit their profile** and directory visibility.
7. Copy a **membership badge** code snippet for their own website, which shows they are an active member and links back to metba.io.

And administrators who:

1. **Review applications** and approve, reject or ask for more information.
2. **Run live events**: open the green room, go live, bring audience members on stage, record, and end the session.
3. Manage events, recordings, members and settings.

Visitors who are not signed in see the CPD library with **one sample recording unlocked** and the rest locked, with full details visible.

## 2. Roles and states

| Role | Who | Can |
|---|---|---|
| Visitor | Anyone | Public site, public profiles, the one sample recording, locked library details |
| Applicant | Applied, not yet approved (`pending`) | Sign in to see application status and edit the application. No portal access |
| Member | Approved (`verified`) | Full portal: dashboard, register, join live events, library, profile, badge, CPD log |
| Lapsed member | `lapsed` | Sign in, renew. Badge shows "not current". No live events or library |
| Editor | Staff | Admin: events, live control, recordings, insights |
| Admin | Staff | Everything an editor can, plus applications, members, roles, settings |

`rejected` and `suspended` are admin-only states. They are never shown publicly, and a suspended member's badge shows "not current".

## 3. Journeys

### 3.1 Apply and get approved

1. Visitor clicks **Join MetBA**, then reaches `/join`.
2. They create an account: email magic link or LinkedIn.
3. They fill in the application. It is three short steps:
   1. About you: name, member type, organisation, country and city.
   2. Practice: jurisdictions (self-reported), practice areas, LinkedIn URL.
   3. Agreements: code of conduct, terms, privacy, directory visibility choice.
4. They see **Application received**, and get the same message by email.
5. An admin reviews it at `/admin/applications`. Approve, reject, or request more information, with a templated email in each case.
6. On approval, the member gets an email with a sign-in link, and their profile appears in the directory per their visibility setting.

Target review time `[DRAFT]`: 3 working days. The applicant can always see their status at `/join/status`.

### 3.2 Sign in

- `/sign-in`: email magic link or LinkedIn. No passwords.
- After sign-in the router decides:
  - `verified` goes to `/account`
  - `pending` goes to `/join/status`
  - `lapsed` goes to `/account/renew`
  - `rejected` or `suspended` goes to a neutral page with a contact address
- Admins and editors see an **Admin** link in the portal.

### 3.3 From upcoming to live CPD

An event moves through these states. Times are configurable per event.

| State | When | Member sees |
|---|---|---|
| Scheduled | Published | Event page, Register button |
| Registered | After registering | "You're registered", add to calendar, countdown |
| Green room | 30 min before start | Speakers only: private Daily room for sound checks |
| Doors open | 10 min before start | "Join now" for registered members. Waiting screen until the host goes live |
| Live | Host presses **Go live** | Daily webinar room embedded in the portal: stage, chat, Q&A, raise hand |
| Ended | Host presses **End event** | "Thanks for attending"; attendance being calculated |
| Recap | Recording processed (usually under 1 hour) | Recording in the library, certificate if attendance qualifies |

### 3.4 CPD library

- **Members:** every recording, searchable by topic, year and format, with progress tracking.
- **Visitors:** the one recording marked "public sample" plays; every other recording shows its title, speakers, date, duration, CPD details and summary, with a locked player and a "Join to watch" call to action.
- Watching a recording adds a **"viewed recording"** entry to the member's CPD log when they have watched at least the threshold (default 90%). This is kept separate from live attendance.

### 3.5 Profile

Members edit, at `/account/profile`:
- Photo, name, headline, organisation, city and country.
- Jurisdictions (self-reported), practice areas, languages, bio.
- Social links (LinkedIn, X, website), referrals preference.
- Directory visibility: hidden, members only or public.

A live preview shows how the public and members will see the profile. Data export and account deletion are at `/account/privacy`.

### 3.6 Membership badge

At `/account/badge` the member picks a style, previews it and copies one snippet. See section 7.

## 4. Screens

Phase 1 preview routes are in **bold**. All are clickable but non-functional.

**Public:**
- **`/join`**: application, three steps on one page in the preview
- **`/join/status`**: application received / under review
- **`/sign-in`**
- **`/events/library`**: CPD library, one unlocked and the rest locked
- **`/verify/[slug]`**: badge verification page
- `/account/renew` (later)

**Member portal (`/account`):**
- **`/account`**: dashboard. The next event card switches between upcoming, doors open and live in the preview
- **`/account/events`**: registrations and upcoming events
- **`/account/live/[slug]`**: live event room (Daily embed area mocked)
- **`/account/library`**: full library, unlocked
- **`/account/library/[slug]`**: recording player with progress and CPD note
- **`/account/cpd`**: CPD log with totals, certificates, external entries
- **`/account/profile`**: edit profile with live preview
- **`/account/badge`**: badge generator and embed code
- `/account/privacy`: export and delete (Phase 3)

**Admin (`/admin`):**
- **`/admin`**: overview (pending applications, next event, recent activity)
- **`/admin/applications`**: review queue with detail panel
- **`/admin/events`**: events with lifecycle state
- **`/admin/events/[slug]/live`**: live control room
- `/admin/members`, `/admin/library`, `/admin/settings` (later)

## 5. Authentication and access

- **Identity: Clerk.** Email magic link and LinkedIn (OpenID Connect), as recommended in `PLAN.md`. Sign-up only happens through `/join`, so every account starts as an application.
- **Authorisation: our database, not Clerk.** `profiles.status` (pending, verified, lapsed, rejected, suspended) and the `admin_roles` table decide access.
  - Supabase verifies the Clerk session token, so row-level security policies enforce the same rules in the database.
- **Route protection:** Next.js 16 `proxy.ts` checks that a session exists for `/account/**` and `/admin/**`. Each page and server action also checks status and role server-side. The proxy is never the only check.
- **Admin accounts** must use multi-factor authentication (a Clerk setting).
- **Session length:** 7 days for members, 12 hours for admins `[DRAFT]`.

## 6. Live CPD on Daily

### 6.1 Room and roles

- **One Daily room per event**, created automatically 24 hours before start through Daily's REST API. It uses interactive live streaming mode: up to 25 people on camera plus screen share, and up to 100,000 watching.
- **Room settings:** private room, hidden participants enabled, large-call optimisation, chat on, cloud recording enabled, expiry 2 hours after scheduled end.
- **Join tokens are issued only by our server, only to signed-in, registered, verified members.** Each token expires and carries the member's ID as the Daily `user_id`, which is how attendance is matched later.

| Person | Token permissions |
|---|---|
| Host (MetBA admin) | Room owner, can send audio and video, can admin, can start recording |
| Speaker | Can send audio and video |
| Attendee | Watch only. Can chat and raise a hand. Can be promoted by the host |

- **Green room:** a second private room for speakers before going live, so sound checks happen out of the audience's view.

### 6.2 Admin live control (`/admin/events/[slug]/live`)

- **Lifecycle:** open green room, open doors, **go live**, end event.
- **Stage:** who is on camera, with mute and remove. Hand-raise queue with **bring on stage** and **back to audience**.
- **Recording:** start and stop (auto-starts on go live), with layout switch: speaker view or grid.
- **Q&A and chat moderation:** pin a question, hide a message.
- **Live counts:** registered, in the room now, peak.
- **Optional simulcast** to LinkedIn or YouTube (off by default).

### 6.3 Attendance, certificates and recordings

1. When the event ends, a Daily webhook triggers attendance processing. We fetch the meeting's participants (join time and duration per `user_id`).
2. A member **attended** if their total time is at least **75% of the scheduled duration** (configurable per event `[DRAFT]`). Attendance rows are created and admins can override them.
3. Certificates are generated for attendees (Phase 3 of `PLAN.md`), and a CPD log entry is added automatically.
4. When Daily's "recording ready" webhook fires, the recording is copied to our video host and Daily's copy is deleted after 7 days. A transcript is generated for captions and the recap draft.
5. The recording appears in the library with members-only visibility unless an admin marks it as the public sample.

### 6.4 Costs (estimates, verify before launch)

- **Daily:** 10,000 participant-minutes free per month, then $0.004 per minute. Recording is about $0.0135 per minute and post-call transcription about $0.0043 per minute.
  - A 90-minute event with 150 people comes to about $15 to $20; smaller events are free.
- **Video hosting:** Cloudflare Stream at $5 per 1,000 minutes stored and $1 per 1,000 minutes watched, or Bunny Stream (cheaper).

## 7. Membership badge widget

### 7.1 Recommended snippet

A plain link around an image works on WordPress, Squarespace, Wix, Webflow and hand-written sites. It needs no JavaScript and cannot break the member's site:

```html
<a href="https://metba.io/verify/adaeze-okafor" title="Verified MetBA member">
  <img src="https://metba.io/badge/adaeze-okafor.svg?style=light"
       alt="Verified member of the Metaverse Bar Association"
       width="220" height="64" loading="lazy">
</a>
```

### 7.2 How it works

- **The image is drawn live by our server.** It is a small SVG generated on request, cached for 10 minutes.
  - If the member is `verified`, it shows the MetBA mark, "Verified MetBA member" and the current year.
  - If `lapsed` or `suspended`, it shows a neutral "MetBA membership not current" badge, so an out-of-date badge never misleads.
  - If the profile does not exist, it shows nothing (a 1-pixel transparent image).
- **The link goes to `/verify/[slug]`.** That public verification page shows the member's name, photo, membership status and "member since", plus a link to their public profile if they have one. This is the backlink to metba.io, and it lets anyone confirm the badge is genuine.
- **Styles:** light, dark, compact (mark only) and full. The size attributes prevent layout shift on the member's site.
- **Wording is fixed:** "Verified MetBA member". Never "licensed", "certified" or "accredited", the same rule as everywhere else.
- **Privacy:** the badge reveals only what the member already chose to make public. Members with hidden profiles get a verify page showing only name and status, after confirming they want a badge at all.
- **Abuse:** badges are tied to one member. Admins can revoke a badge.
- **Later:** a JavaScript version with a hover card, and a LinkedIn "Licenses and certifications"-style share. The plain version comes first because it works everywhere.

### 7.3 Backlinks and SEO

- The badge link is a normal link; we do not ask members to change its attributes.
- `/verify/[slug]` pages are indexable only for members with public profiles.
- Badge images are served with `Cache-Control` and an `ETag` to keep load on our server negligible.

## 7A. Design direction from research (October 2026)

Research into well-designed webinar products, video libraries and membership badges. Sources are listed at the end of this section. These changes apply to the Phase 1 preview once the founding partners approve the overall plan.

### 7A.1 Principles carried across all three

- **Calm interfaces.** Fewer decisions per screen, auto-hiding secondary controls, motion only to explain a change of state (Envato 2026 trends; Mux playback guide).
- **Accessibility built in from the start.** Live captions on by default, full keyboard operation, 4.5:1 contrast, screen-reader support for chat, Q&A and polls, reduced motion. This is now the baseline expectation for event platforms.
- **Trust you can check.** Every claim of status (live attendance, CPD hours, membership) shows its source and can be verified. This matters especially for a bar association.

### 7A.2 Live CPD room (webinar)

What the best products do, and what we adopt:

| Pattern | Seen in | MetBA adoption |
|---|---|---|
| A branded "show", not a meeting grid | Riverside (lower thirds, logo, colours, comments pulled on screen) | Lower thirds for speakers in MetBA type (name, role, firm). Pinned questions appear on screen as a card for everyone. A quiet MetBA mark in the corner of the stage |
| A lobby that sets expectations | Livestorm, Luma (clean registration and waiting pages) | A **lobby** before doors open: countdown, agenda, speaker bios, "test your audio" check, and how attendance is recorded |
| Device check before joining | Livestorm, StreamYard | Camera and microphone preview for speakers; a sound check for attendees |
| Interaction that doesn't take over | Livestorm (polls, Q&A, reactions) | Moderated Q&A with upvotes (in the preview), **polls** (add), and restrained reactions limited to applause and a thumbs up, shown briefly and never covering speakers |
| Live captions by default | ON24, Cvent, Airmeet and others | Captions on by default with a size control. The transcript becomes the recap's searchable text |
| Agenda awareness | Event platforms | A slim "Now: Singapore pilots · Next: EU" bar driven by the agenda, so late joiners know where they are |
| Visible attendance | (MetBA-specific) | A small, honest indicator: "Attendance recorded: 47 min", so members trust their CPD record |
| A good ending | Peak-end rule | The ended state shows time attended, when the certificate will arrive, a two-question feedback form, and the next event |

Layout: the stage gets about 70% of the width. Chat, Q&A and polls share one side panel with tabs, which collapses to a sheet on mobile. Controls auto-hide after 3 seconds of no input (except under reduced motion). Keyboard shortcuts: **H** raise hand, **C** captions, **Q** question box, **L** layout.

### 7A.3 CPD library (video)

| Pattern | Seen in | MetBA adoption |
|---|---|---|
| Curated collections, not just a grid | Criterion Channel ("programs") | **Collections** such as "Start here: digital asset regulation" or "Professional responsibility and AI", with an editor's note |
| Continue watching and progress on cards | Netflix, YouTube, Coursera | Continue-watching row first. Every card shows duration, CPD hours and progress |
| Cinematic but quiet player | MasterClass | Large poster frame; thin progress bar that grows on hover; controls auto-hide; preview thumbnails while scrubbing |
| Learning tools beside the video | Coursera and enterprise video platforms | **Chapters** plus a **searchable transcript** panel synced to playback (click a line to jump). Speed control, captions, downloadable slides |
| Fast start | Mux playback guidance | Adaptive streaming that starts at lower quality and scales up; poster image loads first |
| Taster for non-members | (conversion pattern) | Public visitors get the one free recording plus a **2-minute preview** of each locked recording, then a "Join to keep watching" card |

The CPD rule stays as in section 3.4: a "viewed recording" entry once 90% has been watched, with a progress ring on the card that fills as the member watches.

### 7A.4 Membership badge widget

| Pattern | Seen in | MetBA adoption |
|---|---|---|
| A dynamic seal that links to a live verification page | BBB Dynamic Seal (shows status and date, "click to verify") | Already the core design. Add the microcopy "Click to verify" on the full badge |
| Bound to one person | BBB (business name on the seal), Super Lawyers (name and year in alt text) | The full badge shows the **member's name** ("Adaeze Okafor · Verified member 2026") so it can't be copied onto someone else's site; the alt text includes name and year |
| Footer-friendly size | Trust badge guidance (40 to 60px high, matches site palette) | Heights of 48 and 64px. Light, dark and an **auto** style that follows the visitor's light or dark preference (needs testing in each browser) |
| Rules of use | Grant Professionals Association, UK-SBA, PGA member badge policies | A short badge policy at `/badge-policy`: individual members in good standing only; not on firm-wide marketing implying firm membership; no altering the artwork; always linked to MetBA; never implying endorsement, licensing or accreditation |
| Portable, verifiable credential | Open Badges 3.0 (W3C Verifiable Credentials), Credly | Later phase: issue membership as an **Open Badges 3.0** credential that members can add to LinkedIn and digital wallets. The website badge remains the simple first step |

Misuse controls: record which domains load each badge (domain only), let admins revoke a badge, and switch it to "not current" the moment membership lapses.

### 7A.5 Changes to Phase 1 preview after approval

1. Live room:
   - add the lobby, device check, agenda bar, polls tab, reactions and attendance indicator
   - give speaker tiles lower thirds
   - show pinned questions as an on-stage card
2. Library:
   - add a collections row and a continue-watching row
   - add a transcript panel synced to the player
   - add the 2-minute preview for locked recordings on the public page
3. Badge:
   - add the member's name to the full badge, the "auto" style and the "Click to verify" microcopy
   - add a draft `/badge-policy` page
4. Run the `critique` and `polish` design passes again on the portal screens.

### 7A.6 Sources

- [Riverside: best webinar platforms 2026](https://riverside.com/blog/webinar-platforms)
- [ON24: best webinar platforms 2026](https://www.on24.com/blog/the-best-webinar-platforms-of-2026/)
- [Livestorm review 2026](https://work-management.org/marketing/creators/livestorm-review/)
- [Luma review 2026](https://contentmation.com/marketing-tools/luma)
- [Virtual event platforms 2026 (captions, accessibility)](https://www.forasoft.com/blog/article/multimedia-solutions-virtual-events)
- [Envato: UX/UI trends 2026](https://elements.envato.com/learn/ux-ui-design-trends)
- [Eleken: video player UI patterns](https://www.eleken.co/blog-posts/video-player-ui)
- [Mux: video playback best practices](https://www.mux.com/articles/best-practices-for-video-playback-a-complete-guide-2025)
- [Video player accessibility](https://accessible.org/video-player-accessibility-best-practices/)
- [BBB Dynamic Seal](https://www.bbb.org/mississippi/public/bbbseal/)
- [Super Lawyers badge display](https://www.themodernfirm.com/how-to-display-super-lawyers-listing-on-website/)
- [Trust badge placement and sizing](https://kinsta.com/blog/trust-badges/)
- [GPA member badge policy](https://grantprofessionals.org/page/logopolicy)
- [UK-SBA badge guidelines](https://uk-sba.org/wp-content/uploads/2026/04/cpd-2765-20260408-115820.pdf)
- [Open Badges 3.0 status 2026](https://www.virtualbadge.io/blog-articles/open-badges-3-0-what-is-the-status-in-2026)
- [Credly and Open Badges 3.0](https://learn.credly.com/blog/credly-supports-open-badge-3.0)

## 8. Data model additions

These add to the `PLAN.md` model:

| Table | Key columns |
|---|---|
| `applications` | profile_id, step answers (jsonb), submitted_at, status (draft, submitted, more_info, approved, rejected), reviewer_id, decision_note, decided_at |
| `event_sessions` | event_id, daily_room_name, green_room_name, state (scheduled, green_room, doors_open, live, ended, processing, recap), went_live_at, ended_at, attendance_threshold_pct |
| `session_participants` | session_id, profile_id, role (host, speaker, attendee), joined_total_seconds, attended (bool), override_by |
| `recordings` | event_id, provider (cloudflare, bunny), asset_id, duration_s, visibility (members, public_sample), transcript_path, captions_path, published_at |
| `watch_progress` | recording_id, profile_id, seconds_watched, completed_at |
| `badges` | profile_id, style, revoked_at, created_at |

All tables use row-level security. Daily tokens and signed video URLs are short-lived and never stored.

## 9. Security and privacy

- Join tokens and playback URLs are issued server-side to verified, registered members only, and expire.
- Speakers' and attendees' consent to recording is shown on the join screen. Speakers sign a recording release `[DRAFT]` (legal review).
- Chat messages are kept for 30 days for moderation, then deleted `[DRAFT]`.
- The privacy policy will add Daily (live video), the video host and transcription as service providers.
- Admin actions (approve, reject, promote to stage, remove from room, revoke badge) are written to `audit_log`.

## 10. Phases

| Phase | Scope | Estimate |
|---|---|---|
| **1. Preview (done)** | Non-functional front end of every screen above, for founding partner approval | Built |
| 2. Accounts and approval | Clerk, application form, `/join/status`, admin review queue, approval emails, route protection, row-level security | 1 to 1.5 weeks |
| 3. Profile and badge | Profile editor with photo upload, visibility, data export and delete, badge SVG endpoint, `/verify/[slug]` | 1 week |
| 4. Live CPD | Registration and waitlist, Daily rooms and tokens, live room, admin control room, webhooks, attendance, certificates | 2 to 3 weeks |
| 5. Library | Video hosting, recording import, members-only playback, public sample, watch progress, captions | 1 week |

Phases 2 to 5 replace the matching phases in `PLAN.md`: they cover its Phase 2 (members) and Phase 3 (events and CPD), plus the recordings part of Phase 4.

## 11. Questions for the founding partners

1. **Approval criteria.** What must an applicant show to be approved? For example, LinkedIn profile required, or a firm or university email?
2. **Attendance threshold.** For live CPD, is 75% of the session the right bar?
3. **Public sample recording.** Which recording should non-members be able to watch, and should it rotate?
4. **Recording consent.** Do all past and future speakers agree to recordings in a members' library?
5. **Lapsed members.** Does membership need renewing (for example yearly re-confirmation) for the badge to stay active?
6. **Who hosts live events.** Which people need admin or editor access?
