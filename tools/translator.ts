import { llmCall, type LlmMessage, userMessage } from './llm.ts';

const systemMessage = (language: string): LlmMessage => ({
  role: 'user',
  content: `You are an expert MDX content translator API. You translate all content including frontmatter values directly to ${language}. Translate lang path for links, but keep variable names intact. It is very important for the frontmatter keys to remain the same, as the values for the "tags" field on projects.`,
});

/**
 * Calls the OpenAI-compatible API to translate a text
 * @param targetLanguage target language
 * @param content content to translate
 * @returns translated text
 */
export async function translate(targetLanguage: string, content: Buffer) {
  const stream = await llmCall({
    messages: [systemMessage(targetLanguage), userMessage(content.toString('utf8'))],
    temperature: 1,
  });

  return stream;
}
