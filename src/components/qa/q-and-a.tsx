'use client';

import { useState } from 'react';
import { instantLegalQAServer } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Terminal, Bot } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function QandA() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<{ answer: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await instantLegalQAServer({ question });
      if (res && res.answer) {
        setResult(res);
      } else {
        throw new Error('No answer was returned from the legal expert.');
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
       <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary flex items-center justify-center">
            <Sparkles className="mr-3 h-6 w-6 text-accent" />
            Instant Legal Q&A
        </h2>
        <p className="mt-2 text-muted-foreground">
            Ask a question about Botswana law and get an instant, AI-powered answer.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="e.g., 'What are the requirements for registering a company in Botswana?'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              disabled={isLoading}
              className="text-base"
            />
            <Button type="submit" disabled={isLoading || !question.trim()} className="w-full" size="lg">
              {isLoading ? 'Thinking...' : 'Ask Question'}
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

      {isLoading && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-6 w-6 text-primary" />
              </div>
              <Skeleton className="h-6 w-32" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="border-accent bg-accent/10">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-3">
               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-6 w-6 text-primary" />
              </div>
              Legal Expert's Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose-sm max-w-none text-foreground">
              {result.answer.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
