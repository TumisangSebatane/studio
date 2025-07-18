import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookCopy, Briefcase, FileText, Gavel, Landmark, PenSquare, Scale, Users } from 'lucide-react';
import Link from 'next/link';

const allLegalAreas = [
  { id: 'constitutional', name: 'Constitutional Law', icon: Landmark },
  { id: 'criminal', name: 'Criminal Law', icon: Gavel },
  { id: 'contract', name: 'Contract Law', icon: FileText },
  { id: 'company', name: 'Company Law', icon: Briefcase },
  { id: 'family', name: 'Family Law', icon: Users },
  { id: 'property', name: 'Property Law', icon: BookCopy },
  { id: 'tort', name: 'Tort Law', icon: Scale },
  { id: 'labour', name: 'Labour Law', icon: Users },
  { id: 'ip', name: 'Intellectual Property', icon: PenSquare },
];

export default function LegalAreasPage() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <h2 className="font-headline text-3xl font-bold text-primary mb-6">
          All Legal Areas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allLegalAreas.map((area) => (
            <Card key={area.id} className="group hover:shadow-lg hover:-translate-y-1 transition-transform cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <area.icon className="h-8 w-8 text-primary group-hover:text-accent" />
                <CardTitle className="font-headline text-lg">{area.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full">
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
