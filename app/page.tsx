"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./components/language-provider";
import { SiteFooter, SiteHeader } from "./components/site-chrome";

type IconName =
  | "arrow"
  | "book"
  | "calendar"
  | "clock"
  | "facebook"
  | "heart"
  | "instagram"
  | "mail"
  | "map"
  | "menu"
  | "phone"
  | "play"
  | "search"
  | "users"
  | "x";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></>,
    calendar: <><path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    facebook: <path d="M15 3h-2.2A3.8 3.8 0 0 0 9 6.8V10H6v4h3v7h4v-7h3l.8-4H13V7.2c0-.7.3-1.2 1.2-1.2H16V3Z"/>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    map: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>,
    play: <path d="m8 5 11 7-11 7V5Z"/>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    x: <><path d="m6 6 12 12M18 6 6 18"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@POUKGRAHAPRIMA";
const YOUTUBE_UPLOADS_PLAYLIST = "UU1Ti9veniOr4Ajm22mLQmyA";
const GOOGLE_CALENDAR_EMBED_BASE =
  "https://calendar.google.com/calendar/embed?src=gppoukgrahaprima%40gmail.com&ctz=Asia%2FJakarta&mode=AGENDA&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&bgcolor=%23F3EDDF";

// Ganti dengan link folder resmi ketika sudah tersedia.
const DRIVE_FOLDERS = {
  warta: "https://www.drive.google.com/",
  tataIbadah: "https://www.drive.google.com/",
};

const ministries = [
  { no: "01", idTitle: "Sekolah Minggu", enTitle: "Sunday School", idDesc: "Ruang anak mengenal kasih Tuhan dan bertumbuh bersama.", enDesc: "A place for children to discover God’s love and grow together.", idSchedule: "Minggu · 07.00 WIB", enSchedule: "Sunday · 7:00 AM" },
  { no: "02", idTitle: "Pemuda & Remaja", enTitle: "Youth Ministry", idDesc: "Persekutuan generasi muda yang hangat, aktif, dan relevan.", enDesc: "A welcoming, active, and relevant fellowship for young people.", idSchedule: "Sabtu · 19.00 WIB", enSchedule: "Saturday · 7:00 PM" },
  { no: "03", idTitle: "Kaum Ibu", enTitle: "Women’s Fellowship", idDesc: "Bertumbuh dalam firman, doa, dan kepedulian bersama.", enDesc: "Growing together through the Word, prayer, and compassionate care.", idSchedule: "Sabtu · 17.00 WIB", enSchedule: "Saturday · 5:00 PM" },
  { no: "04", idTitle: "Kaum Bapak", enTitle: "Men’s Fellowship", idDesc: "Persekutuan dan penguatan peran dalam keluarga serta jemaat.", enDesc: "Fellowship that strengthens our role in family and church life.", idSchedule: "Sabtu · 20.00 WIB", enSchedule: "Saturday · 8:00 PM" },
];

