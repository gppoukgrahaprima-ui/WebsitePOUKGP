"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { PageHero, SiteFooter, SiteHeader } from "./site-chrome";

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/embed?src=gppoukgrahaprima%40gmail.com&ctz=Asia%2FJakarta";
const GOOGLE_CALENDAR_EMBED_BASE =
  `${GOOGLE_CALENDAR_URL}&showTitle=0&showNav=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&bgcolor=%23FAF8F2`;

function Frame({ children }: { children: ReactNode }) {
  return <><SiteHeader/><main className="inner-main">{children}</main><SiteFooter/></>;
}

export function AboutView() {
  const { t } = useLanguage();
  const council = [
    ["Pendeta Jemaat", "Church Pastor", "Pdt. [Nama Pendeta]"],
    ["Ketua Majelis", "Council Chair", "[Nama Ketua Majelis]"],
    ["Wakil Ketua", "Vice Chair", "[Nama Wakil Ketua]"],
    ["Sekretaris", "Secretary", "[Nama Sekretaris]"],
    ["Bendahara", "Treasurer", "[Nama Bendahara]"],
    ["Koordinator Pelayanan", "Ministry Coordinator", "[Nama Koordinator]"],
  ];
  return (
    <Frame>
      <PageHero eyebrowId="Mengenal kami" eyebrowEn="Get to know us" titleId="Tentang POUK Graha Prima" titleEn="About POUK Graha Prima" descriptionId="Rumah persekutuan lintas denominasi yang bertumbuh bersama dalam iman, kasih, dan pelayanan." descriptionEn="An ecumenical church family growing together in faith, love, and service." />
      <section className="content-section intro-grid" id="sejarah">
        <div><p className="section-number">01</p><p className="eyebrow"><span></span>{t("Sejarah", "History")}</p><h2>{t("Bertumbuh dari kerinduan untuk bersekutu.", "Growing from a shared desire for fellowship.")}</h2></div>
        <div className="prose"><p>{t("POUK Graha Prima hadir sebagai wadah persekutuan umat Kristen di lingkungan Graha Prima dan sekitarnya. Jemaat dari beragam latar belakang denominasi dipersatukan untuk beribadah, bertumbuh, dan melayani bersama.", "POUK Graha Prima serves Christians in Graha Prima and the surrounding community. People from different denominational backgrounds are united to worship, grow, and serve together.")}</p><p className="dummy-note">{t("Catatan: narasi sejarah ini merupakan contoh dan dapat diganti dengan kronologi resmi gereja.", "Note: this history is sample copy and can be replaced with the church’s official chronology.")}</p></div>
      </section>
      <section className="content-section values-section" id="visi-misi">
        <div className="section-title"><p className="eyebrow light"><span></span>{t("Arah pelayanan", "Our direction")}</p><h2>{t("Visi & Misi", "Vision & Mission")}</h2></div>
        <div className="vision-grid">
          <article><span>VISI</span><h3>{t("Menjadi persekutuan yang bertumbuh, inklusif, dan menjadi berkat.", "To be a growing, inclusive fellowship that blesses others.")}</h3></article>
          <article><span>MISI</span><ul><li>{t("Membangun ibadah yang berpusat pada Kristus.", "Build Christ-centered worship.")}</li><li>{t("Mendorong pertumbuhan iman setiap generasi.", "Nurture faith in every generation.")}</li><li>{t("Mengembangkan pelayanan yang peduli dan relevan.", "Develop compassionate and relevant ministries.")}</li><li>{t("Menjadi berkat bagi lingkungan dan masyarakat.", "Be a blessing to the community.")}</li></ul></article>
        </div>
      </section>
      <section className="content-section" id="majelis">
        <div className="section-heading"><div><p className="eyebrow"><span></span>{t("Pelayan jemaat", "Church leadership")}</p><h2>{t("Struktur", "Church")} <em>{t("Majelis", "Council")}</em></h2></div><p>{t("Susunan berikut masih berupa contoh. Nama dan periode pelayanan dapat diperbarui sesuai keputusan resmi gereja.", "The structure below is sample content. Names and service terms can be updated according to official church decisions.")}</p></div>
        <div className="council-grid">{council.map(([idRole,enRole,name],i)=><article key={idRole}><span>{String(i+1).padStart(2,"0")}</span><p><small>{t(idRole,enRole)}</small><strong>{name}</strong></p></article>)}</div>
      </section>
    </Frame>
  );
}

