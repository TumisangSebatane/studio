'use server';

import { instantLegalQA } from '@/ai/flows/instant-legal-qa';
import type { InstantLegalQAInput, InstantLegalQAOutput } from '@/ai/flows/instant-legal-qa';
import { z } from 'zod';

const inputSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters long."),
});

export async function instantLegalQAServer(input: InstantLegalQAInput): Promise<InstantLegalQAOutput> {
  const validatedInput = inputSchema.safeParse(input);

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
