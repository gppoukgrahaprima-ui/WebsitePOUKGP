import type { Metadata } from "next";
import { AgendaView } from "../components/content-pages";

export const metadata: Metadata = { title: "Agenda & Event", description: "Kalender dan detail kegiatan pelayanan POUK Graha Prima.", alternates: { canonical: "/agenda" } };

export default function Page() {
  return <AgendaView/>;
}
