import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LanguageProvider } from "./components/language-provider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "POUK Graha Prima | Gereja Oikoumene Tambun Bekasi", template: "%s | POUK Graha Prima" },
  description: "Website resmi POUK Graha Prima Tambun Bekasi. Informasi jadwal ibadah, Warta Jemaat, Tata Ibadah, pelayanan, kegiatan, dan kontak gereja.",
  applicationName: "POUK Graha Prima",
  authors: [{ name: "POUK Graha Prima" }],
  creator: "POUK Graha Prima",
  publisher: "POUK Graha Prima",
  category: "Church",
  keywords: ["POUK Graha Prima", "gereja Tambun", "gereja Bekasi", "gereja oikoumene", "jadwal ibadah Tambun", "Warta Jemaat", "gereja Jawa Barat"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    title: "POUK Graha Prima",
    description: "Bertumbuh dalam iman, hidup dalam persekutuan, dan menjadi berkat bagi sesama.",
    type: "website",
    url: "/",
    siteName: "POUK Graha Prima",
    locale: "id_ID",
    images: [{ url: "/gereja-pouk-graha-prima.png", width: 900, height: 900, alt: "Gereja POUK Graha Prima" }],
  },
  twitter: { card: "summary_large_image", title: "POUK Graha Prima", description: "Gereja Oikoumene di Tambun Selatan, Bekasi.", images: ["/gereja-pouk-graha-prima.png"] },
  icons: { icon: "/logo-pouk-graha-prima.png", shortcut: "/logo-pouk-graha-prima.png", apple: "/logo-pouk-graha-prima.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const churchSchema = {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${siteUrl}/#church`,
    name: "POUK Graha Prima",
    alternateName: "Persekutuan Oikoumene Umat Kristen Graha Prima",
    url: siteUrl,
    logo: `${siteUrl}/logo-pouk-graha-prima.png`,
    image: `${siteUrl}/gereja-pouk-graha-prima.png`,
    email: "gerejapoukgrahaprima@gmail.com",
    telephone: "+62-812-8063-9227",
    address: { "@type": "PostalAddress", streetAddress: "Graha Prima Baru, Blok M, RT 08/RW 25", addressLocality: "Mangunjaya, Tambun Selatan", addressRegion: "Jawa Barat", postalCode: "17517", addressCountry: "ID" },
    sameAs: ["https://www.facebook.com/318785191552590", "https://www.instagram.com/parepgp/", "https://www.youtube.com/@POUKGRAHAPRIMA"],
  };
  const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "POUK Graha Prima", inLanguage: ["id-ID", "en"] };
  return <html lang="id"><body className={`${geist.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([churchSchema,websiteSchema])}}/><LanguageProvider>{children}</LanguageProvider></body></html>;
}
