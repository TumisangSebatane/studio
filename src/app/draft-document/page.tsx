import { DocumentDrafter } from '@/components/drafting/document-drafter';

export default function DraftDocumentPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <DocumentDrafter />
      </div>
    </main>
  );
}
