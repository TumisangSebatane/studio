import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { DocumentDrafter } from '@/components/drafting/document-drafter';

export default function DraftDocumentPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <DocumentDrafter />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
