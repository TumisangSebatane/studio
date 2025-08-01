'use client';

import { useState } from 'react';
import { instantLegalQAServer, caseAssessmentServer } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Terminal, Bot, FileUp, MessageSquare, ArrowLeft } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '../ui/input';
import Link from 'next/link';

function QandATab() {
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
    <div className="space-y-6">
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

      {isLoading && <LoadingSkeleton />}

      {result && (
        <ResultCard title="Legal Expert's Answer">
          {result.answer.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
          ))}
        </ResultCard>
      )}
    </div>
  );
}

function CaseAssessmentTab() {
  const [file, setFile] = useState<File | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [result, setResult] = useState<{ assessment: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !userPrompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const caseDocumentUri = await fileToDataUri(file);
      const res = await caseAssessmentServer({ caseDocumentUri, userPrompt });
      if (res && res.assessment) {
        setResult(res);
      } else {
        throw new Error('No assessment was returned from the legal expert.');
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="case-file" className="text-sm font-medium">Case Document</label>
              <Input id="case-file" type="file" onChange={handleFileChange} disabled={isLoading} accept=".pdf,.doc,.docx,.txt" />
            </div>
             <div className="space-y-2">
              <label htmlFor="user-prompt" className="text-sm font-medium">Assessment Prompt</label>
              <Textarea
                id="user-prompt"
                placeholder="e.g., 'Analyze this contract for potential risks and liabilities under Botswana law.'"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                rows={3}
                disabled={isLoading}
                className="text-base"
              />
            </div>
            <Button type="submit" disabled={isLoading || !file || !userPrompt.trim()} className="w-full" size="lg">
              {isLoading ? 'Analyzing...' : 'Assess Document'}
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
        <ResultCard title="Case Assessment">
            {result.assessment.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
        </ResultCard>
      )}
    </div>
  );
}

export function LegalTools() {
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
            <Sparkles className="mr-3 h-6 w-6 text-accent" />
            Legal Tools
        </h2>
        <p className="mt-2 text-muted-foreground">
            Leverage AI for legal research and document analysis.
        </p>
      </div>

      <Tabs defaultValue="q-and-a" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="q-and-a"><MessageSquare className="mr-2 h-4 w-4" />Instant Q&amp;A</TabsTrigger>
          <TabsTrigger value="case-assessment"><FileUp className="mr-2 h-4 w-4" />Case Assessment</TabsTrigger>
        </TabsList>
        <TabsContent value="q-and-a" className="mt-6">
          <QandATab />
        </TabsContent>
        <TabsContent value="case-assessment" className="mt-6">
          <CaseAssessmentTab />
        </TabsContent>
      </Tabs>
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
          <Skeleton className="h-6 w-32" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  )
}

function ResultCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <Card className="border-accent bg-accent/10">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-3">
           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose-sm max-w-none text-foreground">
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
