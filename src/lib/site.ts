export const siteConfig = {
  name: "Virtue & Power",
  shortName: "V&P",
  domain: "virtueandpower.com",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://virtueandpower.com",
  tagline: "Classical wisdom for leadership, civilization and the modern world.",
  description:
    "Virtue & Power is an intellectual platform exploring classical philosophy, virtue, power, leadership, statecraft, religion and the ancient world — grounded in primary sources and the long arc of historical thought.",
  locale: "en_US",
  language: "en",
  twitterHandle: "@virtueandpower",
  sections: [
    { slug: "essays", label: "Essays" },
    { slug: "guides", label: "Guides" },
    { slug: "philosophers", label: "Philosophers" },
    { slug: "books", label: "Books" },
    { slug: "themes", label: "Themes" },
    { slug: "quotes", label: "Quotes" },
    { slug: "comparisons", label: "Comparisons" },
    { slug: "leadership", label: "Leadership" },
    { slug: "power", label: "Power" },
    { slug: "virtue", label: "Virtue" },
    { slug: "statecraft", label: "Statecraft" },
    { slug: "war-and-peace", label: "War & Peace" },
    { slug: "religion-and-wisdom", label: "Religion & Wisdom" },
    { slug: "ancient-world", label: "Ancient World" },
  ] as const,
  primaryNav: [
    { slug: "essays", label: "Essays" },
    { slug: "philosophers", label: "Philosophers" },
    { slug: "books", label: "Books" },
    { slug: "themes", label: "Themes" },
    { slug: "guides", label: "Guides" },
    { slug: "about", label: "About" },
  ] as const,
  footerNav: {
    Library: [
      { slug: "philosophers", label: "Philosophers" },
      { slug: "books", label: "Books" },
      { slug: "themes", label: "Themes" },
      { slug: "quotes", label: "Quotes" },
    ],
    Journal: [
      { slug: "essays", label: "Essays" },
      { slug: "guides", label: "Guides" },
      { slug: "comparisons", label: "Comparisons" },
    ],
    Studies: [
      { slug: "leadership", label: "Leadership" },
      { slug: "power", label: "Power" },
      { slug: "virtue", label: "Virtue" },
      { slug: "statecraft", label: "Statecraft" },
    ],
    Eras: [
      { slug: "ancient-world", label: "Ancient World" },
      { slug: "religion-and-wisdom", label: "Religion & Wisdom" },
      { slug: "war-and-peace", label: "War & Peace" },
    ],
    Editorial: [
      { slug: "about", label: "About" },
      { slug: "editorial-policy", label: "Editorial policy" },
      { slug: "sources", label: "Sources" },
    ],
    Trust: [
      { slug: "privacy-policy", label: "Privacy" },
      { slug: "terms", label: "Terms" },
      { slug: "cookie-policy", label: "Cookies" },
    ],
    Discovery: [
      { slug: "rss.xml", label: "RSS" },
      { slug: "sitemap.xml", label: "Sitemap" },
      { slug: "llms.txt", label: "llms.txt" },
      { slug: "humans.txt", label: "humans.txt" },
    ],
  },
} as const;

export type SiteSectionSlug = (typeof siteConfig.sections)[number]["slug"];
