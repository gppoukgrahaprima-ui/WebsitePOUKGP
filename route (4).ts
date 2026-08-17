type FolderConfig = {
  key: string;
  titleId: string;
  titleEn: string;
  id: string;
};

type GalleryPhoto = {
  id: string;
  name: string;
  modified: string;
  thumbnailUrl: string;
  fullUrl: string;
  viewUrl: string;
};

const DRIVE_FOLDERS: FolderConfig[] = [
  { key: "ibadah-minggu", titleId: "Ibadah Minggu", titleEn: "Sunday Worship", id: "1O-hYedcI6DKzHQrAbzSNQZ0cnRRo74Xr" },
  { key: "sekolah-minggu", titleId: "Sekolah Minggu", titleEn: "Sunday School", id: "13BHATO9jay7bWSndDQEXDwbLxZv1E-AT" },
  { key: "ibadah-keluarga", titleId: "Ibadah Keluarga", titleEn: "Family Worship", id: "1mmwxwlVF9AbejvA5s2EERfzWXlw-yknD" },
  { key: "persekutuan-pemuda", titleId: "Persekutuan Pemuda", titleEn: "Youth Fellowship", id: "1pJaitInyvgJTrqntTqlcqCscjb-EUHGe" },
  { key: "kaum-ibu", titleId: "Kaum Ibu", titleEn: "Women’s Fellowship", id: "1WUo-acEfi6UM_8M5RgiuVRQ6uj20gO7d" },
  { key: "kaum-bapak", titleId: "Kaum Bapak", titleEn: "Men’s Fellowship", id: "1NSEknVesNl1AJ1AWN6avkhs0s_MZfQg6" },
  { key: "lansia", titleId: "Lansia", titleEn: "Senior Fellowship", id: "1I2VrQx6Muv8cDYvyMCA6zptA4LqZ6gbW" },
  { key: "pelayanan-musik", titleId: "Pelayanan Musik", titleEn: "Music Ministry", id: "1Z54a_NyFIwlVPBAmvKhGS7RVTUL-2Xlk" },
  { key: "ibadah-padang-pemuda-remaja", titleId: "Ibadah Padang Pemuda & Remaja", titleEn: "Youth & Teen Outdoor Worship", id: "1PCRPcG6DGX1ibb7ZBbDKrewKH3JCCsj-" },
  { key: "retret-pemuda-remaja", titleId: "Retret Pemuda & Remaja", titleEn: "Youth & Teen Retreat", id: "1YuTEzbr-Ox5SZ0yEAOxba4sdhBYx-h3M" },
  { key: "kkr", titleId: "KKR", titleEn: "Revival Service", id: "1TylSRoACIA5LdBmCCFUg3Kl-o-kBL6kk" },
  { key: "sidi", titleId: "SIDI", titleEn: "Confirmation", id: "1zpDVFzUako4yBLUCNBm3GhqEhb4EUOF9" },
  { key: "baptis", titleId: "Baptis", titleEn: "Baptism", id: "1LDlWPK_TjENLatbqnwMcXz1lzqs0uob6" },
  { key: "paskah", titleId: "Paskah", titleEn: "Easter", id: "1DUhP1Nm5NrSTgddW1i49fpzckw0_IDST" },
  { key: "paskah-sekolah-minggu", titleId: "Paskah Sekolah Minggu", titleEn: "Sunday School Easter", id: "1bQ-ram2vQYrgQclXa_VMjan18uwcl9Li" },
  { key: "natal-jemaat", titleId: "Natal Jemaat", titleEn: "Congregational Christmas", id: "1ggCkJWlz_-WVhxpmu6T7Jwomvb5Fjuku" },
  { key: "natal-umum", titleId: "Natal Umum", titleEn: "Christmas Celebration", id: "1l-sbr8xkZU0mKJOgYbWuM-Vz2y6dwPwT" },
  { key: "malam-natal", titleId: "Malam Natal", titleEn: "Christmas Eve", id: "1NIwDbZ_xzaZeP5W_xwtqLPLthd5tTV5c" },
  { key: "natal-pemuda-remaja", titleId: "Natal Pemuda & Remaja", titleEn: "Youth & Teen Christmas", id: "1XsxGP9xNnlJJVYuHdBi5B_1VPJkn48S5" },
  { key: "natal-sekolah-minggu", titleId: "Natal Anak Sekolah Minggu", titleEn: "Sunday School Christmas", id: "1uVNiHr0yeaNSAj95UdBHnte_QVe6aVL2" },
];

