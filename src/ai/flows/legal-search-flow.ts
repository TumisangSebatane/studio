'use server';

/**
 * @fileOverview Implements a legal search feature using Genkit.
 * This flow emulates a sophisticated search pipeline including keyword and semantic search,
 * re-ranking, and AI-powered summarization.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { MOCK_DOCUMENTS } from '@/lib/constants';

// Define schemas based on the user's Python spec
const LegalSearchInputSchema = z.object({
  query: z.string().describe('The user\'s search query.'),
  filters: z.object({
    court: z.string().optional(),
    year: z.number().optional(),
    judge: z.string().optional(),
  }).describe('Optional filters for the search.'),
  mode: z.enum(['verbatim', 'ai_assisted']).default('verbatim').describe('The search mode.'),
});
export type LegalSearchInput = z.infer<typeof LegalSearchInputSchema>;

const VerbatimResultSchema = z.object({
  id: z.string(),
  mode: z.literal('verbatim'),
  title: z.string(),
  fullText: z.string().optional(),
  headnotes: z.string().optional(),
  citation: z.string(),
  score: z.number(),
});

const AIAssistedResultSchema = z.object({
  id: z.string(),
  mode: z.literal('ai_assisted'),
  title: z.string(),
  summary: z.string(),
  keyPrinciples: z.array(z.string()),
  fullTextLink: z.string(),
  citation: z.string(),
  score: z.number(),
});

const LegalSearchOutputSchema = z.object({
  results: z.array(z.union([VerbatimResultSchema, AIAssistedResultSchema])),
});
export type LegalSearchOutput = z.infer<typeof LegalSearchOutputSchema>;

// The main exported function that the client will call
export async function legalSearch(input: LegalSearchInput): Promise<LegalSearchOutput> {
  return legalSearchFlow(input);
}

// AI-assisted summarization and principle extraction prompt
const aiAssistedPrompt = ai.definePrompt({
  name: 'aiAssistedSearchPrompt',
  input: { schema: z.object({ documentContent: z.string() }) },
  output: {
    schema: z.object({
      summary: z.string().describe("A concise summary of the legal document."),
      keyPrinciples: z.array(z.string()).describe("A list of the key legal principles discussed in the document."),
    }),
  },
  prompt: `You are a legal analyst. Based on the following document text, provide a concise summary and extract the key legal principles.

Document:
{{{documentContent}}}
`,
});

// The main Genkit flow
const legalSearchFlow = ai.defineFlow(
  {
    name: 'legalSearchFlow',
    inputSchema: LegalSearchInputSchema,
    outputSchema: LegalSearchOutputSchema,
  },
  async (input) => {
    // --- Step 1 & 2: Preprocessing & Retrieval (Simulated) ---
    // In a real app, this is where you'd call Elasticsearch, Milvus, etc.
    // For now, we'll just filter our mock documents based on the query.
    const normalizedQuery = input.query.toLowerCase();
    const retrievedDocs = MOCK_DOCUMENTS.filter(doc =>
      doc.title.toLowerCase().includes(normalizedQuery) ||
      doc.content.toLowerCase().includes(normalizedQuery) ||
      doc.summary.toLowerCase().includes(normalizedQuery)
    ).slice(0, 10); // Limit to top 10 for this demo

    // --- Step 3: Scoring & Ranking (Simulated) ---
    // Simple scoring for demonstration purposes
    const rankedDocs = retrievedDocs.map((doc, index) => ({
      ...doc,
      score: 1 - (index / retrievedDocs.length), // Higher score for earlier items
    }));


    // --- Step 4: Generate Output ---
    if (input.mode === 'verbatim') {
      const results = rankedDocs.map(doc => ({
        id: doc.id,
        mode: 'verbatim' as const,
        title: doc.title,
        fullText: doc.content,
        headnotes: doc.headnotes,
        citation: `${doc.caseNumber || doc.category} (${doc.date})`,
        score: doc.score,
      }));
      return { results };
    }

    if (input.mode === 'ai_assisted') {
      const aiTasks = rankedDocs.map(async (doc) => {
        const { output } = await aiAssistedPrompt({ documentContent: doc.content });
        return {
          id: doc.id,
          mode: 'ai_assisted' as const,
          title: doc.title,
          summary: output?.summary || 'AI summary could not be generated.',
          keyPrinciples: output?.keyPrinciples || [],
          fullTextLink: `/documents/${doc.id}`, // Example link
          citation: `${doc.caseNumber || doc.category} (${doc.date})`,
          score: doc.score,
        };
      });

      const results = await Promise.all(aiTasks);
      return { results };
    }

    // Default empty response
    return { results: [] };
  }
);
