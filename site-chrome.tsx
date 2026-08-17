"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language-provider";

export type HeroImageKey = "home" | "about" | "agenda" | "gallery" | "giving" | "warta" | "worship" | "youtube";

type HeroImageResponse = {
  images?: Partial<Record<HeroImageKey, { imageUrl?: string }>>;
};

export function useDriveHero(heroKey: HeroImageKey) {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/heroes?v=hero-drive-2026-08-15-v1", { cache: "no-store", signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: HeroImageResponse) => {
        const nextSource = data.images?.[heroKey]?.imageUrl;
        if (nextSource) setSource(nextSource);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [heroKey]);

  return source;
}

function Arrow() {
  return <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}

function SocialIcon({ name }: { name: "facebook" | "instagram" | "youtube" }) {
  if (name === "facebook") {
    return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.4 8.3V6.8c0-.8.5-1 1-1h2.5V2.1L14.5 2C11.1 2 10 4 10 6.5v1.8H7v4h3V22h4.4v-9.7h3.1l.5-4h-3.6Z"/></svg>;
  }
  if (name === "instagram") {
    return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.4" cy="6.7" r="1" className="social-dot"/></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8Z"/><path d="m10 15.2 5-3.2-5-3.2v6.4Z" className="social-play"/></svg>;
}

export function LogoBrand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand logo-brand${inverse ? " inverse" : ""}`} href="/" aria-label="POUK Graha Prima — beranda">
      <img src="/logo-pouk-graha-prima.png" alt="Logo POUK Graha Prima" width="58" height="58" />
      <span><span className="brand-name">POUK</span><small>GRAHA PRIMA</small></span>
    </Link>
  );
}

function LanguageToggle() {
  const { language, changeLanguage, t } = useLanguage();
  return (
    <div className="language-toggle" aria-label={t("Pilihan bahasa", "Language selector")}>
      <button className={language === "id" ? "active" : ""} onClick={() => changeLanguage("id")} aria-pressed={language === "id"}>ID</button>
      <span>/</span>
      <button className={language === "en" ? "active" : ""} onClick={() => changeLanguage("en")} aria-pressed={language === "en"}>EN</button>
    </div>
  );
}

export function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const updateHeader = () => {
      const openingVisual = document.querySelector<HTMLElement>(
        ".hero, .page-hero, .not-found",
      );
      if (!openingVisual) {
        setHeaderSolid(true);
        return;
      }

      const visualBottom = openingVisual.offsetTop + openingVisual.offsetHeight - 86;
      setHeaderSolid(window.scrollY >= visualBottom);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, [pathname]);

  return (
    <>
      <div className="announcement">
        <span>{t("Jadwal Ibadah Minggu", "Sunday Worship Schedule")}</span>
        <time dateTime="07:00">{t("07.00 & 10.00 WIB", "7:00 & 10:00 AM")}</time>
        <Link href="/pelayanan#jadwal-ibadah">{t("Lihat jadwal ibadah", "View worship schedule")} <Arrow /></Link>
      </div>
      <header className={`site-header${headerSolid ? " is-solid" : " is-transparent"}`}>
        <LogoBrand />
        <nav className="desktop-nav" aria-label={t("Navigasi utama", "Main navigation")}>
          <Link href="/">{t("Beranda", "Home")}</Link>
          <div className="nav-dropdown">
            <button type="button" aria-haspopup="true">{t("Tentang", "About")} <span>⌄</span></button>
            <div className="dropdown-panel">
              <Link href="/tentang">{t("Tentang POUK", "About POUK")}</Link>
              <Link href="/tentang#sejarah">{t("Sejarah", "History")}</Link>
              <Link href="/tentang#visi-misi">{t("Visi & Misi", "Vision & Mission")}</Link>
              <Link href="/tentang#majelis">{t("Struktur Majelis", "Church Council")}</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <button type="button" aria-haspopup="true">{t("Ibadah & Pelayanan", "Worship & Ministries")} <span>⌄</span></button>
            <div className="dropdown-panel">
              <Link href="/pelayanan">{t("Jadwal Ibadah & Pelayanan", "Worship & Ministry Schedule")}</Link>
              <Link href="/agenda">{t("Agenda & Event", "Calendar & Events")}</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <button type="button" aria-haspopup="true">{t("Media & Informasi", "Media & Information")} <span>⌄</span></button>
            <div className="dropdown-panel">
              <Link href="/warta">{t("Warta & Tata Ibadah", "Bulletin & Order of Worship")}</Link>
              <Link href="/galeri">{t("Galeri", "Gallery")}</Link>
              <Link href="/youtube">YouTube</Link>
            </div>
          </div>
          <Link href="/persembahan">{t("Persembahan", "Giving")}</Link>
          <Link href="/#kontak">{t("Kontak", "Contact")}</Link>
        </nav>
        <div className="header-actions">
          <LanguageToggle />
          <button className="mobile-toggle" onClick={() => setMenuOpen(true)} aria-label={t("Buka menu", "Open menu")}>
            <svg aria-hidden="true" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label={t("Menu navigasi", "Navigation menu")}>
          <div className="mobile-menu-head"><LogoBrand inverse /><button onClick={() => setMenuOpen(false)} aria-label={t("Tutup menu", "Close menu")}>×</button></div>
          <nav>
            <Link href="/" onClick={() => setMenuOpen(false)}><span>01</span>{t("Beranda", "Home")}<Arrow /></Link>
            <Link href="/tentang" onClick={() => setMenuOpen(false)}><span>02</span>{t("Tentang POUK", "About POUK")}<Arrow /></Link>
            <Link href="/agenda" onClick={() => setMenuOpen(false)}><span>03</span>{t("Agenda & Event", "Calendar & Events")}<Arrow /></Link>
            <Link href="/pelayanan" onClick={() => setMenuOpen(false)}><span>04</span>{t("Jadwal & Pelayanan", "Schedule & Ministries")}<Arrow /></Link>
            <Link href="/warta" onClick={() => setMenuOpen(false)}><span>05</span>{t("Warta & Tata Ibadah", "Bulletin & Order of Worship")}<Arrow /></Link>
            <Link href="/galeri" onClick={() => setMenuOpen(false)}><span>06</span>{t("Galeri", "Gallery")}<Arrow /></Link>
            <Link href="/youtube" onClick={() => setMenuOpen(false)}><span>07</span>YouTube<Arrow /></Link>
            <Link href="/persembahan" onClick={() => setMenuOpen(false)}><span>08</span>{t("Persembahan", "Giving")}<Arrow /></Link>
            <Link href="/#kontak" onClick={() => setMenuOpen(false)}><span>09</span>{t("Kontak", "Contact")}<Arrow /></Link>
          </nav>
          <Link className="button gold" href="/warta" onClick={() => setMenuOpen(false)}>{t("Baca Warta & Tata Ibadah", "Read Bulletin & Order of Worship")} <Arrow /></Link>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-main">
          <div className="footer-brand">
            <LogoBrand inverse />
            <p>{t("Rumah rohani yang menyambut setiap generasi untuk bertumbuh dalam iman, persekutuan, dan pelayanan.", "A spiritual home welcoming every generation to grow in faith, fellowship, and service.")}</p>
            <div className="footer-socials">
              <a href="https://www.facebook.com/318785191552590" target="_blank" rel="noreferrer" aria-label="Facebook POUK Graha Prima"><span className="sr-only">Facebook POUK Graha Prima</span><SocialIcon name="facebook" /></a>
              <a href="https://www.instagram.com/parepgp/" target="_blank" rel="noreferrer" aria-label="Instagram Pemuda Remaja POUK Graha Prima"><span className="sr-only">Instagram Pemuda Remaja POUK Graha Prima</span><SocialIcon name="instagram" /></a>
              <a href="https://www.youtube.com/@POUKGRAHAPRIMA" target="_blank" rel="noreferrer" aria-label="YouTube POUK Graha Prima"><span className="sr-only">YouTube POUK Graha Prima</span><SocialIcon name="youtube" /></a>
            </div>
          </div>

          <nav className="footer-column" aria-label={t("Terhubung", "Connect")}>
            <h4>{t("Terhubung", "Connect")}</h4>
            <Link href="/pelayanan#jadwal-ibadah">{t("Jadwal Ibadah & Pelayanan", "Worship & Ministry Schedule")}</Link>
            <Link href="/agenda">{t("Agenda & Event", "Calendar & Events")}</Link>
            <Link href="/galeri">{t("Galeri Jemaat", "Church Gallery")}</Link>
            <Link href="/#kontak">{t("Hubungi Kami", "Contact Us")}</Link>
          </nav>

          <nav className="footer-column" aria-label={t("Bertumbuh", "Grow")}>
            <h4>{t("Bertumbuh", "Grow")}</h4>
            <Link href="/pelayanan#pelayanan-kategorial">{t("Pelayanan Kategorial", "Community Ministries")}</Link>
            <Link href="/tentang#majelis">{t("Struktur Majelis", "Church Council")}</Link>
            <Link href="/tentang#visi-misi">{t("Visi & Misi", "Vision & Mission")}</Link>
            <Link href="/warta">{t("Warta & Tata Ibadah", "Bulletin & Order of Worship")}</Link>
          </nav>

          <nav className="footer-column" aria-label={t("Sumber Daya", "Resources")}>
            <h4>{t("Sumber Daya", "Resources")}</h4>
            <Link href="/youtube">{t("Video & Live Terbaru", "Latest Videos & Live")}</Link>
            <Link href="/persembahan">{t("Persembahan", "Giving")}</Link>
            <Link href="/tentang">{t("Tentang POUK", "About POUK")}</Link>
            <Link href="/#kontak">{t("Lokasi Gereja", "Church Location")}</Link>
          </nav>
        </div>

        <div className="footer-details">
          <div><span>{t("Jadwal Ibadah", "Service Times")}</span><p>{t("Minggu: 07.00 & 10.00 WIB", "Sunday: 7:00 & 10:00 AM")}<br/>{t("Sekolah Minggu: 07.00 WIB", "Sunday School: 7:00 AM")}</p></div>
          <div><span>{t("Kontak", "Contact")}</span><p><a href="mailto:gerejapoukgrahaprima@gmail.com">gerejapoukgrahaprima@gmail.com</a><br/><a href="tel:+6281280639227">+62 812-8063-9227</a></p></div>
          <div><span>{t("Lokasi", "Location")}</span><p>Graha Prima Baru, Blok M<br/>Mangunjaya, Tambun Selatan</p></div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 POUK Graha Prima. {t("Seluruh hak dilindungi.", "All rights reserved.")}</span>
          <div><span>PGI Wilayah Jawa Barat</span><a href="#top">{t("Kembali ke atas", "Back to top")} ↑</a></div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrowId, eyebrowEn, titleId, titleEn, descriptionId, descriptionEn, driveKey, imageAltId, imageAltEn, children }: { eyebrowId: string; eyebrowEn: string; titleId: string; titleEn: string; descriptionId: string; descriptionEn: string; driveKey: HeroImageKey; imageAltId: string; imageAltEn: string; children?: ReactNode }) {
  const { t } = useLanguage();
  const source = useDriveHero(driveKey);
  return (
    <section className="page-hero" id="top">
      <div className="page-hero-copy"><p className="eyebrow light"><span></span>{t(eyebrowId, eyebrowEn)}</p><h1>{t(titleId, titleEn)}</h1><p>{t(descriptionId, descriptionEn)}</p>{children}</div>
      <figure className="page-hero-media">
        {source && <img src={source} alt={t(imageAltId, imageAltEn)} width="1536" height="1024" fetchPriority="high" onError={(event) => { event.currentTarget.hidden = true; }} />}
      </figure>
    </section>
  );
}
