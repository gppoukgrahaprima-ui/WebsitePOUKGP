const VIDEO_FEED = "https://www.youtube.com/feeds/videos.xml?playlist_id=UULF1Ti9veniOr4Ajm22mLQmyA";
const LIVE_FEED = "https://www.youtube.com/feeds/videos.xml?playlist_id=UULV1Ti9veniOr4Ajm22mLQmyA";

type YouTubeItem = {
  videoId: string;
  title: string;
  published: string;
  thumbnail: string;
  isLive: boolean;
};

function decodeXml(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function readTag(entry: string, tag: string) {
  const match = entry.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return match ? decodeXml(match[1].trim()) : "";
}

async function fetchItems(feedUrl: string, isLive: boolean) {
  const response = await fetch(feedUrl, {
    headers: { "User-Agent": "POUK-Graha-Prima-Website/1.0" },
  });
  if (!response.ok) throw new Error(`YouTube feed returned ${response.status}`);

  const xml = await response.text();
  return Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g))
    .map((match) => match[1])
    .map((entry) => {
      const videoId = readTag(entry, "yt:videoId");
      return {
        videoId,
        title: readTag(entry, "title"),
        published: readTag(entry, "published"),
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        isLive,
      } satisfies YouTubeItem;
    })
    .filter((item) => item.videoId)
    .slice(0, 6);
}

export async function GET() {
  try {
    const [videosResult, liveResult] = await Promise.allSettled([
      fetchItems(VIDEO_FEED, false),
      fetchItems(LIVE_FEED, true),
    ]);
    const videos = videosResult.status === "fulfilled" ? videosResult.value : [];
    const liveStreams = liveResult.status === "fulfilled" ? liveResult.value : [];
    if (videos.length === 0 && liveStreams.length === 0) throw new Error("YouTube feeds are unavailable");
    const videoIds = videos.slice(0, 4).map((item) => item.videoId);

    return Response.json(
      { videoIds, videos, liveStreams },
      { headers: { "Cache-Control": "public, max-age=300, s-maxage=900" } },
    );
  } catch {
    return Response.json(
      { videoIds: [], videos: [], liveStreams: [] },
      { headers: { "Cache-Control": "public, max-age=60" } },
    );
  }
}
