const DRIVE_FOLDER_ID = "1JuTWqqzA7RmsTEEKovOy7VROq3JYBG5A";
const MAX_VISIBLE_FILES = 10;

type BulletinFile = {
  id: string;
  name: string;
  modified: string;
  previewUrl: string;
  viewUrl: string;
  downloadUrl: string;
};

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function modifiedScore(label: string) {
  if (/^\d{1,2}:\d{2}\s(?:AM|PM)$/i.test(label)) {
    return Date.parse(`${new Date().toDateString()} ${label}`);
  }
  if (/^Yesterday/i.test(label)) return Date.now() - 86_400_000;
  const parsed = Date.parse(label);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function makeFile(id: string, name: string, modified: string): BulletinFile {
  return {
    id,
    name,
    modified,
    previewUrl: `https://drive.google.com/file/d/${id}/preview`,
    viewUrl: `https://drive.google.com/file/d/${id}/view`,
    downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
  };
}

export async function GET() {
  const folderUrl = `https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}?usp=sharing`;

  try {
    const response = await fetch(folderUrl, {
      headers: {
        Accept: "text/html",
        "User-Agent": "Mozilla/5.0 POUK-Graha-Prima-Warta/1.0",
      },
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw new Error(`Drive returned ${response.status}`);

    const html = await response.text();
    const rowPattern = /<div class="FAGDGb" data-id="([^"]+)"[\s\S]{0,5500}?aria-label="([^"]+?\.pdf) PDF(?: Shared)?"[\s\S]{0,7000}?aria-label="Modified ([^"]+)"/gi;
    const files: BulletinFile[] = [];
    const seen = new Set<string>();

    for (const match of html.matchAll(rowPattern)) {
      const id = match[1];
      if (seen.has(id)) continue;
      seen.add(id);
      files.push(makeFile(id, decodeHtml(match[2]), decodeHtml(match[3])));
    }

    files.sort((a, b) => {
      const dateDifference = modifiedScore(b.modified) - modifiedScore(a.modified);
      return dateDifference || b.name.localeCompare(a.name, undefined, { numeric: true });
    });

    if (!files.length) {
      files.push(makeFile("12m2TXk_ASF_yqLVGQ-pG9_pK8So5hNk7", "WARTA 19 APRIL 2026 (2).pdf", "19 April 2026"));
    }

    return Response.json(
      { files: files.slice(0, MAX_VISIBLE_FILES), folderUrl, syncedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600" } },
    );
  } catch {
    return Response.json(
      { files: [makeFile("12m2TXk_ASF_yqLVGQ-pG9_pK8So5hNk7", "WARTA 19 APRIL 2026 (2).pdf", "19 April 2026")], folderUrl, syncedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, max-age=60" } },
    );
  }
}
