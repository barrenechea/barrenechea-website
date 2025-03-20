import OpenAI from 'openai';

export interface LlmMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface LlmPayload {
  messages: LlmMessage[];
  temperature: number;
}

export const model = process.env.LLM_MODEL ?? 'o3-mini';

// requires to have OPENAI_API_KEY set in env
// optionally, OPENAI_BASE_URL can be set to point to a different API endpoint
const openai = new OpenAI();

/**
 * Sets up a user message
 * @param text message text
 * @returns user message object
 */
export const userMessage = (text: string): LlmMessage => ({
  role: 'user',
  content: text,
});

/**
 * Calls the OpenAI-compatible Completions API
 * @param data request data
 * @returns response stream
 */
export const llmCall = async (data: LlmPayload) => {
  const stream = await openai.chat.completions.create({
    ...data,
    model,
    stream: true,
  });

  return stream;
};
