import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Libre_Franklin } from "next/font/google";

import { ThemeProvider } from "@/components/site/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";

// Adobe Fonts web project (Freight Big Pro Light + Light Italic, Acumin Pro). Optional:
// without it the free Libre fonts below are used. Only the ID is needed, not the full embed code.
const adobeFontsKit = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT?.match(/^[a-z0-9]{5,12}$/)?.[0];

// Fallback fonts. Caslon: the face of legal printing. Franklin Gothic: the American newsroom sans.
// Metric-matched fallback (measured: Times at 90.3% matches Caslon Display's widths), so the hero
// does not reflow when the web font arrives. The automatic fallback wrapped it onto an extra line.
const caslonFallbackCss = `@font-face{font-family:"Caslon Display Fallback";src:local("Times New Roman"),local("TimesNewRomanPSMT"),local("Times"),local("Liberation Serif");size-adjust:90.3%;ascent-override:97%;descent-override:27%;line-gap-override:0%}`;
const caslonDisplay = Libre_Caslon_Display({
  variable: "--font-caslon-display",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  adjustFontFallback: false,
  fallback: ["Caslon Display Fallback", "Georgia", "serif"],
});
const caslonText = Libre_Caslon_Text({
  variable: "--font-caslon-text",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "italic",
});
const franklin = Libre_Franklin({ variable: "--font-franklin", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} (${site.shortName})`, template: `%s | ${site.shortName}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en" },
  twitter: { card: "summary_large_image", site: "@metaverseBA" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1210" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${franklin.variable} ${caslonDisplay.variable} ${caslonText.variable} antialiased`}
    >
      <head>
        {adobeFontsKit ? (
          <>
            <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
            <link rel="stylesheet" href={`https://use.typekit.net/${adobeFontsKit}.css`} />
          </>
        ) : null}
        <style dangerouslySetInnerHTML={{ __html: caslonFallbackCss }} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-md bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
