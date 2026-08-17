"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../components/language-provider";
import { PageHero, SiteFooter, SiteHeader } from "../components/site-chrome";

const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1JuTWqqzA7RmsTEEKovOy7VROq3JYBG5A?usp=sharing";
const MAX_VISIBLE_FILES = 10;

type BulletinFile = {
  id: string;
  name: string;
  modified: string;
  previewUrl: string;
  viewUrl: string;
  downloadUrl: string;
};

type BulletinResponse = {
  files?: BulletinFile[];
};

function documentTitle(name: string) {
  return name
    .replace(/\.pdf$/i, "")
    .replace(/\s+\(\d+\)$/i, "")
    .replace(/[_]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function documentDate(name: string, fallback: string) {
  const match = name.match(/\b(\d{1,2}\s+(?:JANUARI|FEBRUARI|MARET|APRIL|MEI|JUNI|JULI|AGUSTUS|SEPTEMBER|OKTOBER|NOVEMBER|DESEMBER)\s+\d{4})\b/i);
  if (!match) return fallback;
  return match[1].toLocaleLowerCase("id-ID").replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase("id-ID"));
}

export function WartaView() {
  const { t } = useLanguage();
  const [files, setFiles] = useState<BulletinFile[]>([]);
  const [activeId, setActiveId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/warta", { cache: "no-store", signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: BulletinResponse) => {
        const nextFiles = Array.isArray(data.files) ? data.files.slice(0, MAX_VISIBLE_FILES) : [];
        setFiles(nextFiles);
        setActiveId((current) => current || nextFiles[0]?.id || "");
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const activeFile = useMemo(
    () => files.find((file) => file.id === activeId) ?? files[0],
    [activeId, files],
  );

  return (
    <>
      <SiteHeader/>
      <main className="inner-main">
        <PageHero
          eyebrowId="Informasi mingguan"
          eyebrowEn="Weekly information"
          titleId="Warta & Tata Ibadah"
          titleEn="Bulletin & Order of Worship"
          descriptionId="Baca warta jemaat, susunan liturgi, dan panduan ibadah mingguan langsung dari halaman ini."
          descriptionEn="Read the weekly church bulletin, liturgy, and worship guide directly on this page."
          driveKey="warta"
         
          imageAltId="Warta dan tata ibadah yang sedang dipersiapkan"
          imageAltEn="Church bulletin and order of worship being prepared"
        >
          <div className="warta-hero-actions">
            <a className="button gold" href={DRIVE_FOLDER_URL} target="_blank" rel="noreferrer">{t("Buka Folder Dokumen", "Open Document Folder")} <span aria-hidden="true">↗</span></a>
          </div>
        </PageHero>

        <section className="content-section warta-library-section">
          <div className="warta-page-heading">
            <div><p className="eyebrow"><span></span>{t("Dokumen jemaat", "Church documents")}</p><h2>{t("Baca dokumen", "Read the")} <em>{t("terbaru.", "latest issue.")}</em></h2></div>
            <p>{t("Pilih dokumen berdasarkan tanggal. Dokumen terbaru terbuka otomatis dan maksimal 10 arsip terakhir tersedia di halaman ini.", "Choose a document by date. The newest issue opens automatically, with up to 10 recent documents available on this page.")}</p>
          </div>

          {loading ? (
            <div className="warta-loading" aria-label={t("Memuat dokumen", "Loading documents")}><span></span><span></span></div>
          ) : files.length > 0 && activeFile ? (
            <div className="warta-library-layout">
              <aside className="warta-document-list" aria-label={t("Daftar Warta dan Tata Ibadah", "Bulletin and Order of Worship list")}>
                <div className="warta-list-title"><span>{t("Arsip Dokumen", "Document Archive")}</span><small>{files.length} PDF</small></div>
                <div className="warta-list-scroll">
                  {files.map((file, index) => (
                    <button className={file.id === activeFile.id ? "is-active" : ""} type="button" key={file.id} onClick={() => setActiveId(file.id)} aria-pressed={file.id === activeFile.id}>
                      <span className="warta-pdf-mark">PDF</span>
                      <span><small>{index === 0 ? t("Terbaru", "Latest") : documentDate(file.name, file.modified)}</small><strong>{documentTitle(file.name)}</strong></span>
                      <i aria-hidden="true">→</i>
                    </button>
                  ))}
                </div>
              </aside>

              <article className="warta-reader">
                <div className="warta-reader-toolbar">
                  <div><small>{documentDate(activeFile.name, activeFile.modified)}</small><strong>{documentTitle(activeFile.name)}</strong></div>
                  <div>
                    <a href={activeFile.viewUrl} target="_blank" rel="noreferrer">{t("Buka di Drive", "Open in Drive")} ↗</a>
                    <a className="warta-download" href={activeFile.downloadUrl} target="_blank" rel="noreferrer">{t("Unduh PDF", "Download PDF")}</a>
                  </div>
                </div>
                <div className="warta-reader-frame">
                  <iframe src={activeFile.previewUrl} title={`${documentTitle(activeFile.name)} — POUK Graha Prima`} loading="eager" allow="autoplay"></iframe>
                </div>
              </article>
            </div>
          ) : (
            <div className="warta-empty-state">
              <span>PDF</span>
              <h2>{t("Dokumen belum dapat ditampilkan.", "Documents are not available yet.")}</h2>
              <p>{t("Pastikan file PDF di folder sudah dapat dilihat oleh siapa saja yang memiliki link.", "Make sure the PDFs in the folder are visible to anyone with the link.")}</p>
              <a className="button navy" href={DRIVE_FOLDER_URL} target="_blank" rel="noreferrer">{t("Buka Folder Dokumen", "Open Document Folder")} →</a>
            </div>
          )}
        </section>
      </main>
      <SiteFooter/>
    </>
  );
}
