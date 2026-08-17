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

type CouncilPerson = {
  roleId: string;
  roleEn: string;
  name: string;
  imageAliases?: string[];
};

type CouncilDriveImage = {
  folderKey: string;
  id: string;
  name: string;
  imageUrl: string;
};

function normaliseCouncilLabel(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\.[a-z0-9]{2,5}$/i, "")
    .toLowerCase()
    .replace(/\b(?:bpk|bapak|ibu|pnt|pdt|m\s*th|s\s*th)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function resolveCouncilImage(person: CouncilPerson, folderKey: string, images: CouncilDriveImage[]) {
  const aliases = [...(person.imageAliases ?? []), person.name, person.roleId]
    .map(normaliseCouncilLabel)
    .filter(Boolean);

  let best: { score: number; url: string } | null = null;
  for (const image of images) {
    if (image.folderKey !== folderKey) continue;
    const fileName = normaliseCouncilLabel(image.name);
    let score = 0;

    aliases.forEach((alias, index) => {
      if (fileName === alias) score = Math.max(score, 300 - index);
      else if (alias.length >= 5 && (fileName.includes(alias) || alias.includes(fileName))) {
        score = Math.max(score, 180 - index - Math.abs(fileName.length - alias.length));
      }
    });

    if (score > 0 && (!best || score > best.score)) best = { score, url: image.imageUrl };
  }

  return best?.url ?? null;
}

function CouncilPersonCard({ person, folderKey, driveImages, size = "standard" }: { person: CouncilPerson; folderKey: string; driveImages: CouncilDriveImage[]; size?: "hero" | "standard" | "compact" }) {
  const { t } = useLanguage();
  const source = resolveCouncilImage(person, folderKey, driveImages);
  return (
    <article className={`leadership-card leadership-card-${size}`}>
      {source && <img src={source} alt={t(`Foto ${person.name}, ${person.roleId}`, `${person.name}, ${person.roleEn}`)} loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }}/>} 
      <p><small>{t(person.roleId, person.roleEn)}</small><strong>{person.name}</strong></p>
    </article>
  );
}

