type CouncilFolder = {
  key: string;
  id: string;
};

type CouncilPhoto = {
  folderKey: string;
  id: string;
  name: string;
  imageUrl: string;
  viewUrl: string;
};

const COUNCIL_FOLDERS: CouncilFolder[] = [
  { key: "leaders", id: "1VRaGsxM2uO5rrAGLyrSroqMqHrjFq2JO" },
  { key: "executives", id: "1NDqY08MX9E1E5cSByQKSDHfXm-NIXNSI" },
  { key: "koinonia", id: "19O2fHLnIl7pmFhXpO3YnnHrJ56YtAI6s" },
  { key: "marturia", id: "1UsFBoHQgxUduC-soa3Kj4eUMn4TXIDFA" },
  { key: "diakonia", id: "175mPTQE06VI-bbC8gCdBY0uwwmso6Wjs" },
  { key: "general", id: "1uMBOA0I94fJuWituzxPO-ErL08BL9nN_" },
  { key: "regions", id: "1NWqpJFrnrxS4D2dFujwZn1LC1YFLTEQg" },
  { key: "mp", id: "1vWee4SJHe_oyWvyCjglQpphw4q2CI28u" },
  { key: "bpp", id: "1R0qNcNamr5hnOlGJZ4tqcuX8X4ggawMW" },
];

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

function toPhoto(folderKey: string, id: string, name: string): CouncilPhoto {
  return {
    folderKey,
    id,
    name: cleanFileName(name),
    imageUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
    viewUrl: `https://drive.google.com/file/d/${id}/view`,
  };
}

async function loadFolder(folder: CouncilFolder) {
  const folderUrl = `https://drive.google.com/drive/folders/${folder.id}?usp=sharing`;

  try {
    const response = await fetch(folderUrl, {
      headers: {
        Accept: "text/html",
        "User-Agent": "Mozilla/5.0 POUK-Graha-Prima-Council/1.0",
      },
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw new Error(`Drive returned ${response.status}`);

    const html = await response.text();
    const photos: CouncilPhoto[] = [];
    const seen = new Set<string>();

    const rowPattern = /<div class="FAGDGb" data-id="([^"]+)"[\s\S]{0,3500}?aria-label="([^"]+?) Image(?: Shared)?"/g;
    for (const match of html.matchAll(rowPattern)) {
      const id = match[1];
      if (seen.has(id)) continue;
      seen.add(id);
      photos.push(toPhoto(folder.key, id, match[2]));
    }

    photos.sort((a, b) => a.name.localeCompare(b.name, "id", { numeric: true, sensitivity: "base" }));
    return photos;
  } catch {
    return [];
  }
}

export async function GET() {
  const groups = await Promise.all(COUNCIL_FOLDERS.map(loadFolder));
  const images = groups.flat();

  return Response.json(
    { images, revision: "council-drive-2026-08-15-v1", syncedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600" } },
  );
}
