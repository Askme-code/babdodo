'use server';
/**
 * @fileOverview A chatbot flow for Babdodo Tours & Safaris.
 *
 * - chat - A function that handles chatbot conversations.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message to the chatbot."),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string()
    })),
  })).optional().describe('The conversation history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The chatbot's response to the user."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: z.object({ response: z.string() })},
  system: `You are a friendly and helpful customer support chatbot for Babdodo Tours & Safaris, a tour company based in Zanzibar, Tanzania. Your goal is to answer user questions, provide information about tours and safaris, and help them plan their trip.

- Your name is Dodo, the friendly guide.
- Be polite, enthusiastic, and welcoming.
- You can provide information on Zanzibar Tours, Tanzania Safaris, and Airport Transfers.
- If you don't know an answer, politely say so and suggest they contact the company directly at babdodotoursandsafari@gmail.com or via WhatsApp.
- Keep responses concise and easy to read.
- You can ask clarifying questions to better understand the user's needs.`,
  prompt: `New user message: {{{message}}}`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const history = input.history || [];
    const {output} = await prompt(input, {
        history: history
    });
    return { response: output!.response };
  }
);