export function AgendaView() {
  const { language, t } = useLanguage();
  const calendarEmbedUrl = `${GOOGLE_CALENDAR_EMBED_BASE}&hl=${language === "id" ? "id" : "en"}`;
  return (
    <Frame>
      <PageHero eyebrowId="Kalender pelayanan" eyebrowEn="Ministry calendar" titleId="Agenda & Event Gereja" titleEn="Church Calendar & Events" descriptionId="Lihat jadwal, lokasi, dan detail kegiatan pelayanan POUK Graha Prima." descriptionEn="View schedules, locations, and details for POUK Graha Prima ministry activities." />
      <section className="content-section calendar-live-section">
        <div className="calendar-live-heading"><div><p className="eyebrow"><span></span>{t("Kalender resmi", "Official calendar")}</p><h2>{t("Jadwal pelayanan yang selalu diperbarui.", "A ministry schedule that stays up to date.")}</h2></div><p>{t("Gunakan pilihan Bulan, Minggu, atau Agenda pada kalender. Klik kegiatan untuk melihat waktu, lokasi, dan deskripsinya.", "Use the Month, Week, or Agenda views. Select an event to see its time, location, and description.")}</p></div>
        <div className="calendar-embed-shell calendar-embed-page">
          <iframe
            src={calendarEmbedUrl}
            title={t("Kalender resmi POUK Graha Prima", "Official POUK Graha Prima calendar")}
            loading="eager"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </section>
      <div className="content-section calendar-source-note"><span><i></i>{t("Tersinkron otomatis dari Google Calendar resmi POUK Graha Prima.", "Automatically synced from the official POUK Graha Prima Google Calendar.")}</span><a className="button navy" href={GOOGLE_CALENDAR_URL} target="_blank" rel="noreferrer">{t("Buka Google Calendar", "Open Google Calendar")} →</a></div>
    </Frame>
  );
}

export function MinistriesView() {
  const { t } = useLanguage();
  const items = [
    ["Sekolah Minggu","Sunday School","Minggu · 07.00 WIB","Anak-anak belajar mengenal kasih Tuhan melalui ibadah dan aktivitas kreatif.","Children discover God’s love through worship and creative activities."],
    ["Pemuda & Remaja","Youth Ministry","Sabtu · 19.00 WIB","Ruang generasi muda untuk bertumbuh, berkarya, dan membangun persahabatan.","A place for young people to grow, create, and build friendships."],
    ["Kaum Ibu","Women’s Fellowship","Sabtu · 17.00 WIB","Persekutuan dalam firman, doa, keluarga, dan kepedulian sosial.","Fellowship through the Word, prayer, family life, and social care."],
    ["Kaum Bapak","Men’s Fellowship","Sabtu · 20.00 WIB","Penguatan iman dan peran sebagai teladan di keluarga serta jemaat.","Strengthening faith and leadership in family and church life."],
    ["Lansia","Senior Fellowship","Selasa · 09.30 WIB","Kebersamaan, doa, kesehatan, dan pendampingan bagi jemaat lansia.","Community, prayer, wellness, and care for senior members."],
    ["Musik & Multimedia","Music & Multimedia","Sesuai jadwal pelayanan","Melayani ibadah melalui musik, audio, visual, dokumentasi, dan siaran digital.","Supporting worship through music, audio, visuals, documentation, and digital broadcasting."],
  ];
  return <Frame><PageHero eyebrowId="Bertumbuh & melayani" eyebrowEn="Grow & serve" titleId="Bidang Pelayanan" titleEn="Our Ministries" descriptionId="Setiap generasi memiliki ruang untuk bertumbuh, membangun relasi, dan mengambil bagian." descriptionEn="Every generation has a place to grow, build relationships, and take part."/><section className="content-section ministry-directory">{items.map((item,i)=><article key={item[0]}><span>{String(i+1).padStart(2,"0")}</span><small>{item[2]}</small><h2>{t(item[0],item[1])}</h2><p>{t(item[3],item[4])}</p><a href="mailto:gerejapoukgrahaprima@gmail.com?subject=Informasi%20Pelayanan">{t("Hubungi koordinator", "Contact the coordinator")} →</a></article>)}</section></Frame>;
}

type GalleryPhoto = { id: string; name: string; modified: string; thumbnailUrl: string; fullUrl: string; viewUrl: string };
type GallerySection = { key: string; titleId: string; titleEn: string; folderUrl: string; photos: GalleryPhoto[] };

