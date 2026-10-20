import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3123);

export default defineConfig({
  testDir: "e2e",
  use: { baseURL: process.env.BASE_URL ?? `http://localhost:${PORT}` },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: `npm run start -- -p ${PORT}`, port: PORT, reuseExistingServer: true },
});
