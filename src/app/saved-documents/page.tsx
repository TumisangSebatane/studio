import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { DocumentExplorer } from '@/components/documents/document-explorer';

export default function SavedDocumentsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h2 className="font-headline text-3xl font-bold text-primary">
                    My Saved Documents
                </h2>
                <p className="text-muted-foreground">
                    All your bookmarked statutes, case law, and commentaries.
                </p>
            </div>
            <DocumentExplorer />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
