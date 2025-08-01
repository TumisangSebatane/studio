'use server';

/**
 * @fileOverview Implements a legal search feature using Genkit.
 * This flow emulates a sophisticated search pipeline including keyword and semantic search,
 * re-ranking, and AI-powered summarization with type-specific outputs.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { MOCK_DOCUMENTS } from '@/lib/constants';

// --- Input Schema ---
const LegalSearchInputSchema = z.object({
  query: z.string().describe('The user\'s search query.'),
  filters: z.object({
    court: z.string().optional(),
    year: z.number().optional(),
    judge: z.string().optional(),
  }).describe('Optional filters for the search.'),
  mode: z.enum(['verbatim', 'codified']).default('verbatim').describe('The search mode.'),
});
export type LegalSearchInput = z.infer<typeof LegalSearchInputSchema>;


// --- Output Schemas ---
const VerbatimResultSchema = z.object({
  id: z.string(),
  type: z.literal('verbatim'),
  title: z.string(),
  fullText: z.string().optional(),
  headnotes: z.string().optional(),
  citation: z.string(),
  score: z.number(),
});

const CaseResultSchema = z.object({
    id: z.string(),
    type: z.literal('case'),
    title: z.string(),
    citation: z.string(),
    court: z.string().optional(),
    judges: z.array(z.string()).optional(),
    date: z.string(),
    verdict: z.string().describe("The final verdict or outcome of the case."),
    keyPrinciples: z.array(z.string()).describe("A list of the key legal principles discussed."),
    summary: z.string().describe("A concise summary of the case."),
    fullTextLink: z.string(),
    score: z.number(),
});

const StatuteResultSchema = z.object({
    id: z.string(),
    type: z.literal('statute'),
    title: z.string(),
    sectionNumber: z.string().optional(),
    summary: z.string().describe("A summary of the specific statute section."),
    relatedCases: z.array(z.object({ id: z.string(), title: z.string() })).describe("Cases that interpret or apply this statute."),
    fullTextLink: z.string(),
    score: z.number(),
});

const CommentaryResultSchema = z.object({
    id: z.string(),
    type: z.literal('commentary'),
    title: z.string(),
    author: z.string().optional(),
    summary: z.string().describe("A summary of the commentary."),
    linkedReferences: z.array(z.object({ id: z.string(), title: z.string() })).describe("Statutes or cases referenced in the text."),
    fullTextLink: z.string(),
    score: z.number(),
});

const LegalSearchOutputSchema = z.object({
  results: z.array(z.union([VerbatimResultSchema, CaseResultSchema, StatuteResultSchema, CommentaryResultSchema])),
});
export type LegalSearchOutput = z.infer<typeof LegalSearchOutputSchema>;


// --- AI Prompts for different document types ---

const caseAnalysisPrompt = ai.definePrompt({
  name: 'caseAnalysisPrompt',
  input: { schema: z.object({ documentContent: z.string() }) },
  output: {
    schema: z.object({
      summary: z.string().describe("A concise summary of the case."),
      keyPrinciples: z.array(z.string()).describe("A list of the key legal principles discussed."),
      verdict: z.string().describe("The final verdict or outcome of the case."),
    }),
  },
  prompt: `You are a legal analyst. From the case document below, extract the final verdict, summarize the case, and list the key legal principles.
Document:
{{{documentContent}}}
`,
});

const statuteAnalysisPrompt = ai.definePrompt({
  name: 'statuteAnalysisPrompt',
  input: { schema: z.object({ documentContent: z.string() }) },
  output: {
    schema: z.object({
      summary: z.string().describe("A summary of this section of the statute."),
    }),
  },
  prompt: `You are a legal analyst. Summarize the following section of the statute.
Document:
{{{documentContent}}}
`,
});

const commentaryAnalysisPrompt = ai.definePrompt({
  name: 'commentaryAnalysisPrompt',
  input: { schema: z.object({ documentContent: z.string() }) },
  output: {
    schema: z.object({
      summary: z.string().describe("A summary of this legal commentary."),
    }),
  },
  prompt: `You are a legal analyst. Summarize the following legal commentary.
Document:
{{{documentContent}}}
`,
});

// --- Main Flow ---

export async function legalSearch(input: LegalSearchInput): Promise<LegalSearchOutput> {
  return legalSearchFlow(input);
}

const legalSearchFlow = ai.defineFlow(
  {
    name: 'legalSearchFlow',
    inputSchema: LegalSearchInputSchema,
    outputSchema: LegalSearchOutputSchema,
  },
  async (input) => {
    // --- Step 1 & 2: Preprocessing & Retrieval (Simulated) ---
    const normalizedQuery = input.query.toLowerCase();
    const retrievedDocs = MOCK_DOCUMENTS.filter(doc =>
      doc.title.toLowerCase().includes(normalizedQuery) ||
      doc.content.toLowerCase().includes(normalizedQuery) ||
      doc.summary.toLowerCase().includes(normalizedQuery)
    ).slice(0, 10);

    // --- Step 3: Scoring & Ranking (Simulated) ---
    const rankedDocs = retrievedDocs.map((doc, index) => ({
      ...doc,
      score: 1 - (index / retrievedDocs.length),
    }));

    // --- Step 4: Generate Output ---
    if (input.mode === 'verbatim') {
      const results = rankedDocs.map(doc => ({
        id: doc.id,
        type: 'verbatim' as const,
        title: doc.title,
        fullText: doc.content,
        headnotes: doc.headnotes,
        citation: doc.caseNumber || doc.actNumber || doc.author || `(${doc.date})`,
        score: doc.score,
      }));
      return { results };
    }

    if (input.mode === 'codified') {
      const aiTasks = rankedDocs.map(async (doc) => {
        const baseResult = {
            id: doc.id,
            fullTextLink: `/documents/${doc.id}`,
            score: doc.score,
            title: doc.title,
        };

        switch (doc.category) {
          case 'Case Law': {
            const { output } = await caseAnalysisPrompt({ documentContent: doc.content });
            return {
              ...baseResult,
              type: 'case' as const,
              citation: `${doc.caseNumber || doc.title} (${doc.date})`,
              court: doc.court,
              judges: doc.judges,
              date: doc.date,
              verdict: output?.verdict || "Not found.",
              keyPrinciples: output?.keyPrinciples || [],
              summary: output?.summary || "AI summary could not be generated.",
            };
          }
          case 'Statute': {
            const { output } = await statuteAnalysisPrompt({ documentContent: doc.content });
            return {
              ...baseResult,
              type: 'statute' as const,
              sectionNumber: doc.sectionNumber,
              summary: output?.summary || "AI summary could not be generated.",
              // In a real app, this would be a separate lookup.
              relatedCases: doc.relatedCases || [], 
            };
          }
          case 'Commentary': {
            const { output } = await commentaryAnalysisPrompt({ documentContent: doc.content });
            return {
              ...baseResult,
              type: 'commentary' as const,
              author: doc.author,
              summary: output?.summary || "AI summary could not be generated.",
              // In a real app, this would be extracted from the text.
              linkedReferences: [...(doc.relatedCases || []), ...(doc.relatedStatutes || [])], 
            };
          }
          default:
            // Fallback for unknown types
            return null;
        }
      });

      const results = (await Promise.all(aiTasks)).filter(r => r !== null);
      // @ts-ignore
      return { results };
    }

    return { results: [] };
  }
);
