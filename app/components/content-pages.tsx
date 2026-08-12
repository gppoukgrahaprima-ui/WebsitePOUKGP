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
    ["Pendeta Jemaat", "Church Pastor", "Pdt. [Nama Pendeta]", "/council-pastor.webp"],
    ["Ketua Majelis", "Council Chair", "[Nama Ketua Majelis]", "/council-chair.webp"],
    ["Wakil Ketua", "Vice Chair", "[Nama Wakil Ketua]", "/council-vice-chair.webp"],
    ["Sekretaris", "Secretary", "[Nama Sekretaris]", "/council-secretary.webp"],
    ["Bendahara", "Treasurer", "[Nama Bendahara]", "/council-treasurer.webp"],
    ["Koordinator Pelayanan", "Ministry Coordinator", "[Nama Koordinator]", "/council-ministry-coordinator.webp"],
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
        <div className="council-grid">{council.map(([idRole,enRole,name,image],i)=><article key={idRole}><img src={image} alt={t(`Ilustrasi ${idRole} POUK Graha Prima`, `${enRole} serving at POUK Graha Prima`)} loading="lazy"/><div className="council-card-number">{String(i+1).padStart(2,"0")}</div><p><small>{t(idRole,enRole)}</small><strong>{name}</strong></p></article>)}</div>
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
      <div className="content-section calendar-source-note"><span><i></i>{t("Jadwal kegiatan terbaru POUK Graha Prima.", "The latest POUK Graha Prima activity schedule.")}</span><a className="button navy" href={GOOGLE_CALENDAR_URL} target="_blank" rel="noreferrer">{t("Lihat kalender lengkap", "View full calendar")} →</a></div>
    </Frame>
  );
}

export function MinistriesView() {
  const { t } = useLanguage();
  const items = [
    ["Sekolah Minggu","Sunday School","Minggu · 07.00 WIB","Anak-anak belajar mengenal kasih Tuhan melalui ibadah dan aktivitas kreatif.","Children discover God’s love through worship and creative activities.","/ministry-sekolah-minggu.webp"],
    ["Pemuda & Remaja","Youth & Teen Fellowship","Setiap awal minggu","Persekutuan bersama untuk bertumbuh dalam iman, berkarya, dan membangun persahabatan lintas usia.","A weekly fellowship to grow in faith, create, and build friendships across age groups.","/ministry-pemuda-remaja.webp"],
    ["Pemuda","Youth Fellowship","Sesuai jadwal pelayanan","Ruang khusus pemuda untuk berdiskusi, bersekutu, dan mempersiapkan diri melayani.","A dedicated space for young adults to connect, discuss, and prepare to serve.","/ministry-pemuda.webp"],
    ["Remaja","Teen Fellowship","Sesuai jadwal pelayanan","Persekutuan remaja yang hangat, relevan, dan mendukung pertumbuhan iman.","A welcoming, relevant fellowship that supports teens as they grow in faith.","/ministry-remaja.webp"],
    ["Kaum Ibu","Women’s Fellowship","Sabtu · 17.00 WIB","Persekutuan dalam firman, doa, keluarga, dan kepedulian sosial.","Fellowship through the Word, prayer, family life, and social care.","/ministry-kaum-ibu.webp"],
    ["Kaum Bapak","Men’s Fellowship","Sabtu · 20.00 WIB","Penguatan iman dan peran sebagai teladan di keluarga serta jemaat.","Strengthening faith and leadership in family and church life.","/ministry-kaum-bapak.webp"],
    ["Lansia","Senior Fellowship","Selasa · 09.30 WIB","Kebersamaan, doa, kesehatan, dan pendampingan bagi jemaat lansia.","Community, prayer, wellness, and care for senior members.","/ministry-lansia.webp"],
  ];
  return <Frame><PageHero eyebrowId="Bertumbuh & melayani" eyebrowEn="Grow & serve" titleId="Bidang Pelayanan" titleEn="Our Ministries" descriptionId="Setiap generasi memiliki ruang untuk bertumbuh, membangun relasi, dan mengambil bagian." descriptionEn="Every generation has a place to grow, build relationships, and take part."/><section className="content-section ministry-directory">{items.map((item,i)=><article key={item[0]}><img src={item[5]} alt={t(`Kegiatan ${item[0]} POUK Graha Prima`, `${item[1]} at POUK Graha Prima`)} loading="lazy"/><div className="ministry-card-number">{String(i+1).padStart(2,"0")}</div><small>{item[2]}</small><h2>{t(item[0],item[1])}</h2><p>{t(item[3],item[4])}</p><a href="mailto:gerejapoukgrahaprima@gmail.com?subject=Informasi%20Pelayanan">{t("Tanya jadwal pelayanan", "Ask about the schedule")} →</a></article>)}</section></Frame>;
}

