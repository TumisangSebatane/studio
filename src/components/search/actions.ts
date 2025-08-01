'use server';

import { legalSearch, type LegalSearchInput, type LegalSearchOutput } from '@/ai/flows/legal-search-flow';

export type LegalSearchResult = LegalSearchOutput['results'];

export async function searchLegalCorpus(input: LegalSearchInput): Promise<LegalSearchResult> {
  try {
    const output = await legalSearch(input);
    return output.results;
  } catch (error) {
    console.error("Error in searchLegalCorpus:", error);
    // In a real app, you'd want more robust error handling.
    // For now, we return an empty array to avoid crashing the client.
    return [];
  }
}
