import type { Metadata } from "next";
import { MinistriesView } from "../components/content-pages";

export const metadata: Metadata = { title: "Bidang Pelayanan", description: "Sekolah Minggu, Pemuda dan Remaja, Kaum Ibu, Kaum Bapak, Lansia, Musik dan Multimedia POUK Graha Prima.", alternates: { canonical: "/pelayanan" } };

export default function Page() { return <MinistriesView/>; }
