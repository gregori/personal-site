import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { LanguageProvider } from "@/app/contexts/LanguageContext";
import ChatWidget from "@/app/components/ChatWidget";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import { profile } from "@/app/data/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://rodrigogregori.dev";

export const metadata: Metadata = {
  title: "Rodrigo Gregori | Software Engineer",
  description:
    "Almost 20 years in IT — from systems and network administration to software engineering leadership.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Rodrigo Gregori | Software Engineer",
    description:
      "Almost 20 years in IT — from systems and network administration to software engineering leadership.",
    url: siteUrl,
    siteName: "Rodrigo Gregori",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rodrigo Gregori | Software Engineer",
    description:
      "Almost 20 years in IT — from systems and network administration to software engineering leadership.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: profile.email,
  url: siteUrl,
  sameAs: [profile.linkedin],
  knowsAbout: profile.skills,
  worksFor: {
    "@type": "Organization",
    name: profile.company,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Joinville",
    addressRegion: "Santa Catarina",
    addressCountry: "Brazil",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <LanguageProvider>
          {children}
          <ErrorBoundary>
            <ChatWidget />
          </ErrorBoundary>
        </LanguageProvider>
        {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
