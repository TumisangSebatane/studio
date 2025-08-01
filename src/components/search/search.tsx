'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { searchLegalCorpus, type LegalSearchResult } from './actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, FileText, Bot, ChevronRight, Pilcrow } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export function SearchComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [mode, setMode] = useState<'verbatim' | 'ai_assisted'>('verbatim');
  const [results, setResults] = useState<LegalSearchResult>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const initialQuery = searchParams.get('q');
    if (initialQuery) {
      setQuery(initialQuery);
      startTransition(() => {
        searchLegalCorpus({ query: initialQuery, filters: {}, mode }).then(setResults);
      });
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
    startTransition(() => {
      searchLegalCorpus({ query, filters: {}, mode }).then(setResults);
    });
  };
  
  const handleModeToggle = (checked: boolean) => {
    const newMode = checked ? 'ai_assisted' : 'verbatim';
    setMode(newMode);
    if (results.length > 0) {
      startTransition(() => {
        searchLegalCorpus({ query, filters: {}, mode: newMode }).then(setResults);
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary">Legal Corpus Search</h2>
        <p className="mt-2 text-muted-foreground">
          Use keyword or semantic search to find relevant statutes and case law.
        </p>
      </div>
      <Card className="shadow-lg sticky top-20 z-30">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex w-full flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow w-full">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="e.g., 'gender discrimination' or 'Companies Act section 25'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 text-base pl-9"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="ai-mode" checked={mode === 'ai_assisted'} onCheckedChange={handleModeToggle} />
              <Label htmlFor="ai-mode" className="flex items-center gap-1">
                <Bot className="h-4 w-4" /> AI-Assisted
              </Label>
            </div>
            <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto">
              {isPending ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {isPending && (
          <>
            <ResultSkeleton />
            <ResultSkeleton />
            <ResultSkeleton />
          </>
        )}
        {!isPending && results.length > 0 && results.map((result) => (
          <SearchResultCard key={result.id} result={result} />
        ))}
        {!isPending && results.length === 0 && query && (
          <p className="text-center text-muted-foreground pt-8">No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
}

function SearchResultCard({ result }: { result: LegalSearchResult[0] }) {
  if (result.mode === 'ai_assisted') {
    return (
      <Card className="transition-all border-accent bg-accent/10">
        <CardHeader>
          <CardTitle className="font-headline text-lg text-primary flex items-center">
            <FileText className="mr-2 h-5 w-5 shrink-0" />
            {result.title}
          </CardTitle>
          <CardDescription>{result.citation}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-1 flex items-center gap-1"><Bot className="h-4 w-4" /> AI Summary</h4>
              <p className="text-sm text-foreground/90">{result.summary}</p>
            </div>
             <div>
              <h4 className="font-semibold text-sm mb-1 flex items-center gap-1"><Gavel className="h-4 w-4" /> Key Legal Principles</h4>
              <ul className="list-disc list-inside text-sm text-foreground/90 space-y-1">
                {result.keyPrinciples?.map((principle, i) => <li key={i}>{principle}</li>)}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">
            View Full Text <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Verbatim result
  return (
    <Card className="transition-all hover:border-primary/50">
        <CardHeader>
          <CardTitle className="font-headline text-lg text-primary flex items-center">
            <FileText className="mr-2 h-5 w-5 shrink-0" />
            {result.title}
          </CardTitle>
          <CardDescription>{result.citation}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="headnotes">
              <AccordionTrigger className="text-base font-semibold py-2">
                <div className="flex items-center gap-2"><Pilcrow /> Headnotes</div>
              </AccordionTrigger>
              <AccordionContent className="prose-sm max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: result.headnotes || ''}} />
            </AccordionItem>
            <AccordionItem value="full-text">
              <AccordionTrigger className="text-base font-semibold py-2">
                <div className="flex items-center gap-2"><FileText /> Full Text</div>
              </AccordionTrigger>
              <AccordionContent className="prose-sm max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: result.fullText || ''}} />
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
  )
}

function ResultSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  )
}
