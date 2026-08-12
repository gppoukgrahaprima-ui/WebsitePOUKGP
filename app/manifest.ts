import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "POUK Graha Prima",
    short_name: "POUK GP",
    description: "Website resmi POUK Graha Prima Tambun Bekasi.",
    start_url: "/",
    display: "standalone",
    background_color: "#08213f",
    theme_color: "#08213f",
    icons: [
      { src: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
