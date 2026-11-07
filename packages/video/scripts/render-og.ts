import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { ogImagePath, sitePages } from "@security-education/course";
import type { SitePage } from "@security-education/course";

const OG_COMPOSITION_ID = "og-image";

const packageDir = fileURLToPath(new URL("../", import.meta.url));
const webPublicDir = fileURLToPath(new URL("../../web/public/", import.meta.url));

const pagesByImageKey = (pages: readonly SitePage[]): SitePage[] => [
  ...new Map(pages.map((page) => [page.ogImageKey, page])).values(),
];

const renderOgImage = async (serveUrl: string, page: SitePage): Promise<void> => {
  const inputProps = { title: page.heading, tagline: page.tagline };
  const composition = await selectComposition({ serveUrl, id: OG_COMPOSITION_ID, inputProps });
  const output = path.join(webPublicDir, ogImagePath(page.ogImageKey));
  await mkdir(path.dirname(output), { recursive: true });
  await renderStill({ serveUrl, composition, inputProps, output, imageFormat: "png" });
  console.log(`${page.ogImageKey}: wrote ${output}`);
};

const main = async (): Promise<void> => {
  const requested = process.argv.slice(2);
  const targets = pagesByImageKey(sitePages()).filter(
    (page) => requested.length === 0 || requested.includes(page.ogImageKey),
  );
  const serveUrl = await bundle({
    entryPoint: path.join(packageDir, "src/index.ts"),
    publicDir: path.join(packageDir, "public"),
  });
  for (const page of targets) {
    await renderOgImage(serveUrl, page);
  }
};

await main();