type GalleryPhoto = { id: string; name: string; modified: string; thumbnailUrl: string; fullUrl: string; viewUrl: string };
type GallerySection = { key: string; titleId: string; titleEn: string; folderUrl: string; photos: GalleryPhoto[] };

const GALLERY_DATA_VERSION = "expanded-gallery-2026-08-12-v1";

const galleryFolders: GallerySection[] = [
  { key: "ibadah-minggu", titleId: "Ibadah Minggu", titleEn: "Sunday Worship", folderUrl: "https://drive.google.com/drive/folders/1O-hYedcI6DKzHQrAbzSNQZ0cnRRo74Xr?usp=sharing", photos: [] },
  { key: "sekolah-minggu", titleId: "Sekolah Minggu", titleEn: "Sunday School", folderUrl: "https://drive.google.com/drive/folders/13BHATO9jay7bWSndDQEXDwbLxZv1E-AT?usp=sharing", photos: [] },
  { key: "ibadah-keluarga", titleId: "Ibadah Keluarga", titleEn: "Family Worship", folderUrl: "https://drive.google.com/drive/folders/1mmwxwlVF9AbejvA5s2EERfzWXlw-yknD?usp=sharing", photos: [] },
  { key: "persekutuan-pemuda", titleId: "Persekutuan Pemuda", titleEn: "Youth Fellowship", folderUrl: "https://drive.google.com/drive/folders/1pJaitInyvgJTrqntTqlcqCscjb-EUHGe?usp=sharing", photos: [] },
  { key: "kaum-ibu", titleId: "Kaum Ibu", titleEn: "Women’s Fellowship", folderUrl: "https://drive.google.com/drive/folders/1WUo-acEfi6UM_8M5RgiuVRQ6uj20gO7d?usp=sharing", photos: [] },
  { key: "kaum-bapak", titleId: "Kaum Bapak", titleEn: "Men’s Fellowship", folderUrl: "https://drive.google.com/drive/folders/1NSEknVesNl1AJ1AWN6avkhs0s_MZfQg6?usp=sharing", photos: [] },
  { key: "lansia", titleId: "Lansia", titleEn: "Senior Fellowship", folderUrl: "https://drive.google.com/drive/folders/1I2VrQx6Muv8cDYvyMCA6zptA4LqZ6gbW?usp=sharing", photos: [] },
  { key: "pelayanan-musik", titleId: "Pelayanan Musik", titleEn: "Music Ministry", folderUrl: "https://drive.google.com/drive/folders/1Z54a_NyFIwlVPBAmvKhGS7RVTUL-2Xlk?usp=sharing", photos: [] },
  { key: "ibadah-padang-pemuda-remaja", titleId: "Ibadah Padang Pemuda & Remaja", titleEn: "Youth & Teen Outdoor Worship", folderUrl: "https://drive.google.com/drive/folders/1PCRPcG6DGX1ibb7ZBbDKrewKH3JCCsj-?usp=sharing", photos: [] },
  { key: "retret-pemuda-remaja", titleId: "Retret Pemuda & Remaja", titleEn: "Youth & Teen Retreat", folderUrl: "https://drive.google.com/drive/folders/1YuTEzbr-Ox5SZ0yEAOxba4sdhBYx-h3M?usp=sharing", photos: [] },
  { key: "kkr", titleId: "KKR", titleEn: "Revival Service", folderUrl: "https://drive.google.com/drive/folders/1TylSRoACIA5LdBmCCFUg3Kl-o-kBL6kk?usp=sharing", photos: [] },
  { key: "sidi", titleId: "SIDI", titleEn: "Confirmation", folderUrl: "https://drive.google.com/drive/folders/1zpDVFzUako4yBLUCNBm3GhqEhb4EUOF9?usp=sharing", photos: [] },
  { key: "baptis", titleId: "Baptis", titleEn: "Baptism", folderUrl: "https://drive.google.com/drive/folders/1LDlWPK_TjENLatbqnwMcXz1lzqs0uob6?usp=sharing", photos: [] },
  { key: "paskah", titleId: "Paskah", titleEn: "Easter", folderUrl: "https://drive.google.com/drive/folders/1DUhP1Nm5NrSTgddW1i49fpzckw0_IDST?usp=sharing", photos: [] },
  { key: "paskah-sekolah-minggu", titleId: "Paskah Sekolah Minggu", titleEn: "Sunday School Easter", folderUrl: "https://drive.google.com/drive/folders/1bQ-ram2vQYrgQclXa_VMjan18uwcl9Li?usp=sharing", photos: [] },
  { key: "natal-jemaat", titleId: "Natal Jemaat", titleEn: "Congregational Christmas", folderUrl: "https://drive.google.com/drive/folders/1ggCkJWlz_-WVhxpmu6T7Jwomvb5Fjuku?usp=sharing", photos: [] },
  { key: "natal-umum", titleId: "Natal Umum", titleEn: "Christmas Celebration", folderUrl: "https://drive.google.com/drive/folders/1l-sbr8xkZU0mKJOgYbWuM-Vz2y6dwPwT?usp=sharing", photos: [] },
  { key: "malam-natal", titleId: "Malam Natal", titleEn: "Christmas Eve", folderUrl: "https://drive.google.com/drive/folders/1NIwDbZ_xzaZeP5W_xwtqLPLthd5tTV5c?usp=sharing", photos: [] },
  { key: "natal-pemuda-remaja", titleId: "Natal Pemuda & Remaja", titleEn: "Youth & Teen Christmas", folderUrl: "https://drive.google.com/drive/folders/1XsxGP9xNnlJJVYuHdBi5B_1VPJkn48S5?usp=sharing", photos: [] },
  { key: "natal-sekolah-minggu", titleId: "Natal Anak Sekolah Minggu", titleEn: "Sunday School Christmas", folderUrl: "https://drive.google.com/drive/folders/1uVNiHr0yeaNSAj95UdBHnte_QVe6aVL2?usp=sharing", photos: [] },
];

