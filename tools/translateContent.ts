import { promises as fsp } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { findMissingFiles, findOutdatedFiles } from "./contentFinder.ts";
import { translate } from "./translator.ts";

// Derive the directory name from the current file's URL
const __dirname = path.dirname(fileURLToPath(`${import.meta.url}/../`));
const contentDir = path.join(__dirname, "src", "content");

const missingFiles = await findMissingFiles();

console.log(`Missing files: ${missingFiles.length}`);
for (const file of missingFiles) {
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

  // Clear empty characters at the beginning of first line if any, and add a newline at the end if missing
  console.log(" - Cleaning up...");
  const fileContentAfter = await fsp.readFile(
    path.join(contentDir, file.target),
    { encoding: "utf8" }
  );
  const lines = fileContentAfter.split("\n");
  lines[0] = lines[0].trimStart();
  if (lines[lines.length - 1] !== "") {
    lines.push("");
  }
  await fsp.writeFile(path.join(contentDir, file.target), lines.join("\n"));

  console.log(" - Finished file!");
}

const outdatedFiles = await findOutdatedFiles();
console.log(`Outdated files: ${outdatedFiles.length}`);
for (const file of outdatedFiles) {
  console.log(`Re-translating ${file.origin} into ${file.targetLanguage}...`);
  const fileContent = await fsp.readFile(path.join(contentDir, file.origin));

  const stream = await translate(file.targetLanguage, fileContent);
  
  console.log(` - Removing ${file.target}...`);
  await fsp.rm(path.join(contentDir, file.target));

  console.log(` - Streaming response to ${file.target}...`);
  for await (const part of stream) {
    await fsp.appendFile(
      path.join(contentDir, file.target),
      part.choices[0]?.delta?.content ?? ""
    );
  }

  // Clear empty characters at the beginning of first line if any, and add a newline at the end if missing
  console.log(" - Cleaning up...");
  const fileContentAfter = await fsp.readFile(
    path.join(contentDir, file.target),
    { encoding: "utf8" }
  );
  const lines = fileContentAfter.split("\n");
  lines[0] = lines[0].trimStart();
  if (lines[lines.length - 1] !== "") {
    lines.push("");
  }
  await fsp.writeFile(path.join(contentDir, file.target), lines.join("\n"));

  console.log(" - Finished file!");
}

console.log("All done!");
