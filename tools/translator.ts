import { llmCall, type LlmMessage, model, userMessage } from "./llm.ts";

const systemMessage = (language: string): LlmMessage => ({
  role: "system",
  content: `You are an expert MDX content translator API. You translate all content including frontmatter values directly to ${language}, adding "translatedBy: ${model}" after pubDate and translate lang path for internal links, but keeping variable names and external links intact.`,
});

/**
 * Calls the OpenAI-compatible API to translate a text
 * @param targetLanguage target language
 * @param content content to translate
 * @returns translated text
 */
export async function translate(targetLanguage: string, content: string) {
  const stream = await llmCall({
    messages: [systemMessage(targetLanguage), userMessage(content)],
    temperature: 0,
  });

  return stream;
}
