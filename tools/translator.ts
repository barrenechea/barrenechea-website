import crypto from "crypto";

import { llmCall, type LlmMessage, model, userMessage } from "./llm.ts";

const systemMessage = (language: string, shaSum: string): LlmMessage => ({
  role: "system",
  content: `You are an expert MDX content translator API. You translate all content including frontmatter values directly to ${language}, adding "translatedBy: ${model}" and "originSha: ${shaSum}" after pubDate and translate lang path for internal links, but keeping variable names and external links intact.`,
});

/**
 * Calls the OpenAI-compatible API to translate a text
 * @param targetLanguage target language
 * @param content content to translate
 * @returns translated text
 */
export async function translate(targetLanguage: string, content: Buffer) {
  const hashSum = crypto.createHash("sha256");
  hashSum.update(content);
  const hex = hashSum.digest("hex");

  const stream = await llmCall({
    messages: [
      systemMessage(targetLanguage, hex),
      userMessage(content.toString("utf8")),
    ],
    temperature: 0,
  });

  return stream;
}
