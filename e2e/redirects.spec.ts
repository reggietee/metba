import { expect, test } from "@playwright/test";

// Old WordPress URLs must reach their new home in a single 301.
const cases: [string, string][] = [
  ["/about/", "/about"],
  ["/members/", "/directory"],
  ["/events/", "/events"],
  ["/become-a-member/", "/join"],
  ["/login/", "/sign-in"],
];

for (const [from, to] of cases) {
  test(`${from} redirects to ${to} with 301`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(301);
    expect(new URL(res.headers()["location"], "http://x").pathname).toBe(to);
  });
}
