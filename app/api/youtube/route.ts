const CHANNEL_FEED = "https://www.youtube.com/feeds/videos.xml?channel_id=UC1Ti9veniOr4Ajm22mLQmyA";

export async function GET() {
  try {
    const response = await fetch(CHANNEL_FEED, {
      headers: { "User-Agent": "POUK-Graha-Prima-Website/1.0" },
    });

    if (!response.ok) throw new Error(`YouTube feed returned ${response.status}`);

    const xml = await response.text();
    const videoIds = Array.from(xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g))
      .map((match) => match[1])
      .slice(0, 4);

    return Response.json(
      { videoIds },
      { headers: { "Cache-Control": "public, max-age=300, s-maxage=900" } },
    );
  } catch {
    return Response.json(
      { videoIds: [] },
      { headers: { "Cache-Control": "public, max-age=60" } },
    );
  }
}
