import { createHash } from 'crypto';
import { promises as fsp } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { AppConfig } from '../src/config.ts';
import { languages } from '../src/i18n/translations.ts';

const { defaultLang } = AppConfig;

// Derive the directory name from the current file's URL
const dirname = path.dirname(fileURLToPath(`${import.meta.url}/../`));
const contentDir = path.join(dirname, 'src', 'content');

async function getFilesInDirectory(dir: string, ext = '.mdx'): Promise<string[]> {
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

/**
 * Helper function to compute the checksum of a file's content
 * @param filePath path to the file
 * @param algorithm algorithm to use for the checksum (default: sha256)
 * @returns checksum of the file's content
 */
export const computeChecksum = async (filePath: string, algorithm = 'sha256'): Promise<string> => {
  const content = await fsp.readFile(filePath, 'utf8');
  return createHash(algorithm).update(content).digest('hex');
};

/**
 * Helper function to check if a matching checksum line is present in the file
 * @param filePath path to the file
 * @param checksum checksum to check
 * @returns true if the checksum line is present, false otherwise
 */
const hasChecksumLine = async (filePath: string, checksum: string): Promise<boolean> => {
  const content = await fsp.readFile(filePath, 'utf8');
  return content.includes(`checksum: ${checksum}`);
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
      const langCode = file.split('/')[1];
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
  const defaultLangFiles = contentFiles[defaultLang] ?? [];

  for (const [langCode, langData] of Object.entries(languages)) {
    if (!langData.translateFrom) continue;

    const expectedFiles = defaultLangFiles.map((file) =>
      file.replace(`/${defaultLang}/`, `/${langCode}/`)
    );

    const existingFiles = contentFiles[langCode] ?? [];
    const missingLangFiles = expectedFiles.filter((file) => !existingFiles.includes(file));

    missingFiles.push(
      ...missingLangFiles.map((file) => ({
        origin: file.replace(`/${langCode}/`, `/${langData.translateFrom}/`),
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
      const langCode = file.split('/')[1];
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
    if (!langData.translateFrom) continue;

    // for each file in the default language, get their checksum as a record
    const defaultLangChecksums: Record<string, string> = {};
    const defaultLangFiles = contentFiles[langData.translateFrom] ?? [];
    for (const file of defaultLangFiles) {
      const checksum = await computeChecksum(path.join(contentDir, file));
      defaultLangChecksums[file] = checksum;
    }

    // check if the existing files have the same checksum as the default language using hasChecksumLine, if not, push to missingFiles
    const existingFiles = contentFiles[langCode] ?? [];
    for (const file of existingFiles) {
      const defaultLangFile = file.replace(`/${langCode}/`, `/${langData.translateFrom}/`);
      const checksum = defaultLangChecksums[defaultLangFile];
      const isOutdated = !(await hasChecksumLine(path.join(contentDir, file), checksum));

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