const FALLBACK_PHOTOS: Record<string, Array<[string, string, string]>> = {
  "ibadah-minggu": [
    ["1MhiT4jKYon4xBFlFGWWFRSNTlIcZlJOT", "IMG_7927.JPG", "Terbaru"],
    ["11XKA7N3izBgFgXCTGwCdp1YYPyJTkTXN", "IMG_7925.JPG", "Terbaru"],
    ["1pJMcq2R4zK-j-dQHZ_cuGN9KEfMdK4FJ", "IMG_7924.JPG", "Terbaru"],
    ["17tE0D1_oD4Y0SZXRigBBJcnZZr2KG54I", "IMG_7923.JPG", "Terbaru"],
    ["1Mzd7x4GtJZKvZxHznCw2qwCOkPQtjnFm", "IMG_7921.JPG", "Terbaru"],
    ["19aC3UVVVtWuzFGvzxDPZl_13nYS3v8pz", "IMG_7920.JPG", "Terbaru"],
  ],
  "persekutuan-pemuda": [
    ["1A2xWNeWNwbIH5uH4bEGIA5oXtzzIre92", "IMG_7967.JPG", "24 Des 2023"],
    ["1jSKahQLYFhoRu8Za-ykHW0wTd3E187op", "IMG_7966.JPG", "24 Des 2023"],
    ["1o9-p8o9EogI-RCXmxkFshsJ7sby2QtH1", "IMG_7965.JPG", "24 Des 2023"],
    ["1FTy12HmwbKlI0BG3hEkhYPsRmhdvXZMI", "IMG_7964.JPG", "24 Des 2023"],
    ["1LXFwG7wfcSP_8kSzD_1_UhPxCU0h6Xt6", "IMG_7963.JPG", "24 Des 2023"],
    ["1GV9y-c84lBgjJ6GaMIlB5cvpFDiWWWBG", "IMG_7962.JPG", "24 Des 2023"],
  ],
  "sekolah-minggu": [
    ["1rTFD6g0eSKIGWQU7TE5o6MKvoS52J8ow", "IMG_7948.JPG", "24 Des 2023"],
    ["131681ZadOE8MogJTsSLAS3fjuRw0kkeh", "IMG_7947.JPG", "24 Des 2023"],
    ["1PUMHjl6y6Yp0JFPzKokaquELxPecgc_u", "IMG_7946.JPG", "24 Des 2023"],
    ["1oMx6mrY8IHr-c7jwRwhaje4BFgRyBXcN", "IMG_7945.JPG", "24 Des 2023"],
    ["1c0ZMyLMcnKD2gOglsPZ7xKywij7HaZ-w", "IMG_7944.JPG", "24 Des 2023"],
    ["13davfmSujWb8l1s9wj01nYsF_7R-HE9D", "IMG_7943.JPG", "24 Des 2023"],
  ],
  "ibadah-keluarga": [
    ["1TJ9oNbSR7eS2t3Xeb-CVN0fDlBtDLytY", "IMG_7916.JPG", "24 Des 2023"],
    ["1wLkI2BdzLLa8YPis7o6FsHvAcTfECUDO", "IMG_7915.JPG", "24 Des 2023"],
    ["14s_urHfaVgsHcnyRh1MuuEBnsCdAK_CW", "IMG_7914.JPG", "24 Des 2023"],
    ["1NqalVc6g83dwheM67g3cBQDJlbxHolPw", "IMG_7913.JPG", "24 Des 2023"],
    ["1GlAjYYNOqc6g7oWbDGGtCJ5fNgnQPs9l", "IMG_7912.JPG", "24 Des 2023"],
    ["1ybzIlfZjlpUzcBZjTDRA4ERRBtcDZ2vi", "IMG_7911.JPG", "24 Des 2023"],
  ],
  "pelayanan-musik": [
    ["1nYAzP3dtDcTqRCf5ajOmMp75M8uT4RLW", "IMG_7957.JPG", "24 Des 2023"],
    ["1efGs73pS0eaKyVlaoMqdpcxm55btW_Q6", "IMG_7956.JPG", "24 Des 2023"],
    ["1QzE8SueaZWxatbRMgtWrMXKNd1NjVqQA", "IMG_7955.JPG", "24 Des 2023"],
    ["1EGrUYeR21g5D1vCxk1a13ZbyOMbxY40r", "IMG_7954.JPG", "24 Des 2023"],
    ["1W1_ZdDqY2zhSLGQNkCmF6WlnXVJg6U2K", "IMG_7953.JPG", "24 Des 2023"],
    ["1_B1UgKBXMUQhZ7e63cfNpaR2PmD43xcw", "IMG_7952.JPG", "24 Des 2023"],
  ],
};

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function photoFromTuple([id, name, modified]: [string, string, string]): GalleryPhoto {
  return {
    id,
    name,
    modified,
    thumbnailUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w900`,
    fullUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w2200`,
    viewUrl: `https://drive.google.com/file/d/${id}/view`,
  };
}

