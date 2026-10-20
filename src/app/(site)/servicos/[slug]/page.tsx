import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicePages } from "@/content/landing-pages";
import { pageMetadata, type SeoPath } from "@/content/seo";
import { LandingPage } from "@/components/sections/LandingPage";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) return {};
  return pageMetadata(page.path as SeoPath, page.cover.src);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) notFound();
  return <LandingPage page={page} />;
}
