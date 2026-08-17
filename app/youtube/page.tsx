import type { Metadata } from "next";
import { YouTubeView } from "./youtube-view";

export const metadata: Metadata = {
  title: "YouTube",
  description: "Video pelayanan dan rekaman live terbaru dari channel resmi YouTube POUK Graha Prima.",
  alternates: { canonical: "/youtube" },
};

export default function YouTubePage() {
  return <YouTubeView/>;
}
