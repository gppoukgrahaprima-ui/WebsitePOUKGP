import type { Metadata } from "next";
import { WartaView } from "./warta-view";

export const metadata: Metadata = {
  title: "Warta & Tata Ibadah",
  description: "Baca Warta Jemaat dan Tata Ibadah mingguan POUK Graha Prima langsung dari halaman website.",
  alternates: { canonical: "/warta" },
};

export default function Page() {
  return <WartaView/>;
}