export default function Home() {
  const [recentVideoIds, setRecentVideoIds] = useState<string[]>([]);
  const { language, t } = useLanguage();
  const calendarEmbedUrl = `${GOOGLE_CALENDAR_EMBED_BASE}&hl=${language === "id" ? "id" : "en"}`;

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/youtube", { signal: controller.signal })
      .then((response) => response.json())
      .then((data: { videoIds?: string[] }) => {
        if (Array.isArray(data.videoIds)) setRecentVideoIds(data.videoIds.slice(0, 4));
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return (
    <>
      <SiteHeader />
      <main id="top">

      <section className="hero" id="beranda">
        <img src="/gereja-pouk-graha-prima.png" alt={t("Fasad Gereja POUK Graha Prima di Tambun Selatan, Bekasi", "POUK Graha Prima church in South Tambun, Bekasi")} width="900" height="900" fetchPriority="high" />
        <div className="hero-wash"></div>
        <div className="hero-content">
          <p className="eyebrow light"><span></span> {t("Persekutuan Oikoumene Umat Kristen", "Ecumenical Christian Fellowship")}</p>
          <h1>{t("Selamat datang", "Welcome")}<br/>{t("di", "to")} <em>POUK</em><br/>Graha Prima.</h1>
          <p className="hero-copy">{t("Bertumbuh dalam iman, hidup dalam persekutuan, dan menjadi berkat bagi sesama.", "Growing in faith, living in fellowship, and becoming a blessing to others.")}</p>
          <div className="hero-actions">
            <a className="button gold" href="#jadwal">{t("Lihat Jadwal Ibadah", "View Worship Schedule")} <Icon name="arrow" /></a>
            <a className="text-link light-link" href={DRIVE_FOLDERS.warta} target="_blank" rel="noreferrer">{t("Warta Jemaat", "Church Bulletin")} <Icon name="arrow" size={18} /></a>
          </div>
        </div>
        <div className="hero-aside">
          <span className="hero-aside-label">{t("Minggu", "Sunday")}</span>
          <div><strong>07.00</strong><small>{t("Ibadah Raya I", "First Service")}</small></div>
          <div><strong>10.00</strong><small>{t("Ibadah Raya II", "Second Service")}</small></div>
          <a href="#kontak"><Icon name="map" size={18}/> Tambun Selatan, Bekasi</a>
        </div>
        <span className="hero-scroll">{t("Gulir untuk menjelajah", "Scroll to explore")} <i></i></span>
      </section>

      <section className="quick-access" aria-label={t("Akses cepat", "Quick access")}>
        <a href="#jadwal" className="quick-card">
          <span className="quick-icon"><Icon name="clock" /></span>
          <span><small>{t("Setiap Minggu", "Every Sunday")}</small><strong>{t("Jadwal Ibadah", "Worship Schedule")}</strong></span>
          <Icon name="arrow" />
        </a>
        <a className="quick-card" href={DRIVE_FOLDERS.warta} target="_blank" rel="noreferrer">
          <span className="quick-icon"><Icon name="book" /></span>
          <span><small>{t("Informasi Jemaat", "Church Information")}</small><strong>{t("Warta Jemaat", "Church Bulletin")}</strong></span>
          <Icon name="arrow" />
        </a>
        <a className="quick-card" href={DRIVE_FOLDERS.tataIbadah} target="_blank" rel="noreferrer">
          <span className="quick-icon"><Icon name="calendar" /></span>
          <span><small>{t("Panduan Mingguan", "Weekly Guide")}</small><strong>{t("Tata Ibadah", "Order of Worship")}</strong></span>
          <Icon name="arrow" />
        </a>
        <a className="quick-card" href="#youtube">
          <span className="quick-icon"><Icon name="play" /></span>
          <span><small>{t("Upload Terbaru", "Latest Uploads")}</small><strong>{t("Video YouTube", "YouTube Videos")}</strong></span>
          <Icon name="arrow" />
        </a>
      </section>

      <section className="welcome section" id="tentang">
        <div className="welcome-art" aria-hidden="true">
          <div className="photo-window"><img src="/gereja-pouk-graha-prima.png" alt="" width="900" height="900" loading="lazy" /></div>
          <div className="welcome-note"><span>POUK Graha Prima</span><strong>{t("Bersama dalam", "Together in")}<br/>{t("satu persekutuan", "one fellowship")}</strong></div>
        </div>
        <div className="welcome-copy">
          <p className="eyebrow"><span></span> Welcome home</p>
          <h2>{t("Tempat untuk datang,", "A place to belong,")}<br/><em>{t("bertumbuh,", "grow,")}</em> {t("dan melayani.", "and serve.")}</h2>
          <p>{t("Kami menyambut Saudara untuk bertumbuh bersama dalam iman dan persekutuan di POUK Graha Prima—rumah rohani yang terbuka bagi setiap generasi.", "We welcome you to grow in faith and fellowship at POUK Graha Prima—a spiritual home open to every generation.")}</p>
          <div className="welcome-actions">
            <a className="button navy" href="/tentang">{t("Kenali POUK Graha Prima", "Discover POUK Graha Prima")} <Icon name="arrow" /></a>
            <a className="text-link" href="#kontak">{t("Lihat lokasi gereja", "View church location")} <Icon name="arrow" size={18} /></a>
          </div>
        </div>
      </section>

      <section className="schedule section" id="jadwal">
        <div className="section-heading light-heading">
          <div><p className="eyebrow light"><span></span> {t("Beribadah bersama", "Worship together")}</p><h2>{t("Jadwal", "Worship")} <em>{t("Ibadah", "Schedule")}</em></h2></div>
          <p>{t("Tiga ruang ibadah setiap Minggu untuk anak, keluarga, dan seluruh jemaat.", "Three Sunday worship gatherings for children, families, and the whole church.")}</p>
        </div>
        <div className="service-grid">
          <article className="service-card featured">
            <div className="service-top"><span>{t("Ibadah Raya I", "First Service")}</span><i>Onsite</i></div>
            <strong className="service-time">07<sup>.00</sup></strong>
            <p><Icon name="calendar" size={18}/> {t("Setiap hari Minggu", "Every Sunday")}</p>
            <p><Icon name="map" size={18}/> Gedung Gereja POUK Graha Prima</p>
            <a href="#kontak">{t("Petunjuk arah", "Directions")} <Icon name="arrow" size={18}/></a>
          </article>
          <article className="service-card">
            <div className="service-top"><span>{t("Sekolah Minggu", "Sunday School")}</span><i>Onsite</i></div>
            <strong className="service-time">07<sup>.00</sup></strong>
            <p><Icon name="users" size={18}/> {t("Ibadah dan pembinaan anak", "Children’s worship and discipleship")}</p>
            <p><Icon name="map" size={18}/> Gedung Gereja POUK Graha Prima</p>
            <a href="/pelayanan">{t("Lihat pelayanan", "View ministry")} <Icon name="arrow" size={18}/></a>
          </article>
          <article className="service-card">
            <div className="service-top"><span>{t("Ibadah Raya II", "Second Service")}</span><i>Onsite</i></div>
            <strong className="service-time">10<sup>.00</sup></strong>
            <p><Icon name="calendar" size={18}/> {t("Setiap hari Minggu", "Every Sunday")}</p>
            <p><Icon name="map" size={18}/> Gedung Gereja POUK Graha Prima</p>
            <a href="#kontak">{t("Petunjuk arah", "Directions")} <Icon name="arrow" size={18}/></a>
          </article>
        </div>
        <p className="schedule-note">{t("Waktu dapat berubah pada hari raya atau kegiatan khusus. Cek Warta Jemaat atau hubungi sekretariat untuk konfirmasi.", "Times may change on holidays or for special events. Check the Church Bulletin or contact the church office to confirm.")}</p>
      </section>

      <section className="warta section" id="warta">
        <div className="section-heading">
          <div><p className="eyebrow"><span></span> {t("Tetap terhubung", "Stay connected")}</p><h2>{t("Warta &", "Bulletin &")} <em>{t("Informasi", "Information")}</em></h2></div>
          <p>{t("Warta dan Tata Ibadah disimpan di Google Drive agar mudah dibaca atau diunduh tanpa login website.", "The Church Bulletin and Order of Worship are stored on Google Drive for easy access and download without a website login.")}</p>
        </div>
        <div className="warta-grid">
          <article className="bulletin-card primary-bulletin">
            <span className="bulletin-kicker">{t("Warta Jemaat", "Church Bulletin")}</span>
            <div className="bulletin-art"><span>POUK</span><strong>{t("WARTA", "CHURCH")}<br/>{t("JEMAAT", "BULLETIN")}</strong><i>{t("Informasi pelayanan & kehidupan jemaat", "Ministry news & church life")}</i></div>
            <div className="bulletin-bottom"><p><strong>{t("Folder Warta Jemaat", "Church Bulletin Folder")}</strong><small>{t("Buka kumpulan file di Google Drive", "Open the file collection on Google Drive")}</small></p><a href={DRIVE_FOLDERS.warta} target="_blank" rel="noreferrer" aria-label={t("Buka folder Warta Jemaat di Google Drive", "Open the Church Bulletin folder on Google Drive")}><Icon name="arrow" /></a></div>
          </article>
          <article className="bulletin-card order-card">
            <span className="bulletin-kicker">{t("Tata Ibadah", "Order of Worship")}</span>
            <div className="order-icon"><Icon name="book" size={36}/></div>
            <h3>{t("Folder Tata Ibadah", "Order of Worship Folder")}</h3>
            <p>{t("Kumpulan liturgi, panduan ibadah, dan file PDF mingguan akan disusun berdasarkan tanggal di Google Drive.", "Liturgies, worship guides, and weekly PDF files will be organized by date on Google Drive.")}</p>
            <a className="text-link" href={DRIVE_FOLDERS.tataIbadah} target="_blank" rel="noreferrer">{t("Buka Google Drive", "Open Google Drive")} <Icon name="arrow" size={18}/></a>
          </article>
        </div>
      </section>

      <section className="agenda section" id="agenda">
        <div className="agenda-heading">
          <div><p className="eyebrow"><span></span> {t("Kalender pelayanan", "Ministry calendar")}</p><h2>{t("Hidup dalam", "Life in")}<br/><em>{t("persekutuan.", "fellowship.")}</em></h2></div>
          <p>{t("Agenda mendatang tersinkron otomatis dari Google Calendar resmi POUK Graha Prima.", "Upcoming events are automatically synced from the official POUK Graha Prima Google Calendar.")}</p>
        </div>
        <div className="calendar-embed-shell calendar-embed-home">
          <iframe
            src={calendarEmbedUrl}
            title={t("Agenda POUK Graha Prima", "POUK Graha Prima Calendar")}
            loading="lazy"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
        <div className="agenda-sync-note"><span><i></i>{t("Tersinkron dari Google Calendar", "Synced from Google Calendar")}</span><a href="/agenda">{t("Lihat semua agenda", "View all events")} <Icon name="arrow" size={17}/></a></div>
      </section>

      <section className="ministries section" id="pelayanan">
        <div className="section-heading">
          <div><p className="eyebrow"><span></span> {t("Bertumbuh & melayani", "Grow & serve")}</p><h2>{t("Ada ruang untuk", "A place for")}<br/><em>{t("setiap generasi.", "every generation.")}</em></h2></div>
          <p>{t("Temukan komunitas untuk bertumbuh, membangun relasi, dan mengambil bagian dalam pelayanan.", "Find a community where you can grow, build relationships, and take part in ministry.")}</p>
        </div>
        <div className="ministry-grid">
          {ministries.map((item) => (
            <article className="ministry-card" key={item.idTitle}>
              <div><span>{item.no}</span><Icon name="users" size={25}/></div>
              <h3>{language === "id" ? item.idTitle : item.enTitle}</h3><p>{language === "id" ? item.idDesc : item.enDesc}</p><small>{language === "id" ? item.idSchedule : item.enSchedule}</small>
            </article>
          ))}
        </div>
        <div className="ministry-more"><p>{t("Pelayanan lainnya mencakup Majelis, Lansia, Rumah Tangga, Musik, Multimedia, serta Sosial & Diakonia.", "Other ministries include the Church Council, Seniors, Home Fellowship, Music, Multimedia, and Social Care & Diaconia.")}</p><a href="/pelayanan">{t("Lihat semua pelayanan", "View all ministries")} <Icon name="arrow" size={18}/></a></div>
      </section>

      <section className="resources section" id="media-informasi">
        <div className="section-heading">
          <div><p className="eyebrow"><span></span> {t("Kehidupan jemaat", "Church life")}</p><h2>{t("Iman yang hidup", "Faith lived")}<br/><em>{t("setiap hari.", "every day.")}</em></h2></div>
          <p>{t("Dokumentasi kegiatan dan informasi dukungan pelayanan ditempatkan secara transparan.", "Activity highlights and ministry support information are shared transparently.")}</p>
        </div>
        <div className="resource-grid">
          <a className="resource-card gallery-card" href="/galeri">
            <img src="/gereja-pouk-graha-prima.png" alt="Gereja POUK Graha Prima" width="900" height="900" loading="lazy"/>
            <div><span className="resource-label">{t("Kehidupan Jemaat", "Church Life")}</span><h3>{t("Dokumentasi kegiatan dan persekutuan.", "Church activities and fellowship highlights.")}</h3><p>{t("Buka galeri foto dengan tampilan masonry dan lightbox.", "Open the photo gallery with masonry layout and lightbox viewing.")}</p><strong>{t("Buka Galeri", "Open Gallery")} <Icon name="arrow" size={18}/></strong></div>
          </a>
          <article className="resource-card giving-card">
            <span className="resource-label">{t("Persembahan", "Giving")}</span>
            <div className="resource-symbol"><Icon name="heart" size={31}/></div>
            <h3>{t("Persembahan & dukungan pelayanan.", "Giving & ministry support.")}</h3>
            <p>{t("Lihat contoh halaman rekening dan QRIS. Gunakan hanya informasi yang telah disahkan Majelis POUK Graha Prima.", "View the sample bank and QRIS page. Use only information approved by the POUK Graha Prima Church Council.")}</p>
            <a className="text-link light-link" href="/persembahan">{t("Lihat informasi", "View information")} <Icon name="arrow" size={18}/></a>
          </article>
        </div>
      </section>

      <section className="verse">
        <div className="verse-mark">“</div>
        <blockquote>{t("Hendaklah kamu sehati sepikir, dalam satu kasih, satu jiwa, satu tujuan.", "Be of one mind, united in love, one in spirit and purpose.")}</blockquote>
        <p>{t("Filipi 2:2", "Philippians 2:2")}</p>
        <span>{t("Ayat persekutuan", "Fellowship verse")}</span>
      </section>

      <section className="media section" id="youtube">
        <div className="media-copy">
          <p className="eyebrow light"><span></span> {t("YouTube resmi", "Official YouTube")}</p>
          <h2>{t("Video terbaru", "Latest videos")}<br/><em>POUK Graha Prima.</em></h2>
          <p>{t("Empat pemutar ini terhubung langsung ke daftar upload channel resmi. Video terbaru akan tampil otomatis tanpa perlu diperbarui manual di website.", "These four players are connected directly to the official channel upload list. The latest videos appear automatically without manual website updates.")}</p>
          <a className="button gold" href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer">{t("Buka Channel YouTube", "Open YouTube Channel")} <Icon name="arrow" /></a>
        </div>
        <div className="youtube-showcase">
          <div className="youtube-video-grid">
            {[0, 1, 2, 3].map((index) => (
              <div className="youtube-video-card" key={index}>
                <iframe
                  src={recentVideoIds[index]
                    ? `https://www.youtube-nocookie.com/embed/${recentVideoIds[index]}?rel=0`
                    : `https://www.youtube-nocookie.com/embed/videoseries?list=${YOUTUBE_UPLOADS_PLAYLIST}&index=${index}&rel=0`}
                  title={`${t("Video terbaru", "Latest video")} ${index + 1} — POUK Graha Prima`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
          <p className="youtube-auto-note"><i></i> {t("Otomatis menampilkan empat upload terbaru", "Automatically showing the four latest uploads")}</p>
        </div>
      </section>

      <section className="contact section" id="kontak">
        <div className="section-heading">
          <div><p className="eyebrow"><span></span> {t("Temukan kami", "Find us")}</p><h2>{t("Mari berjumpa", "Meet us this")}<br/><em>{t("hari Minggu.", "Sunday.")}</em></h2></div>
          <p>Graha Prima Baru, Blok M, RT 08/RW 25, Mangunjaya, Tambun Selatan, Bekasi 17517.</p>
        </div>
        <div className="contact-grid">
          <div className="map-card">
            <iframe title="Lokasi Gereja POUK Graha Prima" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Gereja+POUK+Graha+Prima+Tambun+Bekasi&output=embed"></iframe>
            <a href="https://maps.app.goo.gl/7v6DrThhpUzaq8zY6" target="_blank" rel="noreferrer">{t("Buka di Google Maps", "Open in Google Maps")} <Icon name="arrow" size={18}/></a>
          </div>
          <div className="contact-panel">
            <div className="contact-detail">
              <span><Icon name="map" /></span><p><small>{t("Alamat", "Address")}</small><strong>Graha Prima Baru, Blok M<br/>Tambun Selatan, Bekasi 17517</strong></p>
            </div>
            <div className="contact-detail">
              <span><Icon name="phone" /></span><p><small>{t("Pendeta Jemaat", "Church Pastor")}</small><a href="tel:+6281280639227">0812-8063-9227</a></p>
            </div>
            <div className="contact-detail compact-detail">
              <span><Icon name="users" /></span><p><small>{t("Ketua Majelis", "Council Chair")}</small><a href="tel:+6281284143529">0812-8414-3529</a></p>
            </div>
            <div className="contact-detail compact-detail">
              <span><Icon name="phone" /></span><p><small>{t("Sekretaris", "Secretary")}</small><a href="tel:+628161928068">0816-1928-068</a></p>
            </div>
            <div className="contact-detail">
              <span><Icon name="mail" /></span><p><small>Email</small><a href="mailto:gerejapoukgrahaprima@gmail.com">gerejapoukgrahaprima@gmail.com</a></p>
            </div>
            <div className="contact-links">
              <a href="https://www.instagram.com/parepgp/" target="_blank" rel="noreferrer"><Icon name="instagram"/> Instagram PaRe</a>
              <a href="https://www.facebook.com/318785191552590" target="_blank" rel="noreferrer"><Icon name="facebook"/> Facebook</a>
            </div>
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </>
  );
}
