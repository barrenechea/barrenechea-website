import { promises as fsp } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { AppConfig } from "../src/config.ts";
import { languages } from "../src/i18n/ui.ts";

const { defaultLang } = AppConfig;

// Derive the directory name from the current file's URL
const __dirname = path.dirname(fileURLToPath(`${import.meta.url}/../`));
const contentDir = path.join(__dirname, "src", "content");

async function getFilesInDirectory(
  dir: string,
  ext: string = ".mdx"
): Promise<string[]> {
  let files: string[] = [];
  const items = await fsp.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = [...files, ...(await getFilesInDirectory(fullPath, ext))];
    } else if (item.isFile() && path.extname(item.name) === ext) {
      files.push(path.relative(contentDir, fullPath));
    }
  }
  return files;
}

interface MissingFile {
  origin: string;
  target: string;
  targetLanguage: string;
}

export async function findMissingFiles(): Promise<MissingFile[]> {
  // Read all .mdx files just once
  const allFiles = await getFilesInDirectory(contentDir);

  // Organize files by language
  const contentFiles: Record<string, string[]> = allFiles.reduce(
    (acc: Record<string, string[]>, file) => {
      const langCode = file.split("/")[1];
      if (!acc[langCode]) {
        acc[langCode] = [];
      }
      acc[langCode].push(file);
      return acc;
    },
    {}
  );

  // Find missing files based on the default language
  const missingFiles: MissingFile[] = [];
  const defaultLangFiles = contentFiles[defaultLang] || [];

  for (const [langCode, langName] of Object.entries(languages)) {
    if (langCode === defaultLang) continue;

    const expectedFiles = defaultLangFiles.map((file) =>
      file.replace(`/${defaultLang}/`, `/${langCode}/`)
    );

    const existingFiles = contentFiles[langCode] || [];
    const missingLangFiles = expectedFiles.filter(
      (file) => !existingFiles.includes(file)
    );

    missingFiles.push(
      ...missingLangFiles.map((file) => ({
        origin: file.replace(`/${langCode}/`, `/${defaultLang}/`),
        target: file,
        targetLanguage: langName,
      }))
    );
  }

  return missingFiles;
}
