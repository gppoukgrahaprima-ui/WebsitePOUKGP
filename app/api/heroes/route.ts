type HeroKey = "home" | "about" | "agenda" | "gallery" | "giving" | "warta" | "worship" | "youtube";

type HeroPhoto = {
  id: string;
  name: string;
  imageUrl: string;
  viewUrl: string;
};

const HERO_FOLDER_ID = "1P7m-xB6eYPyBX__chD5yrEVoOITBXlcq";

const HERO_KEYS: Record<string, HeroKey> = {
  "hero home": "home",
  "hero about": "about",
  "hero agenda": "agenda",
  "hero gallery": "gallery",
  "hero giving": "giving",
  "hero warta": "warta",
  "hero worship": "worship",
  "hero youtube": "youtube",
};

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanFileName(value: string) {
  return decodeHtml(value).replace(/^Copy of /i, "").trim();
}

function normaliseFileName(value: string) {
  return cleanFileName(value)
    .replace(/\.[a-z0-9]{2,5}$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export async function GET() {
  const folderUrl = `https://drive.google.com/drive/folders/${HERO_FOLDER_ID}?usp=sharing`;

  try {
    const response = await fetch(folderUrl, {
      headers: {
        Accept: "text/html",
        "User-Agent": "Mozilla/5.0 POUK-Graha-Prima-Hero/1.0",
      },
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw new Error(`Drive returned ${response.status}`);

    const html = await response.text();
    const images: Partial<Record<HeroKey, HeroPhoto>> = {};
    const cacheVersion = Date.now().toString(36);
    const rowPattern = /<div class="FAGDGb" data-id="([^"]+)"[\s\S]{0,3500}?aria-label="([^"]+?) Image(?: Shared)?"/g;

    for (const match of html.matchAll(rowPattern)) {
      const id = match[1];
      const name = cleanFileName(match[2]);
      const key = HERO_KEYS[normaliseFileName(name)];
      if (!key || images[key]) continue;

      images[key] = {
        id,
        name,
        imageUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w2200&v=${cacheVersion}`,
        viewUrl: `https://drive.google.com/file/d/${id}/view`,
      };
    }

    return Response.json(
      { images, revision: "hero-drive-2026-08-15-v1", syncedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600" } },
    );
  } catch {
    return Response.json(
      { images: {}, revision: "hero-drive-2026-08-15-v1", syncedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, max-age=30, s-maxage=60" } },
    );
  }
}
