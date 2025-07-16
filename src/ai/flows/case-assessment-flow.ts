// This file is machine-generated - edit at your own risk!

'use word';

/**
 * @fileOverview Implements a case assessment feature using Genkit.
 *
 * - assessCase - A function that processes a case document and returns an analysis.
 * - CaseAssessmentInput - The input type for the assessCase function.
 * - CaseAssessmentOutput - The return type for the assessCase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CaseAssessmentInputSchema = z.object({
  caseDocumentUri: z
    .string()
    .describe(
      "A case document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userPrompt: z.string().describe('The user prompt for the case assessment.'),
});
export type CaseAssessmentInput = z.infer<typeof CaseAssessmentInputSchema>;

const CaseAssessmentOutputSchema = z.object({
  assessment: z.string().describe('The detailed assessment of the case document.'),
});
export type CaseAssessmentOutput = z.infer<typeof CaseAssessmentOutputSchema>;

export async function assessCase(input: CaseAssessmentInput): Promise<CaseAssessmentOutput> {
  return caseAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'caseAssessmentPrompt',
  input: {schema: CaseAssessmentInputSchema},
  output: {schema: CaseAssessmentOutputSchema},
  prompt: `You are a legal expert specialized in analyzing case documents under Botswana law.

  Analyze the following document and provide a detailed assessment based on the user's prompt.
  
  User Prompt: {{userPrompt}}
  
  Document:
  {{media url=caseDocumentUri}}`,
});

const caseAssessmentFlow = ai.defineFlow(
  {
    name: 'caseAssessmentFlow',
    inputSchema: CaseAssessmentInputSchema,
    outputSchema: CaseAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
