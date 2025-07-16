'use server';

import { instantLegalQA, type InstantLegalQAInput, type InstantLegalQAOutput } from '@/ai/flows/instant-legal-qa';
import { assessCase, type CaseAssessmentInput, type CaseAssessmentOutput } from '@/ai/flows/case-assessment-flow';
import { z } from 'zod';

const instantLegalQAInputSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters long."),
});

const caseAssessmentInputSchema = z.object({
  caseDocumentUri: z.string().min(1, "Please upload a document."),
  userPrompt: z.string().min(10, "Prompt must be at least 10 characters long."),
});

export async function instantLegalQAServer(input: InstantLegalQAInput): Promise<InstantLegalQAOutput> {
  const validatedInput = instantLegalQAInputSchema.safeParse(input);

  if (!validatedInput.success) {
    throw new Error(validatedInput.error.errors.map(e => e.message).join(', '));
  }

  try {
    const output = await instantLegalQA(validatedInput.data);
    return output;
  } catch (error) {
    console.error("Error in instantLegalQAServer:", error);
    throw new Error("Failed to get an answer from the AI. The model may be offline or overloaded.");
  }
}

export async function caseAssessmentServer(input: CaseAssessmentInput): Promise<CaseAssessmentOutput> {
  const validatedInput = caseAssessmentInputSchema.safeParse(input);
  
  if (!validatedInput.success) {
    throw new Error(validatedInput.error.errors.map(e => e.message).join(', '));
  }

  try {
    const output = await assessCase(validatedInput.data);
    return output;
  } catch (error) {
    console.error("Error in caseAssessmentServer:", error);
    throw new Error("Failed to get an assessment from the AI. The model may be offline or overloaded.");
  }
}
