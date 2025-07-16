import type { Document } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DocumentListProps {
  documents: Document[];
  onSelectDocument: (doc: Document) => void;
}

export function DocumentList({ documents, onSelectDocument }: DocumentListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id} className="flex flex-col rounded-lg shadow-md transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="font-headline text-lg text-primary">{doc.title}</CardTitle>
              <Badge style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }} className="ml-2 shrink-0 border-0">{doc.category}</Badge>
            </div>
            <CardDescription>{doc.date}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{doc.summary}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => onSelectDocument(doc)} className="w-full">Read Document</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
