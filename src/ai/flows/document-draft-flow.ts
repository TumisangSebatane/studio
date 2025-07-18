'use server';

/**
 * @fileOverview Implements a document drafting feature using Genkit.
 *
 * - draftDocument - A function that generates a legal document draft.
 * - DocumentDraftInput - The input type for the draftDocument function.
 * - DocumentDraftOutput - The return type for the draftDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DocumentDraftInputSchema = z.object({
  documentType: z.string().describe("The type of legal document to draft (e.g., 'Non-Disclosure Agreement')."),
  userPrompt: z.string().describe('A prompt from the user containing key details, parties, and specific clauses to include.'),
});
export type DocumentDraftInput = z.infer<typeof DocumentDraftInputSchema>;

const DocumentDraftOutputSchema = z.object({
  draft: z.string().describe('The full text of the drafted legal document.'),
});
export type DocumentDraftOutput = z.infer<typeof DocumentDraftOutputSchema>;

export async function draftDocument(input: DocumentDraftInput): Promise<DocumentDraftOutput> {
  return documentDraftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'documentDraftPrompt',
  input: {schema: DocumentDraftInputSchema},
  output: {schema: DocumentDraftOutputSchema},
  prompt: `You are a legal assistant specializing in drafting documents under Botswana law.

Your task is to generate a first draft of a legal document based on the user's request. The document should be well-structured, professionally formatted, and include standard clauses appropriate for the document type, adapted for Botswana's legal context.

Incorporate all specific details provided by the user in their prompt.

Document Type: {{documentType}}
User-provided Details: {{userPrompt}}

Produce the full text of the document. Do not include any explanatory text before or after the document itself.`,
});

const documentDraftFlow = ai.defineFlow(
  {
    name: 'documentDraftFlow',
    inputSchema: DocumentDraftInputSchema,
    outputSchema: DocumentDraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
