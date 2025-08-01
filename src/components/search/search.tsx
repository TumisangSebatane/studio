'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { searchLegalCorpus, type LegalSearchResult } from './actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, FileText, Bot, ChevronRight, Pilcrow, Gavel, Scale, BookOpen, User, Calendar, Users, Link as LinkIcon } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function SearchComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [mode, setMode] = useState<'verbatim' | 'codified'>('verbatim');
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const newMode = checked ? 'codified' : 'verbatim';
    setMode(newMode);
    if (query.trim()) {
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
              <Switch id="ai-mode" checked={mode === 'codified'} onCheckedChange={handleModeToggle} />
              <Label htmlFor="ai-mode" className="flex items-center gap-1">
                <Bot className="h-4 w-4" /> Codified
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
  if (result.type === 'verbatim') {
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
  
  // AI-Assisted Results
  const renderCard = (badgeText: string, card: React.ReactNode) => (
    <Card className="transition-all border-accent bg-accent/10 relative overflow-hidden">
        <Badge className="absolute top-3 right-3 border-accent/50 bg-accent/20 text-accent-foreground">{badgeText}</Badge>
        {card}
    </Card>
  )

  switch (result.type) {
    case 'case':
      return renderCard('Case Law', (
        <>
            <CardHeader>
                <CardTitle className="font-headline text-lg text-primary">{result.title}</CardTitle>
                <CardDescription>{result.citation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                    {result.court && <InfoItem icon={Gavel} label="Court" value={result.court} />}
                    {result.date && <InfoItem icon={Calendar} label="Date" value={result.date} />}
                    {result.judges && <InfoItem icon={Users} label="Judges" value={result.judges.join(', ')} className="col-span-2 md:col-span-3" />}
                </div>
                <InfoSection icon={Bot} title="AI Summary" content={result.summary} />
                <InfoSection icon={Scale} title="Key Legal Principles" content={<ul>{result.keyPrinciples.map((p,i) => <li key={i} className="list-disc list-inside">{p}</li>)}</ul>} />
                <InfoSection icon={Gavel} title="Verdict" content={result.verdict} />
            </CardContent>
            <CardFooter>
                 <Button asChild variant="secondary" size="sm"><Link href={result.fullTextLink}>View Full Text <ChevronRight className="ml-1 h-4 w-4" /></Link></Button>
            </CardFooter>
        </>
      ));
    case 'statute':
      return renderCard('Statute', (
         <>
            <CardHeader>
                <CardTitle className="font-headline text-lg text-primary">{result.title}</CardTitle>
                {result.sectionNumber && <CardDescription>Section: {result.sectionNumber}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-4">
                <InfoSection icon={Bot} title="AI Summary of Section" content={result.summary} />
                {result.relatedCases.length > 0 && <InfoSection icon={LinkIcon} title="Related Cases" content={<ul>{result.relatedCases.map(c => <li key={c.id}><Link href={`/documents/${c.id}`} className="hover:underline text-primary">{c.title}</Link></li>)}</ul>} />}
            </CardContent>
            <CardFooter>
                <Button asChild variant="secondary" size="sm"><Link href={result.fullTextLink}>View Full Text <ChevronRight className="ml-1 h-4 w-4" /></Link></Button>
            </CardFooter>
        </>
      ));
    case 'commentary':
        return renderCard('Commentary', (
            <>
                <CardHeader>
                    <CardTitle className="font-headline text-lg text-primary">{result.title}</CardTitle>
                    {result.author && <CardDescription>By {result.author}</CardDescription>}
                </CardHeader>
                <CardContent className="space-y-4">
                    <InfoSection icon={Bot} title="AI Summary" content={result.summary} />
                    {result.linkedReferences.length > 0 && <InfoSection icon={LinkIcon} title="Linked References" content={<ul>{result.linkedReferences.map(r => <li key={r.id}><Link href={`/documents/${r.id}`} className="hover:underline text-primary">{r.title}</Link></li>)}</ul>} />}
                </CardContent>
                <CardFooter>
                    <Button asChild variant="secondary" size="sm"><Link href={result.fullTextLink}>View Full Text <ChevronRight className="ml-1 h-4 w-4" /></Link></Button>
                </CardFooter>
            </>
        ));
    default:
        return null;
  }
}

const InfoSection = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: React.ReactNode }) => (
    <div>
        <h4 className="font-semibold text-sm mb-1 flex items-center gap-1"><Icon className="h-4 w-4 text-primary/80" /> {title}</h4>
        <div className="text-sm text-foreground/90 pl-5">{content}</div>
    </div>
);

const InfoItem = ({ icon: Icon, label, value, className }: { icon: React.ElementType, label: string, value: string, className?: string }) => (
    <div className={cn("flex items-start gap-2", className)}>
        <Icon className="h-4 w-4 mt-0.5 text-primary/80 shrink-0" />
        <div>
            <p className="font-semibold leading-tight">{label}</p>
            <p className="text-muted-foreground leading-tight">{value}</p>
        </div>
    </div>
);


function ResultSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  )
}
