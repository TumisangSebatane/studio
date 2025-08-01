
import { DocumentExplorer } from '@/components/documents/document-explorer';

export default function LawReportsPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
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
