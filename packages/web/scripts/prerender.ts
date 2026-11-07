import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  courses,
  renderLlmsFullTxt,
  renderLlmsTxt,
  renderPageHtml,
  renderSitemap,
  sitePages,
} from "@security-education/course";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));

const writeDistFile = async (relativePath: string, content: string): Promise<void> => {
  const target = path.join(distDir, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content);
};

const main = async (): Promise<void> => {
  const templatePath = path.join(distDir, "index.html");
  const template = await readFile(templatePath, "utf8");
  const pages = sitePages();
  const home = pages.find((page) => page.path === "");
  if (!home) throw new Error("The site has no home page");
  await Promise.all(
    pages.map((page) => writeDistFile(path.join(page.path, "index.html"), renderPageHtml(template, page))),
  );
  // GitHub Pages serves 404.html for unknown paths; the app's router then redirects to the home page.
  await writeDistFile("404.html", renderPageHtml(template, home));
  await writeDistFile("sitemap.xml", renderSitemap(pages));
  await writeDistFile("llms.txt", renderLlmsTxt(pages));
  await writeDistFile("llms-full.txt", renderLlmsFullTxt(courses));
  console.log(`prerendered ${pages.length} pages into ${distDir}`);
};

await main();
