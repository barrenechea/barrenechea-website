import { promises as fsp } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { findMissingFiles } from "./contentFinder.ts";
import { translate } from "./translator.ts";

// Derive the directory name from the current file's URL
const __dirname = path.dirname(fileURLToPath(`${import.meta.url}/../`));
const contentDir = path.join(__dirname, "src", "content");

const missingFiles = await findMissingFiles();

if (missingFiles.length === 0) {
  console.log("No files to translate!");
  process.exit(0);
}

console.log(`Files to translate: ${missingFiles.length}`);
for (const file of missingFiles) {
  console.log(`Translating ${file.origin} into ${file.targetLanguage}...`);
  const fileContent = await fsp.readFile(path.join(contentDir, file.origin), {
    encoding: "utf8",
  });

  const stream = await translate(file.targetLanguage, fileContent);
  console.log(` - Received stream for ${file.target}`);
  console.log(` - Writing to ${file.target}...`);
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
  console.log(" - Done!");
}
