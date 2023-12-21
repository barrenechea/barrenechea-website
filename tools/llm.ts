import OpenAI from "openai";

export interface LlmMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface LlmPayload {
  messages: LlmMessage[];
  temperature: number;
}

const openai = new OpenAI();

/**
 * Sets up a user message
 * @param text message text
 * @returns user message object
 */
export const userMessage = (text: string): LlmMessage => ({
  role: "user",
  content: text,
});

/**
 * Calls the OpenAI Completions API
 * @param data request data
 * @returns response stream
 */
export const llmCall = async (data: LlmPayload) => {
  const stream = await openai.chat.completions.create({
    ...data,
    model: "gpt-4-1106-preview",
    stream: true,
  });

  return stream;
};
