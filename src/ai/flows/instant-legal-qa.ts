// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Implements the Instant Legal Q&A feature using Genkit and Phi-3 Mini.
 *
 * - instantLegalQA - A function that processes legal questions and returns answers.
 * - InstantLegalQAInput - The input type for the instantLegalQA function.
 * - InstantLegalQAOutput - The return type for the instantLegalQA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InstantLegalQAInputSchema = z.object({
  question: z.string().describe('The legal question to be answered.'),
});
export type InstantLegalQAInput = z.infer<typeof InstantLegalQAInputSchema>;

const InstantLegalQAOutputSchema = z.object({
  answer: z.string().describe('The answer to the legal question.'),
});
export type InstantLegalQAOutput = z.infer<typeof InstantLegalQAOutputSchema>;

export async function instantLegalQA(input: InstantLegalQAInput): Promise<InstantLegalQAOutput> {
  return instantLegalQAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'instantLegalQAPrompt',
  input: {schema: InstantLegalQAInputSchema},
  output: {schema: InstantLegalQAOutputSchema},
  prompt: `You are a legal expert specialized in answering questions about Botswana law.

  Answer the following question:
  {{question}}`,
});

const instantLegalQAFlow = ai.defineFlow(
  {
    name: 'instantLegalQAFlow',
    inputSchema: InstantLegalQAInputSchema,
    outputSchema: InstantLegalQAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
