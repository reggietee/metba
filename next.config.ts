import type { NextConfig } from "next";

// Old WordPress URLs. Each goes straight to its new home with a single 301.
const legacyRedirects: [string, string][] = [
  ["/members", "/directory"],
  ["/become-a-member", "/join"],
  ["/login", "/sign-in"],
  ["/wp-login.php", "/sign-in"],
  ["/wp-admin/:path*", "/sign-in"],
];

const nextConfig: NextConfig = {
  // Lets the dev server be opened from other devices on the local network.
  allowedDevOrigins: ["192.168.2.181"],
  cacheComponents: true,
  images: { formats: ["image/avif", "image/webp"] },
  partialPrefetching: true,
  // Trailing slashes are handled below so legacy URLs avoid a 308 then 301 chain.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      ...legacyRedirects.flatMap(([source, destination]) => [
        { source, destination, statusCode: 301 as const },
        ...(source.includes(":") || source.endsWith(".php")
          ? []
          : [{ source: `${source}/`, destination, statusCode: 301 as const }]),
      ]),
      // Any other trailing-slash URL, including /about/ and /events/, drops the slash.
      { source: "/:path+/", destination: "/:path+", statusCode: 301 as const },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