function modifiedScore(label: string) {
  if (/^\d{1,2}:\d{2}\s(?:AM|PM)$/i.test(label)) {
    const today = new Date().toDateString();
    return Date.parse(`${today} ${label}`);
  }
  if (/^Yesterday/i.test(label)) return Date.now() - 86_400_000;
  const parsed = Date.parse(label);
  return Number.isNaN(parsed) ? 0 : parsed;
}

async function loadFolder(folder: FolderConfig) {
  const folderUrl = `https://drive.google.com/drive/folders/${folder.id}?usp=sharing`;
  let photos: GalleryPhoto[] = [];

  try {
    const response = await fetch(folderUrl, {
      headers: {
        Accept: "text/html",
        "User-Agent": "Mozilla/5.0 POUK-Graha-Prima-Gallery/1.0",
      },
      signal: AbortSignal.timeout(12_000),
    });
    if (!response.ok) throw new Error(`Drive returned ${response.status}`);

    const html = await response.text();
    const rowPattern = /<div class="FAGDGb" data-id="([^"]+)"[\s\S]{0,3500}?aria-label="([^"]+?) Image(?: Shared)?"[\s\S]{0,4500}?aria-label="Modified ([^"]+)"/g;
    const seen = new Set<string>();

    for (const match of html.matchAll(rowPattern)) {
      const id = match[1];
      if (seen.has(id)) continue;
      seen.add(id);
      photos.push(photoFromTuple([id, decodeHtml(match[2]).replace(/^Copy of /, ""), decodeHtml(match[3])]));
    }

    photos.sort((a, b) => {
      const dateDifference = modifiedScore(b.modified) - modifiedScore(a.modified);
      return dateDifference || b.name.localeCompare(a.name, undefined, { numeric: true });
    });
    photos = photos.slice(0, 6);
  } catch {
    photos = [];
  }

  if (!photos.length) {
    photos = (FALLBACK_PHOTOS[folder.key] ?? []).map(photoFromTuple);
  }

  return { ...folder, folderUrl, photos };
}

export async function GET() {
  const sections = await Promise.all(DRIVE_FOLDERS.map(loadFolder));
  return Response.json(
    { sections, revision: "expanded-gallery-2026-08-12-v1", syncedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600" } },
  );
}
