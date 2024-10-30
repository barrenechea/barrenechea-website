import { promises as fsp } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { languages } from '../src/i18n/translations.ts';
import {
  computeChecksum,
  findMissingFiles,
  findOutdatedFiles,
  type MissingFile,
} from './contentFinder.ts';
import { model } from './llm.ts';
import { translate } from './translator.ts';

// Derive the directory name from the current file's URL
const dirname = path.dirname(fileURLToPath(`${import.meta.url}/../`));
const contentDir = path.join(dirname, 'src', 'content');

/**
 * Helper function to translate a file
 * @param file file to translate
 * @returns void
 */
async function translateFile(file: MissingFile) {
  console.log(`Translating ${file.origin} into ${file.targetLanguage}...`);
  const fileContent = await fsp.readFile(path.join(contentDir, file.origin));
  const stream = await translate(file.targetLanguage, fileContent);
  console.log(` - Streaming response to ${file.target}...`);
  const targetPath = path.join(contentDir, file.target.split('/').slice(0, -1).join('/'));
  await fsp.mkdir(targetPath, { recursive: true });
  for await (const part of stream) {
    await fsp.appendFile(path.join(contentDir, file.target), part.choices[0]?.delta?.content ?? '');
  }
}

/**
 * Helper function to clean up a file after translation (useful for Llama-based LLMs).
 * Also adds the translatedBy and checksum lines.
 * @param file file to clean up
 * @returns void
 */
async function cleanUpFile(file: MissingFile) {
  const translatedFile = await fsp.readFile(path.join(contentDir, file.target), {
    encoding: 'utf8',
  });
  const lines = translatedFile.split('\n');
  lines[0] = lines[0].trimStart();
  if (lines[lines.length - 1] !== '') {
    lines.push('');
  }

  // if there is a line containing `translatedBy:`, remove it
  const translatedByIndex = lines.findIndex((line) => line.startsWith('translatedBy: '));
  if (translatedByIndex !== -1) {
    lines.splice(translatedByIndex, 1);
  }

  // if there is a line containing `checksum:`, remove it
  const checksumIndex = lines.findIndex((line) => line.startsWith('checksum: '));
  if (checksumIndex !== -1) {
    lines.splice(checksumIndex, 1);
  }

  const checksum = await computeChecksum(path.join(contentDir, file.origin));

  // find location of the second `---` and insert translatedBy: ${model} and checksum: ${checksum} before it
  const secondSeparator = lines.indexOf('---', 3);
  lines.splice(secondSeparator, 0, `translatedBy: ${model}`, `checksum: ${checksum}`);

  await fsp.writeFile(path.join(contentDir, file.target), lines.join('\n'));
  console.log(' - Finished file!');
}

/**
 * Helper function to remove a file
 * @param file file to remove
 * @returns void
 */
async function removeFile(file: MissingFile) {
  console.log(`Removing ${file.target}...`);
  await fsp.rm(path.join(contentDir, file.target));
}

async function processMissingFiles(targetLanguage?: string) {
  const files = await findMissingFiles();
  const missingFiles = targetLanguage
    ? files.filter((file) => file.targetLanguage === targetLanguage)
    : files;
  console.log(`Missing files: ${missingFiles.length.toString()}`);
  for (const file of missingFiles) {
    await translateFile(file);
    await cleanUpFile(file);
  }
}

async function processOutdatedFiles(targetLanguage?: string) {
  const files = await findOutdatedFiles();
  const outdatedFiles = targetLanguage
    ? files.filter((file) => file.targetLanguage === targetLanguage)
    : files;
  console.log(`Outdated files: ${outdatedFiles.length.toString()}`);
  for (const file of outdatedFiles) {
    await removeFile(file);
    await translateFile(file);
    await cleanUpFile(file);
  }
}

async function main() {
  // read targetLanguage from command line arguments
  const targetLanguage = process.argv[2];
  if (targetLanguage && !Object.keys(languages).includes(targetLanguage)) {
    throw new Error(`Invalid target language: ${targetLanguage}`);
  }

  await processMissingFiles(targetLanguage);
  await processOutdatedFiles(targetLanguage);
  console.log('All done!');
}

void main();
