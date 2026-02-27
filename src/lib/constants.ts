import type { Document } from './types';

/**
 * MOCK_DOCUMENTS serves as the immediate source for the prototype.
 * To add new source documents, simply add a new object to this array.
 * Ensure it matches the 'Document' type in src/lib/types.ts.
 */
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'act-1',
    title: 'Data Protection Act, 2018',
    category: 'Statute',
    date: '2018-08-03',
    summary: 'An Act to regulate the protection of personal data and to provide for the establishment of the Information and Data Protection Commission.',
    content: `
      <p class="mb-4">This is the full text of the Data Protection Act, 2018. It is a landmark piece of legislation for Botswana, aligning the country with international data privacy standards.</p>
      <h3 class="font-headline text-lg mt-6 mb-2 text-primary">Part II - Information and Data Protection Commission</h3>
      <p class="mb-4">This section establishes the Information and Data Protection Commission, outlining its functions, powers, and governance structure.</p>
    `,
    actNumber: '24 of 2018',
    sectionNumber: 'Part II',
    jurisdiction: 'Botswana',
    version: '1.0',
    relatedCases: [
      { id: 'case-1', title: 'Attorney General v. Dow (1992) BLR 119' }
    ]
  },
  {
    id: 'case-1',
    title: 'Attorney General v. Dow (1992) BLR 119',
    category: 'Case Law',
    date: '1992-06-21',
    court: 'Court of Appeal',
    judges: ['Amissah, J.P.', 'Aguda, J.A.', 'Bizos, J.A.'],
    caseNumber: 'Civ. App. No. 4/91',
    summary: 'A landmark Court of Appeal case that dealt with citizenship and gender discrimination under the Constitution of Botswana.',
    jurisdiction: 'Botswana',
    version: 'Official',
    headnotes: `
      <p class="mb-2"><b>Constitutional Law</b> – Citizenship – Discrimination – Whether section 4 of the Citizenship Act which denies citizenship to children of female citizens married to non-citizens is discriminatory.</p>
    `,
    content: `
      <p class="mb-4">This case is a cornerstone of Botswana constitutional law. Unity Dow challenged the constitutionality of the Citizenship Act.</p>
      <p class="mb-4">The Court of Appeal held that the relevant sections were discriminatory.</p>
    `,
    relatedStatutes: [
        { id: 'act-1', title: 'Data Protection Act, 2018' }
    ]
  },
  {
    id: 'commentary-1',
    title: 'The Law of Contract in Botswana',
    category: 'Commentary',
    author: 'Dr. C. M. Fombad',
    date: '2020-01-15',
    summary: 'An academic analysis of the principles of contract law as they apply within the legal framework of Botswana.',
    jurisdiction: 'Botswana',
    version: '2nd Edition',
    content: `
      <p class="mb-4">This commentary provides a comprehensive overview of contract law in Botswana.</p>
    `,
  },
];
