import { describe, expect, it } from "vitest";

import { canSee, getProfile, searchDirectory } from "@/lib/directory";
import { members } from "@/lib/mock/members";
import type { Member } from "@/lib/types";

const PUBLIC = { kind: "public" } as const;
const MEMBER = { kind: "member" } as const;
const base = members[0];
const as = (patch: Partial<Member>): Member => ({ ...base, ...patch });

describe("directory visibility", () => {
  it("never shows hidden, pending or lapsed profiles", () => {
    for (const viewer of [PUBLIC, MEMBER]) {
      expect(canSee(as({ visibility: "hidden" }), viewer)).toBe(false);
      expect(canSee(as({ status: "pending" }), viewer)).toBe(false);
      expect(canSee(as({ status: "lapsed" }), viewer)).toBe(false);
    }
  });

  it("shows members-only profiles to members but not the public", () => {
    expect(canSee(as({ visibility: "members" }), PUBLIC)).toBe(false);
    expect(canSee(as({ visibility: "members" }), MEMBER)).toBe(true);
  });

  it("gives the public a reduced profile with no private fields", async () => {
    const { results } = await searchDirectory({}, PUBLIC);
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(Object.keys(r).sort()).toEqual([
        "city",
        "country",
        "fullName",
        "headline",
        "initials",
        "jurisdictions",
        "photo",
        "slug",
        "social",
        "topics",
        "view",
      ]);
    }
  });

  it("never includes email addresses, even for members", async () => {
    const { results } = await searchDirectory({}, MEMBER);
    expect(JSON.stringify(results)).not.toMatch(/@[a-z0-9-]+\.[a-z]/i);
  });

  it("does not reveal a members-only profile to the public by slug", async () => {
    const hidden = members.find((m) => m.visibility === "members")!;
    expect(await getProfile(hidden.slug, PUBLIC)).toBeNull();
    expect(await getProfile(hidden.slug, MEMBER)).not.toBeNull();
  });

  it("does not let the public search on private fields", async () => {
    const m = members.find((x) => x.visibility === "public")!;
    const pub = await searchDirectory({ q: m.organisation }, PUBLIC);
    expect(pub.results.find((r) => r.slug === m.slug)).toBeUndefined();
    const mem = await searchDirectory({ q: m.organisation }, MEMBER);
    expect(mem.results.find((r) => r.slug === m.slug)).toBeDefined();
  });

  it("matches search terms regardless of case and accents", async () => {
    const { results } = await searchDirectory({ q: "MILAN marchétti" }, PUBLIC);
    expect(results.map((r) => r.slug)).toEqual(["sofia-marchetti"]);
  });
});

describe("data boundaries", () => {
  it("only the directory module reads raw member records", async () => {
    const { readFileSync, readdirSync, statSync } = await import("node:fs");
    const { join } = await import("node:path");
    const walk = (d: string): string[] =>
      readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
    const offenders = walk(join(__dirname, "..", "src")).filter(
      (f) => !f.endsWith("lib/directory.ts") && /mock\/members/.test(readFileSync(f, "utf8")),
    );
    expect(offenders).toEqual([]);
  });
});
