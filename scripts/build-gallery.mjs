import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(scriptDirectory, "..");
const ignoredDirectories = new Set([".git", ".github", "node_modules", "scripts"]);
const ignoredFiles = new Set(["index.html", "404.html"]);

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".") || ignoredDirectories.has(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(absolutePath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      const relativePath = path.relative(rootDirectory, absolutePath).replaceAll("\\", "/");
      if (!ignoredFiles.has(relativePath)) files.push({ absolutePath, relativePath });
    }
  }

  return files;
}

function titleFromHtml(html, relativePath) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = match?.[1]?.replace(/\s+/g, " ").trim();
  return title || path.basename(relativePath, ".html").replaceAll(/[-_]/g, " ");
}

const htmlFiles = await collectHtmlFiles(rootDirectory);
const projects = await Promise.all(htmlFiles.map(async ({ absolutePath, relativePath }) => {
  const html = await readFile(absolutePath, "utf8");
  return { title: titleFromHtml(html, relativePath), path: relativePath };
}));

projects.sort((a, b) => a.title.localeCompare(b.title, "th"));

const output = `// ไฟล์นี้สร้างใหม่อัตโนมัติด้วย scripts/build-gallery.mjs\nwindow.HTML_SHOWCASE_PROJECTS = ${JSON.stringify(projects, null, 2)};\n`;
await writeFile(path.join(rootDirectory, "gallery-data.js"), output, "utf8");
console.log(`สร้างรายการแล้ว ${projects.length} ไฟล์`);
