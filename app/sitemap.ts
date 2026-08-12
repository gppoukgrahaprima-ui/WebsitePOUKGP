import type { MetadataRoute } from "next";

const base = "https://www.poukgrahaprima.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/","/tentang","/agenda","/pelayanan","/galeri","/persembahan"];
  return routes.map((route,index)=>({url:`${base}${route === "/" ? "" : route}`,lastModified:new Date("2026-08-12"),changeFrequency:index===0?"weekly":"monthly",priority:index===0?1:0.8}));
}
