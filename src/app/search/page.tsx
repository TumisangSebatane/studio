import { SearchComponent } from '@/components/search/search';
import { Suspense } from 'react';

export default function SearchPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchComponent />
        </Suspense>
      </div>
    </main>
  );
}