const galleryFolders: GallerySection[] = [
  { key: "ibadah-minggu", titleId: "Ibadah Minggu", titleEn: "Sunday Worship", folderUrl: "https://drive.google.com/drive/folders/1O-hYedcI6DKzHQrAbzSNQZ0cnRRo74Xr?usp=sharing", photos: [] },
  { key: "persekutuan-pemuda", titleId: "Persekutuan Pemuda", titleEn: "Youth Fellowship", folderUrl: "https://drive.google.com/drive/folders/1pJaitInyvgJTrqntTqlcqCscjb-EUHGe?usp=sharing", photos: [] },
  { key: "sekolah-minggu", titleId: "Sekolah Minggu", titleEn: "Sunday School", folderUrl: "https://drive.google.com/drive/folders/13BHATO9jay7bWSndDQEXDwbLxZv1E-AT?usp=sharing", photos: [] },
  { key: "ibadah-keluarga", titleId: "Ibadah Keluarga", titleEn: "Family Worship", folderUrl: "https://drive.google.com/drive/folders/1mmwxwlVF9AbejvA5s2EERfzWXlw-yknD?usp=sharing", photos: [] },
  { key: "pelayanan-musik", titleId: "Pelayanan Musik", titleEn: "Music Ministry", folderUrl: "https://drive.google.com/drive/folders/1Z54a_NyFIwlVPBAmvKhGS7RVTUL-2Xlk?usp=sharing", photos: [] },
  { key: "kebersamaan-jemaat", titleId: "Kebersamaan Jemaat", titleEn: "Church Fellowship", folderUrl: "https://drive.google.com/drive/folders/1OJggteM1xkTowT4BJkNrj-ZyisZlgbv-?usp=sharing", photos: [] },
];

export function GalleryView() {
  const { t } = useLanguage();
  const [sections, setSections] = useState<GallerySection[]>(galleryFolders);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<{ section: number; photo: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/gallery")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (!cancelled && Array.isArray(data.sections)) setSections(data.sections);
      })
      .catch(() => undefined)
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [active]);

  const activeSection = active ? sections[active.section] : null;
  const activePhoto = active && activeSection ? activeSection.photos[active.photo] : null;
  const movePhoto = (direction: number) => setActive((current) => {
    if (!current) return null;
    const photos = sections[current.section]?.photos ?? [];
    if (!photos.length) return current;
    return { section: current.section, photo: (current.photo + direction + photos.length) % photos.length };
  });

  return (
    <Frame>
      <PageHero eyebrowId="Dokumentasi kegiatan" eyebrowEn="Activity highlights" titleId="Galeri Jemaat" titleEn="Church Gallery" descriptionId="Enam ruang dokumentasi yang otomatis menampilkan foto terbaru dari Google Drive resmi POUK Graha Prima." descriptionEn="Six collections automatically showing the latest photos from the official POUK Graha Prima Google Drive."/>
      <section className="content-section gallery-stream">
        {sections.map((section, sectionIndex) => (
          <section className="gallery-group" id={section.key} key={section.key}>
            <header className="gallery-group-header">
              <div className="gallery-group-title"><span>{String(sectionIndex + 1).padStart(2, "0")}</span><div><p>{t("Dokumentasi terbaru", "Latest highlights")}</p><h2>{t(section.titleId, section.titleEn)}</h2></div></div>
              <div className="gallery-group-action"><small><i></i>{t("Sinkron otomatis dari Google Drive", "Synced automatically from Google Drive")}</small><a href={section.folderUrl} target="_blank" rel="noreferrer">{t("Buka folder", "Open folder")} →</a></div>
            </header>
            <div className="drive-photo-row" aria-busy={loading}>
              {loading && !section.photos.length
                ? Array.from({ length: 6 }, (_, index) => <div className="drive-photo-skeleton" key={index}></div>)
                : section.photos.map((photo, photoIndex) => (
                  <button className="drive-photo-card" key={photo.id} onClick={() => setActive({ section: sectionIndex, photo: photoIndex })} aria-label={`${t("Buka foto", "Open photo")} ${photoIndex + 1} — ${t(section.titleId, section.titleEn)}`}>
                    <img src={photo.thumbnailUrl} alt={`${t(section.titleId, section.titleEn)} — ${photo.name}`} loading="lazy" onError={(event) => { event.currentTarget.src = "/gereja-pouk-graha-prima.png"; }}/>
                    <span>{String(photoIndex + 1).padStart(2, "0")}</span>
                  </button>
                ))}
            </div>
            {!loading && !section.photos.length && <div className="gallery-empty"><p>{t("Belum ada foto yang dapat ditampilkan.", "No photos are available yet.")}</p><a href={section.folderUrl} target="_blank" rel="noreferrer">{t("Periksa folder Google Drive", "Check the Google Drive folder")} →</a></div>}
          </section>
        ))}
      </section>
      {activePhoto && activeSection && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={t("Pratinjau foto", "Photo preview")} onClick={() => setActive(null)}>
          <button className="gallery-close" aria-label={t("Tutup", "Close")} onClick={() => setActive(null)}>×</button>
          <button className="gallery-nav gallery-prev" aria-label={t("Foto sebelumnya", "Previous photo")} onClick={(event) => { event.stopPropagation(); movePhoto(-1); }}>‹</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={activePhoto.fullUrl} alt={`${t(activeSection.titleId, activeSection.titleEn)} — ${activePhoto.name}`} onError={(event) => { event.currentTarget.src = "/gereja-pouk-graha-prima.png"; }}/>
            <figcaption><span>{t(activeSection.titleId, activeSection.titleEn)}</span><a href={activePhoto.viewUrl} target="_blank" rel="noreferrer">{t("Buka foto asli di Drive", "Open original in Drive")} ↗</a></figcaption>
          </figure>
          <button className="gallery-nav gallery-next" aria-label={t("Foto berikutnya", "Next photo")} onClick={(event) => { event.stopPropagation(); movePhoto(1); }}>›</button>
        </div>
      )}
    </Frame>
  );
}

