import type { Metadata } from "next";
import { petlovePage } from "@/content/landing-pages";
import { pageMetadata } from "@/content/seo";
import { LandingPage } from "@/components/sections/LandingPage";

export const metadata: Metadata = pageMetadata("/petlove", petlovePage.cover.src);

export default function PetlovePage() {
  return <LandingPage page={petlovePage} />;
}
