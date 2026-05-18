import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WebmasterID } from "@/components/analytics/WebmasterID";
import "@/styles/globals.css";

// WebmasterID analytics — production site id and ingest endpoint.
// Both are public values (the site id is the same one the tracker
// script reports from the browser); overridable via NEXT_PUBLIC_* env
// vars per src/components/analytics/WebmasterID.tsx.
const WEBMASTERID_SITE_ID =
  process.env.NEXT_PUBLIC_WEBMASTERID_SITE_ID ?? "wm_5flk74cqef8jjxar";
const WEBMASTERID_ENDPOINT =
  process.env.NEXT_PUBLIC_WEBMASTERID_ENDPOINT ??
  "https://webmasterid-ingest-api.vercel.app/api/events";
// Hoist the disabled check to the layout so the component isn't even
// invoked in disabled environments. The component does the same check
// internally as defence-in-depth, but skipping the invocation here
// keeps the site id out of the RSC serialization payload entirely.
const WEBMASTERID_ENABLED =
  process.env.NEXT_PUBLIC_WEBMASTERID_DISABLED !== "1";

const serif = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#FAF7F1",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: siteConfig.name }],
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [siteConfig.defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Philosophy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.language} className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-charcoal focus:px-3 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        {WEBMASTERID_ENABLED ? (
          <WebmasterID
            siteId={WEBMASTERID_SITE_ID}
            endpoint={WEBMASTERID_ENDPOINT}
          />
        ) : null}
      </body>
    </html>
  );
}