export function GivingView() {
  const { t } = useLanguage();
  return <Frame><PageHero eyebrowId="Mendukung pelayanan" eyebrowEn="Supporting ministry" titleId="Persembahan" titleEn="Giving" descriptionId="Contoh halaman informasi persembahan dan dukungan pelayanan POUK Graha Prima." descriptionEn="A sample page for giving and supporting the ministry of POUK Graha Prima."/><section className="content-section giving-layout"><div className="giving-copy"><p className="eyebrow"><span></span>{t("Informasi contoh", "Sample information")}</p><h2>{t("Memberi dengan sukacita dan tanggung jawab.", "Give with joy and responsibility.")}</h2><p>{t("Seluruh data rekening dan QRIS di halaman ini masih dummy. Jangan melakukan transfer sampai informasi resmi disahkan dan diumumkan oleh Majelis POUK Graha Prima.", "All bank and QRIS details on this page are placeholders. Do not transfer funds until official information is approved and announced by the POUK Graha Prima Church Council.")}</p><div className="account-card"><small>{t("REKENING CONTOH / JANGAN TRANSFER", "SAMPLE ACCOUNT / DO NOT TRANSFER")}</small><strong>0000 0000 0000</strong><span>Bank [Nama Bank] · POUK Graha Prima</span></div><ul><li>{t("Pastikan nama penerima sesuai informasi resmi gereja.", "Confirm the recipient name matches official church information.")}</li><li>{t("Simpan bukti transfer untuk keperluan administrasi.", "Keep the transfer receipt for administration.")}</li><li>{t("Hubungi bendahara jika membutuhkan konfirmasi.", "Contact the treasurer if confirmation is needed.")}</li></ul></div><div className="qris-card"><span>DUMMY</span><div className="fake-qr" aria-label={t("Kode QRIS contoh, tidak dapat digunakan", "Sample QRIS code, not usable")}></div><h3>QRIS POUK GRAHA PRIMA</h3><p>{t("Contoh tampilan — belum aktif", "Sample display — not active")}</p></div></section><section className="content-section giving-contact"><h2>{t("Butuh konfirmasi persembahan?", "Need giving confirmation?")}</h2><a className="button navy" href="mailto:gerejapoukgrahaprima@gmail.com?subject=Konfirmasi%20Persembahan">{t("Hubungi sekretariat", "Contact the church office")} →</a></section></Frame>;
}

export function NotFoundView() {
  const { t } = useLanguage();
  return <Frame><section className="not-found" id="top"><span>404</span><p className="eyebrow light"><span></span>{t("Halaman tidak ditemukan", "Page not found")}</p><h1>{t("Halaman yang Anda cari tidak ditemukan.", "The page you are looking for was not found.")}</h1><p>{t("Halaman tersebut mungkin sudah dipindahkan atau alamatnya kurang tepat.", "The page may have moved or the address may be incorrect.")}</p><Link className="button gold" href="/">← {t("Kembali ke beranda", "Back to home")}</Link></section></Frame>;
}
