'use server';

/**
 * @fileOverview AI-powered content recommendation flow.
 *
 * - recommendContent - A function that suggests related blog posts or other tour options based on user's current selection or browsing history.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  currentContent: z.string().describe('The title of the content currently being viewed.'),
  browsingHistory: z.array(z.string()).optional().describe('A list of titles of content previously viewed by the user.'),
  contentType: z.enum(['tour', 'safari', 'transfer', 'post']).describe('The type of content for which to generate recommendations.'),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended content titles related to the current content.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(input: RecommendContentInput): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are an expert recommendation system for Babdodo Tours & Safaris.

  Based on the content the user is currently viewing and their past browsing history, recommend other relevant content.
  Consider the type of content (tour, safari, transfer, or post) when making recommendations.
  Respond with a list of content titles. DO NOT include descriptions or any other information beyond the title.

Current Content: {{{currentContent}}}
Content Type: {{{contentType}}}

{{#if browsingHistory}}
Browsing History:
{{#each browsingHistory}}- {{{this}}}\n{{/each}}
{{/if}}

Recommendations:`,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
