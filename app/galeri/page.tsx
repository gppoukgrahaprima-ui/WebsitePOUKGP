import type { Metadata } from "next";
import { GalleryView } from "../components/content-pages";

export const metadata: Metadata = { title: "Galeri Jemaat", description: "Foto terbaru ibadah, pelayanan, Sekolah Minggu, pemuda, keluarga, dan kebersamaan jemaat POUK Graha Prima.", alternates: { canonical: "/galeri" } };
export default function Page() { return <GalleryView/>; }
