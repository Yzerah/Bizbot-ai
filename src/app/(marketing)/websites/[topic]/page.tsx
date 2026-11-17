import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingView } from "@/components/SeoLanding";
import { getLanding, landings } from "@/content/seo/landings";
import { publicMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return landings.map((page) => ({ topic: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const page = getLanding(topic);
  if (!page) return { title: "העמוד לא נמצא" };
  return publicMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    image: "/og/websites.png",
  });
}

export default async function SeoLandingPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const page = getLanding(topic);
  if (!page) notFound();
  return <SeoLandingView page={page} />;
}
