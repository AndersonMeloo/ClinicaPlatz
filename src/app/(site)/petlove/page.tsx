import type { Metadata } from "next";
import { petlovePage } from "@/content/landing-pages";
import { LandingPage } from "@/components/sections/LandingPage";

export const metadata: Metadata = {
  title: petlovePage.title,
  description: petlovePage.description,
  alternates: { canonical: petlovePage.path },
  openGraph: { title: petlovePage.title, description: petlovePage.description, url: petlovePage.path },
};

export default function PetlovePage() {
  return <LandingPage page={petlovePage} />;
}
