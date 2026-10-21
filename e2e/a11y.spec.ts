import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/about",
  "/membership",
  "/for-students",
  "/for-the-public",
  "/insights",
  "/insights/eu-ai-act-general-purpose-models",
  "/topics",
  "/topics/ai-governance",
  "/events",
  "/events/past",
  "/events/tokenized-funds-across-jurisdictions",
  "/events/dao-liability-after-recent-rulings",
  "/privacy",
  "/directory",
  "/directory?view=list",
  "/directory/adaeze-okafor",
  "/styleguide",
];

for (const scheme of ["light", "dark"] as const) {
  for (const route of routes) {
    test(`${route} has no WCAG A/AA violations (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.addInitScript((t) => localStorage.setItem("theme", t), scheme);
      await page.goto(route);
      await expect(page).toHaveTitle(/MetBA/);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
    });
  }
}

for (const route of routes) {
  test(`${route} has no horizontal scroll at 360px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
