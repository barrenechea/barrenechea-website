import { promises as fsp } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  computeSha256,
  findMissingFiles,
  findOutdatedFiles,
  type MissingFile,
} from "./contentFinder.ts";
import { model } from "./llm.ts";
import { translate } from "./translator.ts";
// Derive the directory name from the current file's URL
const __dirname = path.dirname(fileURLToPath(`${import.meta.url}/../`));
const contentDir = path.join(__dirname, "src", "content");

async function translateFile(file: MissingFile) {
  console.log(`Translating ${file.origin} into ${file.targetLanguage}...`);
  const fileContent = await fsp.readFile(path.join(contentDir, file.origin));
  const stream = await translate(file.targetLanguage, fileContent);
  console.log(` - Streaming response to ${file.target}...`);
  const targetPath = path.join(
    contentDir,
    file.target.split("/").slice(0, -1).join("/")
  );
  await fsp.mkdir(targetPath, { recursive: true });
  for await (const part of stream) {
    await fsp.appendFile(
      path.join(contentDir, file.target),
      part.choices[0]?.delta?.content ?? ""
    );
  }
}

async function cleanUpFile(file: MissingFile) {
  const translatedFile = await fsp.readFile(
    path.join(contentDir, file.target),
    { encoding: "utf8" }
  );
  const lines = translatedFile.split("\n");
  lines[0] = lines[0].trimStart();
  if (lines[lines.length - 1] !== "") {
    lines.push("");
  }

  // get sha sum of the original file
  const hashSum = await computeSha256(path.join(contentDir, file.origin));

  // find location of the second `---` and insert translatedBy: ${model} and originSha: ${shaSum} before it
  const secondSeparator = lines.indexOf("---", 3);
  lines.splice(
    secondSeparator,
    0,
    `translatedBy: ${model}`,
    `originSha: ${hashSum}`
  );

  await fsp.writeFile(path.join(contentDir, file.target), lines.join("\n"));
  console.log(" - Finished file!");
}

async function removeFile(file: MissingFile) {
  console.log(`Removing ${file.target}...`);
  await fsp.rm(path.join(contentDir, file.target));
}

async function processMissingFiles() {
  const missingFiles = await findMissingFiles();
  console.log(`Missing files: ${missingFiles.length}`);
  for (const file of missingFiles) {
    await translateFile(file);
    await cleanUpFile(file);
  }
}

async function processOutdatedFiles() {
  const outdatedFiles = await findOutdatedFiles();
  console.log(`Outdated files: ${outdatedFiles.length}`);
  for (const file of outdatedFiles) {
    await removeFile(file);
    await translateFile(file);
    await cleanUpFile(file);
  }
}

async function main() {
  await processMissingFiles();
  await processOutdatedFiles();
  console.log("All done!");
}

main().catch((error) => {
  console.error("Error:", error);
});
