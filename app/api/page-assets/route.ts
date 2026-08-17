type PageAssetFolder = {
  key: "qris" | "worship" | "ministry";
  id: string;
};

type PageAsset = {
  folderKey: PageAssetFolder["key"];
  id: string;
  name: string;
  imageUrl: string;
  viewUrl: string;
};

const PAGE_ASSET_FOLDERS: PageAssetFolder[] = [
  { key: "qris", id: "1XU2UetLAplF67n8bohjgecNU5szlvBAI" },
  { key: "worship", id: "1e-b29FEXRJriJXQfqtvX1Owtcrs7LNxX" },
  { key: "ministry", id: "1JxuAIOeCyOyR-fQdZQbLiJSb87NDVVBp" },
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

async function loadFolder(folder: PageAssetFolder, cacheVersion: string) {
  const folderUrl = `https://drive.google.com/drive/folders/${folder.id}?usp=sharing`;

  try {
    const response = await fetch(folderUrl, {
      headers: {
        Accept: "text/html",
        "User-Agent": "Mozilla/5.0 POUK-Graha-Prima-Page-Assets/1.0",
      },
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw new Error(`Drive returned ${response.status}`);

    const html = await response.text();
    const assets: PageAsset[] = [];
    const seen = new Set<string>();
    const rowPattern = /<div class="FAGDGb" data-id="([^"]+)"[\s\S]{0,3500}?aria-label="([^"]+?) Image(?: Shared)?"/g;

    for (const match of html.matchAll(rowPattern)) {
      const id = match[1];
      if (seen.has(id)) continue;
      seen.add(id);
      assets.push({
        folderKey: folder.key,
        id,
        name: cleanFileName(match[2]),
        imageUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w2200&v=${cacheVersion}`,
        viewUrl: `https://drive.google.com/file/d/${id}/view`,
      });
    }

    assets.sort((a, b) => a.name.localeCompare(b.name, "id", { numeric: true, sensitivity: "base" }));
    return assets;
  } catch {
    return [];
  }
}

export async function GET() {
  const cacheVersion = Date.now().toString(36);
  const loaded = await Promise.all(PAGE_ASSET_FOLDERS.map((folder) => loadFolder(folder, cacheVersion)));
  const groups = Object.fromEntries(PAGE_ASSET_FOLDERS.map((folder, index) => [folder.key, loaded[index]]));

  return Response.json(
    { groups, revision: "page-assets-drive-2026-08-15-v1", syncedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600" } },
  );
}
