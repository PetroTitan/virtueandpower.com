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
  image = siteConfig.defaultOgImage,
  publishedTime,
  modifiedTime,
}: BuildMetaInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

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
      images: [{ url: imageUrl }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
    },
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
  image = siteConfig.defaultOgImage,
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
    image: absoluteUrl(image),
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
