import { Scale } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container mx-auto flex h-14 items-center px-4 sm:h-16">
        <div className="mr-4 flex items-center">
          <Scale className="h-6 w-6 text-primary" />
          <h1 className="ml-2 font-headline text-xl font-bold text-primary">
            LexiBotswana
          </h1>
        </div>
      </div>
    </header>
  );
}
