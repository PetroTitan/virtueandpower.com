import type { Metadata } from "next";
import { siteConfig } from "./site";

type BuildMetaInput = {
  title: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  /** When true, emits robots: noindex/follow. Use for stub entries and
   *  any page whose content is not yet authoritative. */
  noindex?: boolean;
};

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path,
  type = "website",
  image,
  publishedTime,
  modifiedTime,
  noindex = false,
}: BuildMetaInput): Metadata {
  const canonical = absoluteUrl(path);
  // Per-page OG image override; when absent, Next.js merges the
  // file-convention opengraph-image / twitter-image from the root layout.
  const imageBlock = image ? { images: [{ url: absoluteUrl(image) }] } : {};
  const twitterImageBlock = image
    ? { images: [absoluteUrl(image)] }
    : {};

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...imageBlock,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...twitterImageBlock,
      creator: siteConfig.twitterHandle,
    },
    ...(noindex
      ? {
          robots: {
            index: false,
            follow: true,
            googleBot: { index: false, follow: true },
          },
        }
      : {}),
  };
}

type BreadcrumbItem = { name: string; href: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

type ArticleJsonLdInput = {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified: string;
  authorName?: string;
  image?: string;
  section?: string;
};

export function articleJsonLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = siteConfig.name,
  image,
  section,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: absoluteUrl(url),
    url: absoluteUrl(url),
    datePublished: datePublished ?? dateModified,
    dateModified,
    image: image ? absoluteUrl(image) : `${siteConfig.url}/opengraph-image`,
    inLanguage: siteConfig.language,
    articleSection: section,
    author: {
      "@type": "Organization",
      name: authorName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    description: siteConfig.description,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

type PersonJsonLdInput = {
  name: string;
  url: string;
  description?: string;
  birthDate?: string;
  deathDate?: string;
  alternateName?: string;
};

export function personJsonLd({
  name,
  url,
  description,
  birthDate,
  deathDate,
  alternateName,
}: PersonJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url: absoluteUrl(url),
    ...(alternateName ? { alternateName } : {}),
    ...(description ? { description } : {}),
    ...(birthDate ? { birthDate } : {}),
    ...(deathDate ? { deathDate } : {}),
  };
}

type BookJsonLdInput = {
  name: string;
  url: string;
  authorName: string;
  description?: string;
  inLanguage?: string;
  datePublished?: string;
};

export function bookJsonLd({
  name,
  url,
  authorName,
  description,
  inLanguage,
  datePublished,
}: BookJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name,
    url: absoluteUrl(url),
    author: { "@type": "Person", name: authorName },
    ...(description ? { description } : {}),
    ...(inLanguage ? { inLanguage } : {}),
    ...(datePublished ? { datePublished } : {}),
  };
}
