import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { DocumentList } from '@/components/documents/document-list';
import { MOCK_DOCUMENTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RecentlyViewedPage() {
  // In a real app, this would be based on user history.
  const recentlyViewedDocs = MOCK_DOCUMENTS.slice(0, 2);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Button asChild variant="ghost">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
            </div>
            <div className="mb-6">
                <h2 className="font-headline text-3xl font-bold text-primary">
                    Recently Viewed Items
                </h2>
                <p className="text-muted-foreground">
                    Documents you have accessed recently.
                </p>
            </div>
            <DocumentList documents={recentlyViewedDocs} onSelectDocument={() => {}} />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
