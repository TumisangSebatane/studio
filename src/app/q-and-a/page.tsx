import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { AITools } from '@/components/qa/q-and-a';

export default function AIToolsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <AITools />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
