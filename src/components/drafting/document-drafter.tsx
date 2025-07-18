'use client';

import { useState } from 'react';
import { draftDocumentServer } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PenSquare, Terminal, Bot } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const documentTypes = [
  "Non-Disclosure Agreement (NDA)",
  "Employment Contract",
  "Lease Agreement",
  "Last Will and Testament",
  "Power of Attorney",
];

export function DocumentDrafter() {
  const [documentType, setDocumentType] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [result, setResult] = useState<{ draft: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentType || !userPrompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await draftDocumentServer({ documentType, userPrompt });
      if (res && res.draft) {
        setResult(res);
      } else {
        throw new Error('No draft was returned from the legal expert.');
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="mb-6">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
      </div>
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary flex items-center justify-center">
            <PenSquare className="mr-3 h-6 w-6 text-accent" />
            AI Document Drafter
        </h2>
        <p className="mt-2 text-muted-foreground">
            Generate a first draft of common legal documents.
        </p>
      </div>
      
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="doc-type" className="text-sm font-medium">Document Type</label>
                <Select onValueChange={setDocumentType} value={documentType} disabled={isLoading}>
                  <SelectTrigger id="doc-type" className="w-full">
                    <SelectValue placeholder="Select a document type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <label htmlFor="user-prompt" className="text-sm font-medium">Key Details & Clauses</label>
                <Textarea
                    id="user-prompt"
                    placeholder="e.g., 'The agreement is between John Doe and Jane Smith. The confidential information relates to a new software product. The term is for 5 years.'"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    rows={5}
                    disabled={isLoading}
                    className="text-base"
                />
            </div>
            <Button type="submit" disabled={isLoading || !documentType || !userPrompt.trim()} className="w-full" size="lg">
              {isLoading ? 'Drafting...' : 'Draft Document'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && <LoadingSkeleton />}

      {result && (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Bot className="h-6 w-6 text-primary" />
                    </div>
                    Drafted Document: {documentType}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    readOnly
                    value={result.draft}
                    className="min-h-[400px] font-code text-sm"
                />
                 <Button className="mt-4">Copy to Clipboard</Button>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

function LoadingSkeleton() {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
            </div>
            <Skeleton className="h-6 w-48" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    )
  }
