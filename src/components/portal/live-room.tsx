"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Captions,
  Hand,
  LayoutGrid,
  LogOut,
  MessageSquare,
  MessagesSquare,
  Send,
  ThumbsUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Stage = { name: string; role: string; photo?: string; initials?: string; speaking?: boolean };
type Session = {
  inRoom: number;
  stage: Stage[];
  chat: { name: string; at: string; text: string; staff?: boolean }[];
  questions: { name: string; text: string; votes: number }[];
};

const stateLabels = [
  ["waiting", "Doors open"],
  ["live", "Live"],
  ["ended", "Ended"],
] as const;
type RoomState = (typeof stateLabels)[number][0];

function Tile({ p, large }: { p: Stage; large?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-night-raised",
        large ? "aspect-video" : "aspect-video",
        p.speaking && "ring-2 ring-brand ring-offset-2 ring-offset-night",
      )}
    >
      {p.photo ? (
        <Image src={p.photo} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_30%]" />
      ) : (
        <div className="grid size-full place-items-center">
          <span className="inline-flex size-20 items-center justify-center rounded-full bg-deep font-display text-3xl text-ink">
            {p.initials}
          </span>
        </div>
      )}
      <span className="text-meta absolute bottom-2.5 left-2.5 rounded-sm bg-black/60 px-2 py-1 text-white">
        {p.name} <span className="text-white/70">· {p.role}</span>
      </span>
    </div>
  );
}

