import type { Metadata } from "next";
import { GalleryView } from "../components/content-pages";

export const metadata: Metadata = { title: "Galeri Jemaat", description: "Dokumentasi ibadah, persekutuan, pelayanan kategorial, perayaan gerejawi, dan kegiatan khusus POUK Graha Prima.", alternates: { canonical: "/galeri" } };
export default function Page() { return <GalleryView/>; }
