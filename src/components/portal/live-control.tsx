"use client";

import Image from "next/image";
import { useState } from "react";
import { Circle, DoorOpen, Hand, MicOff, Pin, Radio, Square, UserMinus, UserPlus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PreviewNote } from "./preview-banner";

type Person = { name: string; role: string; photo?: string; initials?: string };
type Phase = "scheduled" | "green" | "doors" | "live" | "ended";

const steps: { id: Phase; label: string }[] = [
  { id: "scheduled", label: "Scheduled" },
  { id: "green", label: "Green room" },
  { id: "doors", label: "Doors open" },
  { id: "live", label: "Live" },
  { id: "ended", label: "Ended" },
];

export function LiveControl({
  stage: initialStage,
  hands: initialHands,
  questions,
  counts,
}: {
  stage: Person[];
  hands: { name: string; at: string }[];
  questions: { name: string; text: string; votes: number }[];
  counts: { registered: number; inRoom: number; peak: number };
}) {
  const [phase, setPhase] = useState<Phase>("live");
  const [stage, setStage] = useState(initialStage);
  const [hands, setHands] = useState(initialHands);
  const [recording, setRecording] = useState(true);
  const [layout, setLayout] = useState<"speaker" | "grid">("speaker");
  const [pinned, setPinned] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const idx = steps.findIndex((s) => s.id === phase);

  const next: Record<Phase, { label: string; to: Phase; icon: typeof Radio } | null> = {
    scheduled: { label: "Open green room", to: "green", icon: DoorOpen },
    green: { label: "Open doors to attendees", to: "doors", icon: DoorOpen },
    doors: { label: "Go live", to: "live", icon: Radio },
    live: { label: "End event", to: "ended", icon: Square },
    ended: null,
  };
  const action = next[phase];

  return (
    <div className="grid xl:grid-cols-[1fr_24rem]">
      <div className="px-5 py-8 md:px-10">
        {/* Lifecycle */}
        <ol className="flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <li
              key={s.id}
              className={cn(
                "text-meta rounded-full border px-3 py-1",
                i < idx && "border-line text-subtle line-through",
                i === idx && "border-ink bg-ink text-paper",
                i > idx && "border-line text-subtle",
              )}
            >
              {s.label}
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {action ? (
            <Button
              size="lg"
              variant={action.to === "ended" ? "outline-inverse" : "inverse"}
              onClick={() => {
                setPhase(action.to);
                if (action.to === "live") setRecording(true);
                if (action.to === "ended") setRecording(false);
                setNote(`${action.label}: in the product this updates the Daily room and every attendee's screen.`);
              }}
            >
              <action.icon aria-hidden /> {action.label}
            </Button>
          ) : (
            <p className="text-[0.9375rem] text-graphite">Ended. Attendance and the recording are being processed.</p>
          )}
          <Button variant="ghost" onClick={() => setPhase("scheduled")}>
            Reset preview
          </Button>
        </div>
        {note ? (
          <div className="mt-4">
            <PreviewNote>{note}</PreviewNote>
          </div>
        ) : null}

        {/* Program output */}
        <div className="mt-8 overflow-hidden rounded-md border border-line">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="text-meta text-subtle">What attendees see</span>
            <span className="text-meta inline-flex items-center gap-1.5 text-subtle">
              {recording ? <Circle aria-hidden className="size-2.5 fill-[oklch(0.6_0.2_27)] text-[oklch(0.6_0.2_27)]" /> : null}
              {recording ? "Recording" : "Not recording"}
            </span>
          </div>
          <div className={cn("grid gap-2 bg-night-raised p-3", layout === "grid" ? "grid-cols-2" : "grid-cols-1")}>
            {(layout === "speaker" ? stage.slice(0, 1) : stage).map((p) => (
              <div key={p.name} className="relative aspect-video overflow-hidden rounded-sm bg-night">
                {p.photo ? (
                  <Image src={p.photo} alt="" fill sizes="50vw" className="object-cover object-[50%_30%]" />
                ) : (
                  <div className="grid size-full place-items-center font-display text-4xl text-graphite">{p.initials}</div>
                )}
                <span className="text-meta absolute bottom-2 left-2 rounded-sm bg-black/60 px-2 py-0.5 text-white">{p.name}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-line p-3">
            <Button size="sm" variant={recording ? "inverse" : "outline-inverse"} onClick={() => setRecording((r) => !r)} aria-pressed={recording}>
              <Circle aria-hidden /> {recording ? "Stop recording" : "Start recording"}
            </Button>
            <Button size="sm" variant="outline-inverse" onClick={() => setLayout((l) => (l === "speaker" ? "grid" : "speaker"))}>
              Layout: {layout === "speaker" ? "Speaker" : "Grid"}
            </Button>
            <Button size="sm" variant="outline-inverse" onClick={() => setNote("Simulcast to LinkedIn Live would start here (optional, off by default).")}>
              Simulcast
            </Button>
          </div>
        </div>
        {pinned ? (
          <div className="mt-4 rounded-sm border border-brass p-4">
            <p className="text-meta text-brass">Pinned question, shown to everyone</p>
            <p className="mt-1 text-[0.9375rem]">{pinned}</p>
          </div>
        ) : null}
      </div>

      <aside className="border-t border-line xl:border-t-0 xl:border-l">
        <div className="grid grid-cols-3 border-b border-line">
          {[
            ["Registered", counts.registered],
            ["In room", counts.inRoom],
            ["Peak", counts.peak],
          ].map(([l, v], i) => (
            <div key={l as string} className={cn("px-4 py-4", i > 0 && "border-l border-line")}>
              <p className="text-meta text-subtle">{l}</p>
              <p className="mt-1 font-display text-2xl">{v}</p>
            </div>
          ))}
        </div>

        <section className="border-b border-line p-5">
          <h2 className="text-kicker mb-3 inline-flex items-center gap-2">
            <Users aria-hidden className="size-4" /> On stage
          </h2>
          <ul className="space-y-2">
            {stage.map((p) => (
              <li key={p.name} className="flex items-center justify-between gap-3">
                <span className="text-[0.9375rem]">
                  {p.name} <span className="text-meta text-subtle">· {p.role}</span>
                </span>
                <span className="flex gap-1">
                  <Button size="icon-sm" variant="ghost" aria-label={`Mute ${p.name}`}>
                    <MicOff aria-hidden />
                  </Button>
                  {p.role !== "Host" ? (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label={`Move ${p.name} back to the audience`}
                      onClick={() => setStage((s) => s.filter((x) => x.name !== p.name))}
                    >
                      <UserMinus aria-hidden />
                    </Button>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-line p-5">
          <h2 className="text-kicker mb-3 inline-flex items-center gap-2">
            <Hand aria-hidden className="size-4" /> Raised hands ({hands.length})
          </h2>
          {hands.length ? (
            <ul className="space-y-2">
              {hands.map((h) => (
                <li key={h.name} className="flex items-center justify-between gap-3">
                  <span className="text-[0.9375rem]">
                    {h.name} <span className="text-meta text-subtle">· {h.at}</span>
                  </span>
                  <Button
                    size="sm"
                    variant="outline-inverse"
                    onClick={() => {
                      setHands((x) => x.filter((y) => y.name !== h.name));
                      setStage((s) => [...s, { name: h.name, role: "Guest", initials: h.name.split(" ").map((w) => w[0]).join("") }]);
                    }}
                  >
                    <UserPlus aria-hidden /> Bring on stage
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-meta text-subtle">No raised hands.</p>
          )}
        </section>

        <section className="p-5">
          <h2 className="text-kicker mb-3">Questions</h2>
          <ul className="space-y-2">
            {questions.map((q) => (
              <li key={q.text} className="rounded-sm border border-line p-3">
                <p className="text-[0.9375rem]">{q.text}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-meta text-subtle">
                    {q.name} · {q.votes} votes
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => setPinned(q.text)}>
                    <Pin aria-hidden /> Pin
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
