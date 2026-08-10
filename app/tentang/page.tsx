import type { Metadata } from "next";
import { AboutView } from "../components/content-pages";

export const metadata: Metadata = { title: "Tentang Gereja", description: "Sejarah, visi-misi, dan struktur Majelis POUK Graha Prima Tambun Selatan, Bekasi.", alternates: { canonical: "/tentang" } };

export default function Page() { return <AboutView/>; }
