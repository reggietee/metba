import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Enforces the "Rules" section of the brief across all site source.
const ROOT = join(__dirname, "..", "src");

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : /\.(tsx?|mdx?|css)$/.test(f) ? [p] : [];
  });
}

const banned: [RegExp, string][] = [
  [/—/, "em dash"],
  [/bar[- ]verified/i, "bar-verified"],
  [/certified lawyer/i, "certified lawyer"],
  [/actively licensed/i, "actively licensed"],
  [/verified by licen[cs]e/i, "verified by licence"],
  [/licensed (member|professional)s?/i, "licensed member/professional"],
  [/trust registry/i, "trust registry"],
  [/\badmitted\s*:/i, "\"Admitted:\" (implies verified bar admission)"],
  [/bar admissions?/i, "bar admission"],
];

describe("site copy rules", () => {
  const all = files(ROOT);

  it.each(banned)("contains no %s", (re) => {
    const hits = all.filter((f) => re.test(readFileSync(f, "utf8")));
    expect(hits).toEqual([]);
  });

  it("only format.ts produces accreditation wording", () => {
    const hits = all.filter((f) => !f.endsWith("lib/format.ts") && /["'`]Accredited by/.test(readFileSync(f, "utf8")));
    expect(hits).toEqual([]);
  });
});
