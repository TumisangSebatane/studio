import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { Settings } from '@/components/settings/settings';

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <Settings />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
