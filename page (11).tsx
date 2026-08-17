import type { Metadata } from "next";
import { GivingView } from "../components/content-pages";

export const metadata: Metadata = { title: "Persembahan", description: "Informasi persembahan dan dukungan pelayanan POUK Graha Prima.", alternates: { canonical: "/persembahan" } };
export default function Page() { return <GivingView/>; }