export function LiveRoom({ title, session }: { title: string; session: Session }) {
  const params = useSearchParams();
  const initial = (params.get("state") as RoomState) || "live";
  const [state, setState] = useState<RoomState>(stateLabels.some(([v]) => v === initial) ? initial : "live");
  const [tab, setTab] = useState<"chat" | "qa" | "people">("chat");
  const [hand, setHand] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [grid, setGrid] = useState(false);
  const [first, ...rest] = session.stage;

  return (
    <div className="dark flex min-h-[calc(100svh-6rem)] flex-col bg-night text-ink">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {state === "live" ? (
            <span className="text-meta inline-flex shrink-0 items-center gap-2 rounded-full bg-[oklch(0.55_0.2_27)] px-2.5 py-1 text-white">
              <span className="size-1.5 rounded-full bg-white" /> Live
            </span>
          ) : null}
          <h1 className="truncate font-display text-xl">{title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-meta inline-flex items-center gap-1.5 text-subtle">
            <Users aria-hidden className="size-3.5" /> {session.inRoom} watching
          </span>
          {state === "live" ? (
            <span className="text-meta inline-flex items-center gap-1.5 text-subtle">
              <span className="size-2 rounded-full bg-[oklch(0.6_0.2_27)]" /> Recording
            </span>
          ) : null}
          <span className="inline-flex rounded-sm border border-dashed border-control p-0.5">
            {stateLabels.map(([v, l]) => (
              <button
                key={v}
                type="button"
                onClick={() => setState(v)}
                aria-pressed={state === v}
                className={cn("text-meta h-7 rounded-sm px-2.5", state === v ? "bg-ink text-paper" : "text-graphite hover:text-ink")}
              >
                {l}
              </button>
            ))}
          </span>
        </div>
      </div>

      <div className="grid flex-1 lg:grid-cols-[1fr_22rem]">
        {/* Stage */}
        <div className="flex flex-col p-4 md:p-6">
          {state === "waiting" ? (
            <div className="grid flex-1 place-items-center rounded-md border border-line p-10 text-center">
              <div className="max-w-md">
                <p className="text-kicker text-brass">Doors open</p>
                <p className="mt-4 font-display text-[2rem] leading-tight">The session starts in 8 minutes</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite">
                  You&apos;re in. The hosts are getting ready backstage. Check your speakers, and use the chat to say hello.
                  Your attendance is recorded automatically from the moment the session starts.
                </p>
              </div>
            </div>
          ) : state === "ended" ? (
            <div className="grid flex-1 place-items-center rounded-md border border-line p-10 text-center">
              <div className="max-w-md">
                <p className="text-kicker text-brass">Session ended</p>
                <p className="mt-4 font-display text-[2rem] leading-tight">Thank you for attending</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite">
                  You attended for 1 h 24 min. Your certificate and CPD log entry will be ready within the hour, and the
                  recording will appear in the CPD library.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button asChild variant="inverse">
                    <Link href="/account/cpd">Go to my CPD log</Link>
                  </Button>
                  <Button asChild variant="outline-inverse">
                    <Link href="/account">Back to dashboard</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={cn("grid flex-1 content-start gap-3", grid ? "md:grid-cols-2" : "")}>
                {grid ? (
                  session.stage.map((p) => <Tile key={p.name} p={p} />)
                ) : (
                  <>
                    <Tile p={first} large />
                    <div className="grid grid-cols-2 gap-3">
                      {rest.map((p) => (
                        <Tile key={p.name} p={p} />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {captions ? (
                <p className="mx-auto mt-4 max-w-2xl rounded-sm bg-black/70 px-4 py-2 text-center text-[0.9375rem] text-white">
                  &hellip;so in Singapore the pilots have treated the token as a record of the unit rather than the unit
                  itself, which matters for settlement.
                </p>
              ) : null}
            </>
          )}

          {/* Controls */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-line pt-4">
            <Button
              variant={hand ? "inverse" : "outline-inverse"}
              onClick={() => setHand((h) => !h)}
              aria-pressed={hand}
              disabled={state !== "live"}
            >
              <Hand aria-hidden /> {hand ? "Hand raised" : "Raise hand"}
            </Button>
            <Button variant="outline-inverse" onClick={() => setCaptions((c) => !c)} aria-pressed={captions}>
              <Captions aria-hidden /> Captions
            </Button>
            <Button variant="outline-inverse" onClick={() => setGrid((g) => !g)} aria-pressed={grid}>
              <LayoutGrid aria-hidden /> {grid ? "Speaker view" : "Grid view"}
            </Button>
            <Button asChild variant="outline-inverse">
              <Link href="/account">
                <LogOut aria-hidden /> Leave
              </Link>
            </Button>
          </div>
          {hand ? (
            <p role="status" className="text-meta mt-3 text-center text-subtle">
              The host can see your raised hand and may invite you on stage. Your camera and microphone stay off until
              you accept.
            </p>
          ) : null}
          <p className="text-meta mt-3 text-center text-subtle">
            In the product, the Daily webinar room is embedded here. Attendance is recorded for your CPD log.
          </p>
        </div>

        {/* Side panel */}
        <aside className="flex flex-col border-t border-line lg:border-t-0 lg:border-l">
          <div role="tablist" aria-label="Room panel" className="flex border-b border-line">
            {(
              [
                ["chat", "Chat", MessageSquare],
                ["qa", "Q&A", MessagesSquare],
                ["people", "People", Users],
              ] as const
            ).map(([v, l, Icon]) => (
              <button
                key={v}
                role="tab"
                aria-selected={tab === v}
                onClick={() => setTab(v)}
                className={cn(
                  "text-meta flex flex-1 items-center justify-center gap-1.5 border-b-2 py-3",
                  tab === v ? "border-ink text-ink" : "border-transparent text-subtle hover:text-ink",
                )}
              >
                <Icon aria-hidden className="size-3.5" /> {l}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-4" role="tabpanel">
            {tab === "chat" ? (
              <ul className="space-y-4">
                {session.chat.map((m, i) => (
                  <li key={i}>
                    <p className="text-meta text-subtle">
                      <span className={m.staff ? "text-brass" : "text-ink"}>{m.name}</span> · {m.at}
                    </p>
                    <p className="mt-0.5 text-[0.9375rem] text-graphite">{m.text}</p>
                  </li>
                ))}
              </ul>
            ) : tab === "qa" ? (
              <ul className="space-y-3">
                {session.questions.map((q, i) => (
                  <li key={i} className="rounded-sm border border-line p-3">
                    <p className="text-[0.9375rem] text-ink">{q.text}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-meta text-subtle">{q.name}</span>
                      <button type="button" className="text-meta inline-flex items-center gap-1 text-graphite hover:text-ink">
                        <ThumbsUp aria-hidden className="size-3.5" /> {q.votes}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="text-meta mb-2 text-subtle">On stage</p>
                  <ul className="space-y-1.5 text-[0.9375rem]">
                    {session.stage.map((p) => (
                      <li key={p.name}>
                        {p.name} <span className="text-subtle">· {p.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-meta text-subtle">
                  {session.inRoom} members watching. Attendee names are visible to hosts only.
                </p>
              </div>
            )}
          </div>
          <form className="flex gap-2 border-t border-line p-3" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="room-msg" className="sr-only">
              {tab === "qa" ? "Ask a question" : "Message"}
            </label>
            <input
              id="room-msg"
              placeholder={tab === "qa" ? "Ask the speakers a question" : "Say something to the room"}
              className="h-10 flex-1 rounded-md border border-input bg-night-raised px-3 text-[0.9375rem] text-ink placeholder:text-subtle"
            />
            <Button type="submit" variant="inverse" size="icon">
              <Send aria-hidden />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </aside>
      </div>
    </div>
  );
}
