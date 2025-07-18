'use server';

import { draftDocument, type DocumentDraftInput, type DocumentDraftOutput } from '@/ai/flows/document-draft-flow';
import { z } from 'zod';

const documentDraftInputSchema = z.object({
  documentType: z.string().min(1, "Please select a document type."),
  userPrompt: z.string().min(10, "Prompt must be at least 10 characters long."),
});

export async function draftDocumentServer(input: DocumentDraftInput): Promise<DocumentDraftOutput> {
  const validatedInput = documentDraftInputSchema.safeParse(input);

  if (!validatedInput.success) {
    throw new Error(validatedInput.error.errors.map(e => e.message).join(', '));
  }

  try {
    const output = await draftDocument(validatedInput.data);
    return output;
  } catch (error) {
    console.error("Error in draftDocumentServer:", error);
    throw new Error("Failed to get a draft from the AI. The model may be offline or overloaded.");
  }
}