export function AboutView() {
  const { t } = useLanguage();
  const [driveImages, setDriveImages] = useState<CouncilDriveImage[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/council?v=council-drive-2026-08-15-v1", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (!cancelled && Array.isArray(data.images)) setDriveImages(data.images);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  const pastor: CouncilPerson = { roleId: "Pendeta", roleEn: "Pastor", name: "Pdt. Denny Arlina Purba, M.Th", imageAliases: ["Pendeta"] };
  const chair: CouncilPerson = { roleId: "Ketua Umum", roleEn: "General Chair", name: "Pnt. Johannes Siburian", imageAliases: ["Ketua Umum", "Ketua"] };
  const executives: CouncilPerson[] = [
    { roleId: "Sekretaris Umum", roleEn: "General Secretary", name: "Ibu Lydia Risda Jelita Samosir" },
    { roleId: "Wakil Sekretaris Umum", roleEn: "Deputy General Secretary", name: "Pnt. Godlif Maruli Tua Nainggolan" },
    { roleId: "Bendahara Umum", roleEn: "General Treasurer", name: "Bpk. Parnabung Pandiangan" },
    { roleId: "Wakil Bendahara Umum", roleEn: "Deputy General Treasurer", name: "Ibu Dortiani Pardosi" },
  ];
  const departments: { titleId: string; titleEn: string; folderKey: string; leader: CouncilPerson; members: CouncilPerson[] }[] = [
    {
      titleId: "Bidang Koinonia", titleEn: "Koinonia Ministry", folderKey: "koinonia",
      leader: { roleId: "Ketua I Bidang Koinonia", roleEn: "Head I of Koinonia", name: "Bpk. Mangasa Tua Silaban", imageAliases: ["Ketua Bidang Koinonia"] },
      members: [
        { roleId: "Komisi Sekolah Minggu", roleEn: "Sunday School Commission", name: "Ibu Lisda Gultom" },
        { roleId: "Komisi Remaja", roleEn: "Teen Commission", name: "Ibu Aprida Kupa" },
        { roleId: "Komisi Pemuda", roleEn: "Youth Commission", name: "Bpk. Bayu Kristiadi" },
        { roleId: "Komisi Kaum Bapak", roleEn: "Men's Commission", name: "Bpk. Herland Hamonangan Saragih" },
        { roleId: "Komisi Kaum Ibu", roleEn: "Women's Commission", name: "Ibu Raminta Dolok Saribu" },
        { roleId: "Komisi Lansia", roleEn: "Senior Commission", name: "Bpk. Antony Simanjuntak" },
      ],
    },
    {
      titleId: "Bidang Marturia", titleEn: "Marturia Ministry", folderKey: "marturia",
      leader: { roleId: "Ketua II Bidang Marturia", roleEn: "Head II of Marturia", name: "Ibu Dorliana Silaban", imageAliases: ["Ketua Bidang Marturia"] },
      members: [
        { roleId: "Penginjilan", roleEn: "Evangelism", name: "Pnt. Hotmauli Rolia Sihombing" },
        { roleId: "Kesaksian", roleEn: "Witness", name: "Ibu Lenti Yuni Arta Panjaitan", imageAliases: ["Kesaksian 1", "Kesaksian I"] },
        { roleId: "Kesaksian", roleEn: "Witness", name: "Pnt. Monika Pasaribu", imageAliases: ["Kesaksian 2", "Kesaksian II"] },
      ],
    },
    {
      titleId: "Bidang Diakonia", titleEn: "Diakonia Ministry", folderKey: "diakonia",
      leader: { roleId: "Ketua III Bidang Diakonia", roleEn: "Head III of Diakonia", name: "Pnt. Magdalena Silalahi", imageAliases: ["Ketua Bidang Diakonia"] },
      members: [
        { roleId: "Bendahara", roleEn: "Treasurer", name: "Ibu Megawati Debataraja" },
        { roleId: "Anggota", roleEn: "Member", name: "Pnt. Untung Hutagaol", imageAliases: ["Anggota 1", "Anggota I"] },
        { roleId: "Anggota", roleEn: "Member", name: "Ibu Rosmery Sitompul", imageAliases: ["Anggota 2", "Anggota II"] },
        { roleId: "Anggota", roleEn: "Member", name: "Bpk. Nelson David Halomoan Panjaitan", imageAliases: ["Anggota 3", "Anggota III"] },
        { roleId: "Anggota", roleEn: "Member", name: "Bpk. Rimson Mangido Tua Pasaribu", imageAliases: ["Anggota 4", "Anggota IV"] },
      ],
    },
    {
      titleId: "Bidang Umum", titleEn: "General Affairs", folderKey: "general",
      leader: { roleId: "Ketua Bidang Umum", roleEn: "Head of General Affairs", name: "Bpk. Sahati Pane" },
      members: [
        { roleId: "SDM", roleEn: "Human Resources", name: "Pnt. Santi Manalu" },
        { roleId: "Sarana dan Prasarana", roleEn: "Facilities and Infrastructure", name: "Bpk. Eliantoni Saragih" },
        { roleId: "Multimedia", roleEn: "Multimedia", name: "Bpk. Sudung Marulak Situmorang" },
      ],
    },
  ];
  const regions: { titleId: string; titleEn: string; coordinator: CouncilPerson; sectors: [string, string][] }[] = [
    {
      titleId: "Majelis Wilayah I", titleEn: "Regional Council I",
      coordinator: { roleId: "Koordinator", roleEn: "Coordinator", name: "Bpk. Antony Simanjuntak", imageAliases: ["Koordinator Majelis Wilayah 1", "Koordinator Wilayah 1", "Majelis Wilayah I"] },
      sectors: [["Sektor I", "—"], ["Sektor II", "Pnt. Monika Pasaribu"], ["Sektor III", "Bpk. Eliantoni Saragih"], ["Sektor IV", "Ibu Rosmery Sitompul"], ["Sektor V", "Pnt. Magdalena Silalahi"], ["Sektor VI", "Ibu Dorliana Silaban"]],
    },
    {
      titleId: "Majelis Wilayah II", titleEn: "Regional Council II",
      coordinator: { roleId: "Koordinator", roleEn: "Coordinator", name: "Bpk. Nelson David Halomoan Panjaitan", imageAliases: ["Koordinator Majelis Wilayah 2", "Koordinator Wilayah 2", "Majelis Wilayah II"] },
      sectors: [["Sektor I", "Ibu Lenti Yuni Arta Panjaitan"], ["Sektor II", "Ibu Raminta Dolok Saribu"], ["Sektor III A", "Pnt. Hotmauli Rolia Sihombing"], ["Sektor III B", "Ibu Lisda Gultom"], ["Sektor IV", "—"], ["Sektor V", "Ibu Aprida Kupa"], ["Sektor VI", "Pnt. Untung Hutagaol"]],
    },
    {
      titleId: "Majelis Wilayah III", titleEn: "Regional Council III",
      coordinator: { roleId: "Koordinator", roleEn: "Coordinator", name: "Bpk. Bayu Kristiadi", imageAliases: ["Koordinator Majelis Wilayah 3", "Koordinator Wilayah 3", "Majelis Wilayah III"] },
      sectors: [["Sektor I Blok L", "Pnt. Santi Manalu"], ["Sektor I Blok M", "Bpk. Rimson Mangido Tua Pasaribu"], ["Sektor II", "Bpk. Herland Hamonangan Saragih"], ["Sektor III", "Ibu Megawati Debataraja"], ["Sektor IV", "Bpk. Sahati Pane"], ["Sektor V", "Bpk. Sudung Marulak Situmorang"]],
    },
  ];
  const oversight: { titleId: string; titleEn: string; folderKey: string; people: CouncilPerson[] }[] = [
    {
      titleId: "Majelis Pertimbangan (MP)", titleEn: "Advisory Council", folderKey: "mp",
      people: [
        { roleId: "Ketua", roleEn: "Chair", name: "Bpk. J.H. Pasaribu", imageAliases: ["Ketua Majelis Pertimbangan MP"] },
        { roleId: "Sekretaris", roleEn: "Secretary", name: "Ibu Marienty Pasaribu", imageAliases: ["Sekretaris Majelis Pertimbangan MP"] },
        { roleId: "Anggota", roleEn: "Member", name: "Bpk. Pdt. Heri Kuntoyo Marphin, S.Th", imageAliases: ["Anggota 1 Majelis Pertimbangan MP", "Anggota MP 1", "Anggota 1"] },
        { roleId: "Anggota", roleEn: "Member", name: "Bpk. E. Harahap", imageAliases: ["Anggota 2 Majelis Pertimbangan MP", "Anggota MP 2", "Anggota 2"] },
        { roleId: "Anggota", roleEn: "Member", name: "Bpk. T. Simamora", imageAliases: ["Anggota 3 Majelis Pertimbangan MP", "Anggota MP 3", "Anggota 3"] },
      ],
    },
    {
      titleId: "Badan Pemeriksa Perbendaharaan (BPP)", titleEn: "Treasury Audit Board", folderKey: "bpp",
      people: [
        { roleId: "Ketua", roleEn: "Chair", name: "Bpk. A. Naibaho", imageAliases: ["Ketua Badan Pemeriksa PerbendaharaanBPP", "Ketua Badan Pemeriksa Perbendaharaan BPP", "Ketua BPP"] },
        { roleId: "Sekretaris", roleEn: "Secretary", name: "Bpk. B.B. Situmorang", imageAliases: ["Sekretaris Badan Pemeriksa Perbendaharaan BPP", "Sekretaris BPP", "Sekretaris Majelis Pertimbangan MP"] },
        { roleId: "Anggota", roleEn: "Member", name: "Bpk. T.P. Simangunsong", imageAliases: ["Anggota Badan Pemeriksa Perbendaharaan BPP", "Anggota BPP", "Anggota 1"] },
      ],
    },
  ];
  return (
    <Frame>
      <PageHero eyebrowId="Mengenal kami" eyebrowEn="Get to know us" titleId="Tentang POUK Graha Prima" titleEn="About POUK Graha Prima" descriptionId="Rumah persekutuan lintas denominasi yang bertumbuh bersama dalam iman, kasih, dan pelayanan." descriptionEn="An ecumenical church family growing together in faith, love, and service." driveKey="about" imageAltId="Kebersamaan jemaat POUK Graha Prima" imageAltEn="POUK Graha Prima church community fellowship" />
      <section className="content-section intro-grid" id="sejarah">
        <div><p className="eyebrow"><span></span>{t("Sejarah", "History")}</p><h2>{t("Bertumbuh dari kerinduan untuk bersekutu.", "Growing from a shared desire for fellowship.")}</h2></div>
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
        <div className="section-heading"><div><p className="eyebrow"><span></span>{t("Pelayan jemaat", "Church leadership")}</p><h2>{t("Struktur", "Church")} <em>{t("Majelis", "Council")}</em></h2></div><p>{t("Susunan pelayanan ditampilkan berjenjang agar hubungan koordinasi setiap bidang dan wilayah mudah dipahami.", "The ministry structure is arranged by level so the coordination between boards, ministries, and regions is easy to follow.")}</p></div>
        <div className="org-chart">
          <div className="org-top-row" aria-label={t("Pimpinan utama", "Senior leadership")}>
            <CouncilPersonCard person={pastor} folderKey="leaders" driveImages={driveImages} size="hero"/>
            <CouncilPersonCard person={chair} folderKey="leaders" driveImages={driveImages} size="hero"/>
          </div>

          <div className="org-level-label"><span>{t("Pengurus Harian", "Executive Board")}</span></div>
          <div className="org-executives">
            {executives.map((person) => <CouncilPersonCard key={person.roleId} person={person} folderKey="executives" driveImages={driveImages}/>) }
          </div>

          <div className="org-level-label"><span>{t("Bidang Pelayanan", "Ministry Areas")}</span></div>
          <div className="org-departments">
            {departments.map((department) => (
              <section className="org-department" key={department.titleId}>
                <h3>{t(department.titleId, department.titleEn)}</h3>
                <CouncilPersonCard person={department.leader} folderKey={department.folderKey} driveImages={driveImages} size="standard"/>
                <div className="org-team">
                  {department.members.map((person) => <CouncilPersonCard key={`${person.roleId}-${person.name}`} person={person} folderKey={department.folderKey} driveImages={driveImages} size="compact"/>)}
                </div>
              </section>
            ))}
          </div>

          <div className="org-level-label org-level-label-wide"><span>{t("Majelis Wilayah", "Regional Councils")}</span></div>
          <div className="regional-grid">
            {regions.map((region) => (
              <section className="regional-panel" key={region.titleId}>
                <h3>{t(region.titleId, region.titleEn)}</h3>
                <CouncilPersonCard person={region.coordinator} folderKey="regions" driveImages={driveImages} size="compact"/>
                <div className="sector-list">
                  {region.sectors.map(([sector, name]) => <p key={sector}><small>{sector}</small><strong>{name}</strong></p>)}
                </div>
              </section>
            ))}
          </div>

          <div className="oversight-grid">
            {oversight.map((group) => (
              <section className="oversight-panel" key={group.titleId}>
                <h3>{t(group.titleId, group.titleEn)}</h3>
                <div className="oversight-people">
                  {group.people.map((person) => <CouncilPersonCard key={`${person.roleId}-${person.name}`} person={person} folderKey={group.folderKey} driveImages={driveImages} size="compact"/>)}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </Frame>
  );
}

export function AgendaView() {
  const { language, t } = useLanguage();
  const calendarEmbedUrl = `${GOOGLE_CALENDAR_EMBED_BASE}&hl=${language === "id" ? "id" : "en"}`;
  return (
    <Frame>
      <PageHero eyebrowId="Kalender pelayanan" eyebrowEn="Ministry calendar" titleId="Agenda & Event Gereja" titleEn="Church Calendar & Events" descriptionId="Lihat jadwal, lokasi, dan detail kegiatan pelayanan POUK Graha Prima." descriptionEn="View schedules, locations, and details for POUK Graha Prima ministry activities." driveKey="agenda" imageAltId="Tim pelayanan menyusun agenda kegiatan gereja" imageAltEn="Ministry team planning church activities" />
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
      <div className="content-section calendar-source-note calendar-source-note-action"><a className="button navy" href={GOOGLE_CALENDAR_URL} target="_blank" rel="noreferrer">{t("Lihat kalender lengkap", "View full calendar")} →</a></div>
    </Frame>
  );
}

type PageAsset = {
  folderKey: "qris" | "worship" | "ministry";
  id: string;
  name: string;
  imageUrl: string;
  viewUrl: string;
};

type PageAssetGroups = Record<PageAsset["folderKey"], PageAsset[]>;

const EMPTY_PAGE_ASSETS: PageAssetGroups = { qris: [], worship: [], ministry: [] };

function normaliseAssetName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\.[a-z0-9]{2,5}$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function resolvePageAsset(images: PageAsset[], aliases: string[]) {
  const targets = aliases.map(normaliseAssetName);
  const exact = images.find((image) => targets.includes(normaliseAssetName(image.name)));
  if (exact) return exact.imageUrl;

  const partial = images.find((image) => {
    const fileName = normaliseAssetName(image.name);
    return targets.some((target) => target.length >= 5 && (fileName.includes(target) || target.includes(fileName)));
  });
  return partial?.imageUrl ?? null;
}

function usePageAssets() {
  const [groups, setGroups] = useState<PageAssetGroups>(EMPTY_PAGE_ASSETS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/page-assets?v=page-assets-drive-2026-08-15-v1", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (cancelled || !data?.groups) return;
        setGroups({
          qris: Array.isArray(data.groups.qris) ? data.groups.qris : [],
          worship: Array.isArray(data.groups.worship) ? data.groups.worship : [],
          ministry: Array.isArray(data.groups.ministry) ? data.groups.ministry : [],
        });
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  return groups;
}

export function MinistriesView() {
  const { t } = useLanguage();
  const pageAssets = usePageAssets();
  const worshipItems = [
    { titleId: "Ibadah Raya I", titleEn: "Sunday Worship I", schedule: "Minggu · 07.00 WIB", descriptionId: "Ibadah Minggu di Gedung Gereja POUK Graha Prima.", descriptionEn: "Sunday worship at POUK Graha Prima Church.", image: resolvePageAsset(pageAssets.worship, ["Ibadah Raya"]) },
    { titleId: "Sekolah Minggu", titleEn: "Sunday School", schedule: "Minggu · 07.00 WIB", descriptionId: "Anak-anak belajar mengenal kasih Tuhan melalui ibadah dan aktivitas kreatif.", descriptionEn: "Children discover God’s love through worship and creative activities.", image: resolvePageAsset(pageAssets.worship, ["Ministry Sekolah Minggu", "Sekolah Minggu"]) },
    { titleId: "Ibadah Raya II", titleEn: "Sunday Worship II", schedule: "Minggu · 10.00 WIB", descriptionId: "Ibadah Minggu di Gedung Gereja POUK Graha Prima.", descriptionEn: "Sunday worship at POUK Graha Prima Church.", image: resolvePageAsset(pageAssets.worship, ["Ibadah Raya"]) },
    { titleId: "Ibadah Rumah Tangga", titleEn: "Home Fellowship", schedule: "Jumat · 20.00 WIB", descriptionId: "Persekutuan jemaat di Wilayah I, II, dan III dengan lokasi yang bergilir.", descriptionEn: "Congregational fellowship in Regions I, II, and III with rotating locations.", image: resolvePageAsset(pageAssets.worship, ["Ibadah Rumah Tangga"]) },
  ];
  const ministryItems = [
    { titleId: "Pemuda & Remaja", titleEn: "Youth & Teen Fellowship", schedule: "Setiap awal minggu", descriptionId: "Persekutuan bersama untuk bertumbuh dalam iman, berkarya, dan membangun persahabatan lintas usia.", descriptionEn: "A weekly fellowship to grow in faith, create, and build friendships across age groups.", image: resolvePageAsset(pageAssets.ministry, ["Ministry Pemuda Remaja", "Pemuda Remaja"]) },
    { titleId: "Pemuda", titleEn: "Youth Fellowship", schedule: "Sesuai jadwal pelayanan", descriptionId: "Ruang khusus pemuda untuk berdiskusi, bersekutu, dan mempersiapkan diri melayani.", descriptionEn: "A dedicated space for young adults to connect, discuss, and prepare to serve.", image: resolvePageAsset(pageAssets.ministry, ["Ministry Pemuda", "Pemuda"]) },
    { titleId: "Remaja", titleEn: "Teen Fellowship", schedule: "Sesuai jadwal pelayanan", descriptionId: "Persekutuan remaja yang hangat, relevan, dan mendukung pertumbuhan iman.", descriptionEn: "A welcoming, relevant fellowship that supports teens as they grow in faith.", image: resolvePageAsset(pageAssets.ministry, ["Ministry Remaja", "Remaja"]) },
    { titleId: "Kaum Ibu", titleEn: "Women’s Fellowship", schedule: "Sabtu · 17.00 WIB", descriptionId: "Persekutuan dalam firman, doa, keluarga, dan kepedulian sosial.", descriptionEn: "Fellowship through the Word, prayer, family life, and social care.", image: resolvePageAsset(pageAssets.ministry, ["Ministry KaumIbu", "Ministry Kaum Ibu", "Kaum Ibu"]) },
    { titleId: "Kaum Bapak", titleEn: "Men’s Fellowship", schedule: "Sabtu · 20.00 WIB", descriptionId: "Penguatan iman dan peran sebagai teladan di keluarga serta jemaat.", descriptionEn: "Strengthening faith and leadership in family and church life.", image: resolvePageAsset(pageAssets.ministry, ["Ministry Kaum Bapak", "Kaum Bapak"]) },
    { titleId: "Lansia", titleEn: "Senior Fellowship", schedule: "Selasa · 09.30 WIB", descriptionId: "Kebersamaan, doa, kesehatan, dan pendampingan bagi jemaat lansia.", descriptionEn: "Community, prayer, wellness, and care for senior members.", image: resolvePageAsset(pageAssets.ministry, ["Ministry Lansia", "Lansia"]) },
  ];
  const renderCards = (items: typeof worshipItems) => (
    <div className="ministry-directory">
      {items.map((item)=><article key={item.titleId}>{item.image && <img src={item.image} alt={t(`Kegiatan ${item.titleId} POUK Graha Prima`, `${item.titleEn} at POUK Graha Prima`)} loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }}/>}<small>{item.schedule}</small><h2>{t(item.titleId,item.titleEn)}</h2><p>{t(item.descriptionId,item.descriptionEn)}</p></article>)}
    </div>
  );
  return <Frame>
    <PageHero eyebrowId="Beribadah & melayani" eyebrowEn="Worship & serve" titleId="Jadwal Ibadah & Pelayanan" titleEn="Worship & Ministry Schedule" descriptionId="Temukan jadwal ibadah Minggu, ibadah rumah tangga, dan pelayanan untuk setiap generasi." descriptionEn="Find Sunday worship, home fellowship, and ministry schedules for every generation." driveKey="worship" imageAltId="Jemaat mengikuti ibadah Minggu" imageAltEn="Congregation attending Sunday worship"/>
    <section className="content-section ministry-page-section" id="jadwal-ibadah">
      <div className="section-heading"><div><p className="eyebrow"><span></span>{t("Waktu beribadah", "Worship times")}</p><h2>{t("Jadwal Ibadah", "Worship Schedule")}</h2></div><p>{t("Ibadah Minggu dilaksanakan di Gedung Gereja POUK Graha Prima. Ibadah rumah tangga berlangsung di setiap wilayah dengan lokasi bergilir.", "Sunday worship is held at POUK Graha Prima Church. Home fellowships meet in each region at rotating locations.")}</p></div>
      {renderCards(worshipItems)}
    </section>
    <section className="content-section ministry-page-section" id="pelayanan-kategorial">
      <div className="section-heading"><div><p className="eyebrow"><span></span>{t("Bertumbuh bersama", "Growing together")}</p><h2>{t("Pelayanan Kategorial", "Community Ministries")}</h2></div><p>{t("Pilih persekutuan yang sesuai dan hubungi sekretariat untuk memastikan jadwal kegiatan terbaru.", "Choose the right fellowship and contact the church office to confirm the latest activity schedule.")}</p></div>
      {renderCards(ministryItems)}
    </section>
  </Frame>;
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
      <PageHero eyebrowId="Dokumentasi kegiatan" eyebrowEn="Activity highlights" titleId="Galeri Jemaat" titleEn="Church Gallery" descriptionId="Lihat momen terbaru dari ibadah, persekutuan, dan pelayanan POUK Graha Prima." descriptionEn="See the latest moments from worship, fellowship, and ministry at POUK Graha Prima." driveKey="gallery" imageAltId="Momen kebersamaan jemaat dalam pelayanan" imageAltEn="Church community moments in ministry"/>
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
                    <img src={photo.thumbnailUrl} alt={`${t(section.titleId, section.titleEn)} — ${photo.name}`} loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }}/>
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
            <img src={activePhoto.fullUrl} alt={`${t(activeSection.titleId, activeSection.titleEn)} — ${activePhoto.name}`} onError={(event) => { event.currentTarget.hidden = true; }}/>
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
  const pageAssets = usePageAssets();
  const qris = pageAssets.qris[0];
  const [failedQrisId, setFailedQrisId] = useState<string | null>(null);
  const qrisFailed = Boolean(qris && failedQrisId === qris.id);

  return (
    <Frame>
      <PageHero eyebrowId="Mendukung pelayanan" eyebrowEn="Supporting ministry" titleId="Persembahan" titleEn="Giving" descriptionId="Salurkan persembahan untuk mendukung pelayanan POUK Graha Prima melalui QRIS resmi." descriptionEn="Support the ministry of POUK Graha Prima through its official QRIS." driveKey="giving" imageAltId="Jemaat memberi persembahan untuk mendukung pelayanan" imageAltEn="Congregation giving to support the ministry"/>
      <section className="content-section giving-layout">
        <div className="giving-copy">
          <p className="eyebrow"><span></span>{t("Persembahan digital", "Digital giving")}</p>
          <h2>{t("Memberi dengan sukacita dan tanggung jawab.", "Give with joy and responsibility.")}</h2>
          <p>{t("Pindai QRIS resmi di samping melalui aplikasi mobile banking atau dompet digital. Masukkan nominal persembahan, lalu periksa kembali detail pembayaran sebelum menyelesaikan transaksi.", "Scan the official QRIS using your mobile banking or digital wallet app. Enter the giving amount, then review the payment details before completing the transaction.")}</p>
          <div className="account-card qris-info-card">
            <small>{t("QRIS PERSEMBAHAN", "GIVING QRIS")}</small>
            <strong>POUK GRAHA PRIMA</strong>
            <span>{t("Pindai kode QR di samping", "Scan the QR code beside this information")}</span>
          </div>
          <ul>
            <li>{t("Pastikan detail penerima sesuai informasi resmi gereja.", "Confirm that the recipient details match the church’s official information.")}</li>
            <li>{t("Masukkan nominal persembahan sesuai kerelaan hati.", "Enter the giving amount according to your heart.")}</li>
            <li>{t("Simpan bukti pembayaran untuk konfirmasi bila diperlukan.", "Keep the payment receipt in case confirmation is needed.")}</li>
          </ul>
        </div>
        <div className="qris-card">
          <span>{t("QRIS RESMI", "OFFICIAL QRIS")}</span>
          {qris && !qrisFailed
            ? <a className="qris-image-link" href={qris.viewUrl} target="_blank" rel="noreferrer" aria-label={t("Buka QRIS ukuran penuh", "Open full-size QRIS")}><img src={qris.imageUrl} alt={t("QRIS resmi POUK Graha Prima", "Official POUK Graha Prima QRIS")} onError={() => setFailedQrisId(qris.id)}/></a>
            : <div className="qris-placeholder" role="status">{t("QRIS sedang dimuat. Silakan muat ulang halaman.", "The QRIS is loading. Please refresh the page.")}</div>}
          <h3>QRIS POUK GRAHA PRIMA</h3>
          <p>{t("Pindai dengan aplikasi pembayaran pilihan Anda.", "Scan with your preferred payment app.")}</p>
          {qris && !qrisFailed && <a className="qris-full-link" href={qris.viewUrl} target="_blank" rel="noreferrer">{t("Buka QRIS ukuran penuh", "Open full-size QRIS")} ↗</a>}
        </div>
      </section>
      <section className="content-section giving-contact">
        <h2>{t("Butuh konfirmasi persembahan?", "Need giving confirmation?")}</h2>
        <a className="button navy" href="mailto:gerejapoukgrahaprima@gmail.com?subject=Konfirmasi%20Persembahan">{t("Hubungi sekretariat", "Contact the church office")} →</a>
      </section>
    </Frame>
  );
}

export function NotFoundView() {
  const { t } = useLanguage();
  return <Frame><section className="not-found" id="top"><span>404</span><p className="eyebrow light"><span></span>{t("Halaman tidak ditemukan", "Page not found")}</p><h1>{t("Halaman yang Anda cari tidak ditemukan.", "The page you are looking for was not found.")}</h1><p>{t("Halaman tersebut mungkin sudah dipindahkan atau alamatnya kurang tepat.", "The page may have moved or the address may be incorrect.")}</p><Link className="button gold" href="/">← {t("Kembali ke beranda", "Back to home")}</Link></section></Frame>;
}
