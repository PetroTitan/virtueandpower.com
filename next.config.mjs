import createMDX from "@next/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingRoot: __dirname,
  /**
   * Alias paths for the Homer / Odyssey cluster.
   *
   * The primary texts live in the existing /books namespace and the
   * mythological cast in /figures, so there is exactly one canonical URL
   * for each page. These redirects exist so that the /texts/... shape —
   * which reads naturally and which external links use — resolves rather
   * than 404s, without creating a second address for the same content.
   */
  async redirects() {
    return [
      { source: "/texts/the-odyssey", destination: "/books/odyssey", permanent: true },
      {
        source: "/texts/the-odyssey/:division",
        destination: "/books/odyssey/:division",
        permanent: true,
      },
      { source: "/texts/the-iliad", destination: "/books/iliad", permanent: true },
      { source: "/odyssey", destination: "/books/odyssey", permanent: true },
      // Homer is an author, not a character, so he stays in the
      // philosophers layer with the rest of the authors.
      { source: "/figures/homer", destination: "/philosophers/homer", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
