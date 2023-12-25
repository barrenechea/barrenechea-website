import { createHash } from "crypto";
import { promises as fsp } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { AppConfig } from "../src/config.ts";
import { languages } from "../src/i18n/translations.ts";

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

// Helper function to compute SHA-256 checksum of a file's content
const computeSha256 = async (filePath: string): Promise<string> => {
  const content = await fsp.readFile(filePath, "utf8");
  return createHash("sha256").update(content).digest("hex");
};

// Helper function to check if the SHA-256 checksum line is present in the file
const hasOriginShaLine = async (
  filePath: string,
  sha256sum: string
): Promise<boolean> => {
  const content = await fsp.readFile(filePath, "utf8");
  return content.includes(`originSha: ${sha256sum}`);
};

export interface MissingFile {
  origin: string;
  target: string;
  targetLanguage: string;
}

export async function findMissingFiles(): Promise<MissingFile[]> {
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

  for (const [langCode, langData] of Object.entries(languages)) {
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
        targetLanguage: langData.label,
      }))
    );
  }

  return missingFiles;
}

export async function findOutdatedFiles(): Promise<MissingFile[]> {
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

  // Find outdated files based on the default language
  const outdatedFiles: MissingFile[] = [];

  for (const [langCode, langData] of Object.entries(languages)) {
    if (langCode === defaultLang) continue;

    // for each file in the default language, get their sha256sum as a record
    const defaultLangFilesSha: Record<string, string> = {};
    const defaultLangFiles = contentFiles[defaultLang] || [];
    for (const file of defaultLangFiles) {
      const sha256sum = await computeSha256(path.join(contentDir, file));
      defaultLangFilesSha[file] = sha256sum;
    }

    // check if the existing files have the same sha256sum as the default language using hasOriginShaLine, if not, push to missingFiles
    const existingFiles = contentFiles[langCode] || [];
    for (const file of existingFiles) {
      const defaultLangFile = file.replace(`/${langCode}/`, `/${defaultLang}/`);
      const sha256sum = defaultLangFilesSha[defaultLangFile];
      const isOutdated = !(await hasOriginShaLine(
        path.join(contentDir, file),
        sha256sum
      ));

      if (isOutdated) {
        outdatedFiles.push({
          origin: defaultLangFile,
          target: file,
          targetLanguage: langData.label,
        });
      }
    }
  }

  return outdatedFiles;
}