export function GalleryView() {
  const { t } = useLanguage();
  const [sections, setSections] = useState<GallerySection[]>(galleryFolders);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<{ section: number; photo: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/gallery?v=${GALLERY_DATA_VERSION}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (!cancelled && Array.isArray(data.sections)) {
          const loadedByKey = new Map<string, GallerySection>(
            data.sections.map((section: GallerySection) => [section.key, section]),
          );
          setSections(galleryFolders.map((section) => ({
            ...section,
            photos: Array.isArray(loadedByKey.get(section.key)?.photos)
              ? loadedByKey.get(section.key)!.photos
              : [],
          })));
        }
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
      <PageHero eyebrowId="Dokumentasi kegiatan" eyebrowEn="Activity highlights" titleId="Galeri Jemaat" titleEn="Church Gallery" descriptionId="Lihat momen terbaru dari ibadah, persekutuan, dan pelayanan POUK Graha Prima." descriptionEn="See the latest moments from worship, fellowship, and ministry at POUK Graha Prima."/>
      <section className="content-section gallery-stream">
        {sections.map((section, sectionIndex) => (
          <section className="gallery-group" id={section.key} key={section.key}>
            <header className="gallery-group-header">
              <div className="gallery-group-title"><span>{String(sectionIndex + 1).padStart(2, "0")}</span><h2>{t(section.titleId, section.titleEn)}</h2></div>
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
            {!loading && !section.photos.length && <div className="gallery-empty"><p>{t("Belum ada foto yang dapat ditampilkan.", "No photos are available yet.")}</p><a href={section.folderUrl} target="_blank" rel="noreferrer">{t("Lihat dokumentasi lengkap", "View complete highlights")} →</a></div>}
          </section>
        ))}
      </section>
      {activePhoto && activeSection && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={t("Pratinjau foto", "Photo preview")} onClick={() => setActive(null)}>
          <button className="gallery-close" aria-label={t("Tutup", "Close")} onClick={() => setActive(null)}>×</button>
          <button className="gallery-nav gallery-prev" aria-label={t("Foto sebelumnya", "Previous photo")} onClick={(event) => { event.stopPropagation(); movePhoto(-1); }}>‹</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={activePhoto.fullUrl} alt={`${t(activeSection.titleId, activeSection.titleEn)} — ${activePhoto.name}`} onError={(event) => { event.currentTarget.src = "/gereja-pouk-graha-prima.png"; }}/>
            <figcaption><span>{t(activeSection.titleId, activeSection.titleEn)}</span><a href={activePhoto.viewUrl} target="_blank" rel="noreferrer">{t("Lihat foto ukuran penuh", "View full-size photo")} ↗</a></figcaption>
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
