
import { DocumentExplorer } from '@/components/documents/document-explorer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LawReportsPage() {
  return (
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
                  Law Reports
              </h2>
              <p className="text-muted-foreground">
                  Browse and search Botswana Law Reports and related materials.
              </p>
          </div>
          <DocumentExplorer isLawReports={true} />
      </div>
    </main>
  );
}
