import { describe, expect, it } from "vitest";

import { SELF_REPORTED_CPD, cpdStatement } from "@/lib/format";

describe("cpdStatement", () => {
  const base = { jurisdiction: "Ontario", hours: 1.5, category: "substantive" } as const;

  it("states accreditation only with regulator and reference", () => {
    expect(
      cpdStatement({ ...base, accreditationStatus: "accredited", regulator: "Law Society of Ontario", accreditationRef: "X-1" }),
    ).toBe("Accredited by Law Society of Ontario, ref X-1");
  });

  it("never claims accreditation without a reference", () => {
    expect(cpdStatement({ ...base, accreditationStatus: "accredited", regulator: "LSO" })).toBe(SELF_REPORTED_CPD);
    expect(cpdStatement({ ...base, accreditationStatus: "accredited", regulator: "LSO", accreditationRef: "  " })).toBe(
      SELF_REPORTED_CPD,
    );
    expect(cpdStatement({ ...base, accreditationStatus: "pending", regulator: "LSO", accreditationRef: "X" })).toBe(
      SELF_REPORTED_CPD,
    );
    expect(cpdStatement({ ...base, accreditationStatus: "none" })).toBe(SELF_REPORTED_CPD);
  });
});
