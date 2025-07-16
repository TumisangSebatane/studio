'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, FileText } from 'lucide-react';
import { useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    setResults([]);
    // Mock search API call
    setTimeout(() => {
      setResults([
        { id: 1, title: 'Data Protection Act, 2018', snippet: `...provisions include the rights of data subjects, the obligations of data controllers, and the powers of the Data Protection Commission...` },
        { id: 2, title: 'Attorney General v. Dow (1992)', snippet: '...challenged the constitutionality of the Citizenship Act, which prevented her from passing her citizenship to her children...' },
      ]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary">Legal Corpus Search</h2>
        <p className="mt-2 text-muted-foreground">
          Use keyword or semantic search to find relevant statutes and case law.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
            <Input
              type="search"
              placeholder="e.g., 'gender discrimination' or 'Companies Act section 25'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 text-base"
            />
            <Button type="submit" disabled={isLoading} size="lg">
              <SearchIcon className="mr-2 h-4 w-4" />
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {isLoading && (
          <>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
            </Card>
          </>
        )}
        {!isLoading && hasSearched && results.length === 0 && (
          <p className="text-center text-muted-foreground">No results found for "{query}".</p>
        )}
        {!isLoading && results.map((result) => (
          <Card key={result.id} className="transition-all hover:border-primary/50">
            <CardHeader>
              <CardTitle className="font-headline text-lg text-primary flex items-center">
                <FileText className="mr-2 h-5 w-5 shrink-0" />
                {result.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{result.snippet}</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">Read Document</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
