'use client';

import { Scale, Search, Sparkles, BookCopy, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AppHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Scale className="h-6 w-6 text-primary" />
            <h1 className="ml-2 font-headline text-xl font-bold text-primary">
              LexiBotswana
            </h1>
          </Link>
        </div>
        <div className="flex flex-1 max-w-lg items-center gap-2">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="w-full pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <nav className="hidden items-center gap-1 md:flex">
           <Button asChild variant="ghost" size="sm">
            <Link href="/law-reports">
              <BookCopy className="mr-2 h-4 w-4" />
              Law Reports
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/q-and-a">
              <Sparkles className="mr-2 h-4 w-4" />
              Legal Tools
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/profile">
                <Settings className="mr-2 h-4 w-4" />
                Profile
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
