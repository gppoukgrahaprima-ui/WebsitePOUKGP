"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../components/language-provider";
import { PageHero, SiteFooter, SiteHeader } from "../components/site-chrome";

const CHANNEL_URL = "https://www.youtube.com/@POUKGRAHAPRIMA";
const STREAMS_URL = "https://www.youtube.com/@POUKGRAHAPRIMA/streams";
const VIDEO_PLAYLIST = "UULF1Ti9veniOr4Ajm22mLQmyA";
const LIVE_PLAYLIST = "UULV1Ti9veniOr4Ajm22mLQmyA";

type YouTubeItem = {
  videoId: string;
  title: string;
  published: string;
  thumbnail: string;
  isLive: boolean;
};

type YouTubeResponse = {
  videos?: YouTubeItem[];
  liveStreams?: YouTubeItem[];
};

function VideoCard({ item, live, dateLabel }: { item: YouTubeItem; live?: boolean; dateLabel: string }) {
  return (
    <article className="youtube-library-card">
      <div className="youtube-library-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${item.videoId}?rel=0`}
          title={`${item.title} — POUK Graha Prima`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <span className={live ? "youtube-content-badge is-live" : "youtube-content-badge"}>
          {live ? "LIVE" : "VIDEO"}
        </span>
      </div>
      <div className="youtube-library-copy">
        <small>{dateLabel}</small>
        <h3>{item.title}</h3>
        <a href={`https://www.youtube.com/watch?v=${item.videoId}`} target="_blank" rel="noreferrer">
          YouTube <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function LoadingGrid() {
  return <div className="youtube-library-grid" aria-label="Memuat konten YouTube">{[0,1,2,3].map((item)=><div className="youtube-library-skeleton" key={item}><span></span><i></i><i></i></div>)}</div>;
}

function PlaylistFallbackGrid({ playlistId, live, title }: { playlistId: string; live?: boolean; title: string }) {
  return (
    <article className="youtube-library-card youtube-library-card-fallback">
      <div className="youtube-library-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0`}
          title={`${title} — POUK Graha Prima`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <span className={live ? "youtube-content-badge is-live" : "youtube-content-badge"}>{live ? "LIVE" : "VIDEO"}</span>
      </div>
      <div className="youtube-library-copy"><small>POUK GRAHA PRIMA</small><h3>{title}</h3></div>
    </article>
  );
}

export function YouTubeView() {
  const { language, t } = useLanguage();
  const [videos, setVideos] = useState<YouTubeItem[]>([]);
  const [liveStreams, setLiveStreams] = useState<YouTubeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/youtube", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: YouTubeResponse) => {
        setVideos(Array.isArray(data.videos) ? data.videos : []);
        setLiveStreams(Array.isArray(data.liveStreams) ? data.liveStreams : []);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return t("Tayangan terbaru", "Latest release");
    return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <>
      <SiteHeader/>
      <main className="inner-main">
        <PageHero
          eyebrowId="Channel resmi"
          eyebrowEn="Official channel"
          titleId="YouTube POUK Graha Prima"
          titleEn="POUK Graha Prima YouTube"
          descriptionId="Saksikan video pelayanan dan rekaman live terbaru dari channel resmi POUK Graha Prima."
          descriptionEn="Watch the latest ministry videos and live recordings from the official POUK Graha Prima channel."
          driveKey="youtube"
         
          imageAltId="Tim multimedia merekam pelayanan gereja"
          imageAltEn="Church media team recording a ministry service"
        >
          <div className="youtube-hero-actions">
            <a className="button gold" href={CHANNEL_URL} target="_blank" rel="noreferrer">{t("Buka Channel YouTube", "Open YouTube Channel")} <span aria-hidden="true">↗</span></a>
          </div>
        </PageHero>

        <section className="content-section youtube-page-section" id="video-terbaru">
          <div className="youtube-page-heading">
            <div><p className="eyebrow"><span></span>{t("Upload terbaru", "Latest uploads")}</p><h2>{t("Video", "Latest")} <em>{t("Terbaru", "Videos")}</em></h2></div>
            <p>{t("Rekaman ibadah, renungan, kesaksian, dan kegiatan pelayanan terbaru.", "The newest worship recordings, reflections, testimonies, and ministry activities.")}</p>
          </div>
          {loading ? <LoadingGrid/> : videos.length > 0 ? (
            <div className="youtube-library-grid">
              {videos.slice(0, 6).map((item) => <VideoCard item={item} dateLabel={formatDate(item.published)} key={item.videoId}/>) }
            </div>
          ) : (
            <PlaylistFallbackGrid playlistId={VIDEO_PLAYLIST} title={t("Video terbaru", "Latest video")}/>
          )}
        </section>

        <section className="youtube-live-section" id="live-terbaru">
          <div className="youtube-live-shell">
            <div className="youtube-page-heading youtube-page-heading-light">
              <div><p className="eyebrow light"><span></span>{t("Siaran & rekaman", "Streams & recordings")}</p><h2>{t("Live", "Latest")} <em>{t("Terbaru", "Live Streams")}</em></h2></div>
              <p>{t("Siaran langsung terbaru dan rekaman live yang sudah selesai.", "The newest live broadcasts and completed live recordings.")}</p>
            </div>
            {loading ? <LoadingGrid/> : liveStreams.length > 0 ? (
              <div className="youtube-library-grid">
                {liveStreams.slice(0, 6).map((item) => <VideoCard item={item} live dateLabel={formatDate(item.published)} key={item.videoId}/>) }
              </div>
            ) : (
              <><PlaylistFallbackGrid playlistId={LIVE_PLAYLIST} live title={t("Live terbaru", "Latest live stream")}/><div className="youtube-playlist-note"><a className="button gold" href={STREAMS_URL} target="_blank" rel="noreferrer">{t("Lihat Semua Live di YouTube", "View All Live Streams on YouTube")} →</a></div></>
            )}
          </div>
        </section>
      </main>
      <SiteFooter/>
    </>
  );
}
