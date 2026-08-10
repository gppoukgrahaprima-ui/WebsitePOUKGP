"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language-provider";

const DRIVE_URL = "https://www.drive.google.com/";

function Arrow() {
  return <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}

export function LogoBrand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand logo-brand${inverse ? " inverse" : ""}`} href="/" aria-label="POUK Graha Prima — beranda">
      <img src="/logo-pouk-graha-prima.png" alt="" width="58" height="58" />
      <span><strong>POUK</strong><small>GRAHA PRIMA</small></span>
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
        <strong>{t("07.00 & 10.00 WIB", "7:00 & 10:00 AM")}</strong>
        <Link href="/#jadwal">{t("Lihat selengkapnya", "View details")} <Arrow /></Link>
      </div>
      <header className={`site-header${headerSolid ? " is-solid" : " is-transparent"}`}>
        <LogoBrand />
        <nav className="desktop-nav" aria-label={t("Navigasi utama", "Main navigation")}>
          <Link href="/">{t("Beranda", "Home")}</Link>
          <div className="nav-dropdown">
            <button type="button" aria-haspopup="true">{t("Tentang", "About")} <span>⌄</span></button>
            <div className="dropdown-panel">
              <Link href="/tentang">{t("Tentang POUK", "About POUK")}<small>{t("Profil dan identitas gereja", "Church profile and identity")}</small></Link>
              <Link href="/tentang#sejarah">{t("Sejarah", "History")}</Link>
              <Link href="/tentang#visi-misi">{t("Visi & Misi", "Vision & Mission")}</Link>
              <Link href="/tentang#majelis">{t("Struktur Majelis", "Church Council")}</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <button type="button" aria-haspopup="true">{t("Ibadah & Pelayanan", "Worship & Ministries")} <span>⌄</span></button>
            <div className="dropdown-panel">
              <Link href="/#jadwal">{t("Jadwal Ibadah", "Worship Schedule")}</Link>
              <Link href="/agenda">{t("Agenda & Event", "Calendar & Events")}</Link>
              <Link href="/pelayanan">{t("Bidang Pelayanan", "Ministries")}</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <button type="button" aria-haspopup="true">{t("Media & Informasi", "Media & Information")} <span>⌄</span></button>
            <div className="dropdown-panel">
              <a href={DRIVE_URL} target="_blank" rel="noreferrer">{t("Warta / Tata Ibadah", "Bulletin / Order of Worship")}</a>
              <Link href="/galeri">{t("Galeri", "Gallery")}</Link>
              <Link href="/#youtube">YouTube</Link>
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
            <Link href="/pelayanan" onClick={() => setMenuOpen(false)}><span>04</span>{t("Pelayanan", "Ministries")}<Arrow /></Link>
            <Link href="/galeri" onClick={() => setMenuOpen(false)}><span>05</span>{t("Galeri", "Gallery")}<Arrow /></Link>
            <Link href="/persembahan" onClick={() => setMenuOpen(false)}><span>06</span>{t("Persembahan", "Giving")}<Arrow /></Link>
            <Link href="/#kontak" onClick={() => setMenuOpen(false)}><span>07</span>{t("Kontak", "Contact")}<Arrow /></Link>
          </nav>
          <a className="button gold" href={DRIVE_URL} target="_blank" rel="noreferrer">{t("Buka Warta di Drive", "Open Bulletin on Drive")} <Arrow /></a>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand"><LogoBrand inverse /><p>{t("Persekutuan Oikoumene Umat Kristen", "Ecumenical Christian Fellowship")}<br/>Graha Prima, Tambun Selatan – Bekasi.</p></div>
        <div><h4>{t("Tentang", "About")}</h4><Link href="/tentang#sejarah">{t("Sejarah", "History")}</Link><Link href="/tentang#visi-misi">{t("Visi & Misi", "Vision & Mission")}</Link><Link href="/tentang#majelis">{t("Struktur Majelis", "Church Council")}</Link></div>
        <div><h4>{t("Informasi", "Information")}</h4><Link href="/agenda">{t("Agenda", "Calendar")}</Link><Link href="/galeri">{t("Galeri", "Gallery")}</Link></div>
        <div><h4>{t("Terhubung", "Connect")}</h4><a href="https://www.youtube.com/@POUKGRAHAPRIMA" target="_blank" rel="noreferrer">YouTube POUK GP</a><a href="https://www.instagram.com/parepgp/" target="_blank" rel="noreferrer">Instagram PaRe</a><a href="https://www.facebook.com/318785191552590" target="_blank" rel="noreferrer">Facebook</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 POUK Graha Prima</span><span>PGI Wilayah Jawa Barat</span><a href="#top">{t("Kembali ke atas", "Back to top")} ↑</a></div>
    </footer>
  );
}

export function PageHero({ eyebrowId, eyebrowEn, titleId, titleEn, descriptionId, descriptionEn, children }: { eyebrowId: string; eyebrowEn: string; titleId: string; titleEn: string; descriptionId: string; descriptionEn: string; children?: ReactNode }) {
  const { t } = useLanguage();
  return (
    <section className="page-hero" id="top">
      <div><p className="eyebrow light"><span></span>{t(eyebrowId, eyebrowEn)}</p><h1>{t(titleId, titleEn)}</h1><p>{t(descriptionId, descriptionEn)}</p>{children}</div>
      <img src="/logo-pouk-graha-prima.png" alt="Logo POUK Graha Prima" width="1024" height="1024" />
    </section>
  );
}
