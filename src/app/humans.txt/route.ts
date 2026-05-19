import { siteConfig } from "@/lib/site";

/**
 * /humans.txt — in the tradition of humanstxt.org, a small note from
 * the people behind the site to anyone curious enough to look. Kept
 * brief and elegant.
 */

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  const body = `/* TEAM */

  Virtue & Power
  ${siteConfig.url}

  An editorial project on classical philosophy, virtue, power,
  leadership, statecraft, religion and the ancient world.

  Founded MMXXVI.


/* THANKS */

  To the long line of editors, translators and scholars whose work
  on the classical inheritance made this site possible — from the
  Alexandrian librarians to the modern critical editions catalogued
  on ${siteConfig.url}/sources.

  In particular, to the open-access archives — Perseus Digital
  Library, the Internet Classics Archive, Project Gutenberg — that
  keep the primary texts available to any reader who wants them.


/* SITE */

  Last update:  ${new Date().toISOString().slice(0, 10)}
  Standards:    HTML5, CSS3
  Components:   Next.js 15 (App Router), TypeScript, Tailwind CSS, MDX
  Analytics:    WebmasterID
  Hosting:      Vercel


/* CONTACT */

  Editorial inquiries — please open an issue or pull request at
  https://github.com/PetroTitan/virtueandpower.com.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
