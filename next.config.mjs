import createMDX from "@next/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingRoot: __dirname,
  images: {
    // Wikimedia Commons is the canonical source for the public-domain
    // museum bust photographs used in the editorial composition (hero,
    // and any future bust references in essays / guides). Restricting to
    // the /wikipedia/commons/ path keeps non-Commons Wikimedia content
    // out of the optimisation pipeline.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
