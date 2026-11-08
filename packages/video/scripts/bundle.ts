import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";

const packageDir = fileURLToPath(new URL("../", import.meta.url));

// Each bundle copies public/ (every narration file) into a temp folder that Remotion never removes.
export const withBundle = async (work: (serveUrl: string) => Promise<void>): Promise<void> => {
  const serveUrl = await bundle({
    entryPoint: path.join(packageDir, "src/index.ts"),
    publicDir: path.join(packageDir, "public"),
  });
  try {
    await work(serveUrl);
  } finally {
    await rm(serveUrl, { recursive: true, force: true });
  }
};
