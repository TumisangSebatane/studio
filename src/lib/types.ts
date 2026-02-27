export type Document = {
  id: string;
  title: string;
  category: 'Statute' | 'Case Law' | 'Commentary';
  date: string;
  summary: string;
  content: string; 
  jurisdiction?: string;
  version?: string;
  
  // Fields specific to Case Law
  court?: string;
  judge?: string;
  judges?: string[];
  caseNumber?: string;
  headnotes?: string;
  
  // Fields specific to Statutes
  actNumber?: string;
  sectionNumber?: string;

  // Fields specific to Commentary
  author?: string;

  // Fields for cross-referencing
  relatedStatutes?: { id: string, title: string }[];
  relatedCases?: { id: string, title: string }[];
};
