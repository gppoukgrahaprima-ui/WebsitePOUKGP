import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: "https://www.poukgrahaprima.com/sitemap.xml", host: "https://www.poukgrahaprima.com" };
}
