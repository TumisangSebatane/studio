import type { Document } from './types';

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
      <p class="mb-4">This section establishes the Information and Data Protection Commission, outlining its functions, powers, and governance structure. The Commission is an independent body responsible for enforcing the Act.</p>
    `,
    actNumber: '24 of 2018',
    sectionNumber: 'Part II',
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
    headnotes: `
      <p class="mb-2"><b>Constitutional Law</b> – Citizenship – Discrimination – Whether section 4 of the Citizenship Act which denies citizenship to children of female citizens married to non-citizens is discriminatory.</p>
      <p><b>Statutory Interpretation</b> – Constitution – Purposive approach – Interpretation of fundamental rights provisions.</p>
    `,
    content: `
      <p class="mb-4">This case is a cornerstone of Botswana constitutional law. Unity Dow, a citizen of Botswana, challenged the constitutionality of the Citizenship Act, which prevented her from passing her citizenship to her children because their father was a non-citizen.</p>
      <p class="mb-4">The Court of Appeal held that the relevant sections of the Citizenship Act were discriminatory on the basis of sex and therefore violated the Constitution. The decision had profound implications for gender equality in Botswana.</p>
      <h3 class="font-headline text-lg mt-6 mb-2 text-primary">Judgment</h3>
      <p class="mb-4">For the foregoing reasons, the appeal is dismissed. The declaration made by the High Court is confirmed. The respondent is entitled to her costs in this court and in the court below.</p>
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
    summary: 'An academic analysis of the principles of contract law as they apply within the legal framework of Botswana, referencing both common law and local statutes.',
    content: `
      <p class="mb-4">This commentary provides a comprehensive overview of contract law in Botswana. It traces the development from Roman-Dutch law and English common law, highlighting unique adaptations within the Botswana legal system.</p>
      <h3 class="font-headline text-lg mt-6 mb-2 text-primary">Formation of a Contract</h3>
      <p class="mb-4">Discusses the essential elements for a valid contract: offer, acceptance, consideration, intention to create legal relations, and capacity of the parties. See also <a href="/documents/case-1">Attorney General v. Dow</a> for constitutional context.</p>
    `,
  },
];
