'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight,
  BookCopy,
  Briefcase,
  ChevronRight,
  FileText,
  Gavel,
  Landmark,
  FileClock,
  Newspaper,
  PenSquare,
  Scale,
  Search,
  Users,
  Pin,
  PinOff
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

const featuredHighlights = [
    { title: "Latest Acts & Amendments", icon: Gavel, description: "Stay updated with new legislation." },
    { title: "Recent Judgments Summaries", icon: Scale, description: "Key insights from the latest court decisions." },
    { title: "Practice Directions & Circulars", icon: Newspaper, description: "Official updates for legal practitioners." },
];

const dashboardItems = [
    { title: "My Saved Documents", href: "/saved-documents", icon: FileText, description: "Access your bookmarked materials." },
    { title: "Recently Viewed Items", href: "/recently-viewed", icon: FileClock, description: "Jump back into your recent research." },
    { title: "AI Draft a Document", href: "/draft-document", icon: PenSquare, description: "Quickly start drafting legal documents." },
];

const newsItems = [
    { title: "Court Notices" },
    { title: "Regulatory Updates" },
    { title: "New Cases" },
];

const DISPLAY_COUNT = 6;

export default function Home() {
  const router = useRouter();
  const [displayedAreas, setDisplayedAreas] = useState<typeof allLegalAreas>([]);
  const [heldAreas, setHeldAreas] = useState<Set<string>>(new Set());

  const shuffleAreas = useCallback(() => {
    const heldItems = allLegalAreas.filter(area => heldAreas.has(area.id));
    const unheldItems = allLegalAreas.filter(area => !heldAreas.has(area.id));
    
    const shuffled = [...unheldItems].sort(() => 0.5 - Math.random());
    
    const needed = DISPLAY_COUNT - heldItems.length;
    const newDisplay = [...heldItems, ...shuffled.slice(0, needed)];
    
    // Maintain a consistent order if possible
    newDisplay.sort((a, b) => {
        const aIndex = allLegalAreas.findIndex(item => item.id === a.id);
        const bIndex = allLegalAreas.findIndex(item => item.id === b.id);
        return aIndex - bIndex;
    });

    setDisplayedAreas(newDisplay);
  }, [heldAreas]);

  useEffect(() => {
    shuffleAreas();
  }, [shuffleAreas]);

  const toggleHold = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    e.preventDefault();
    setHeldAreas(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else if (newSet.size < DISPLAY_COUNT) {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        
        <section className="text-center py-12">
          <h2 className="font-headline text-4xl font-bold text-primary mb-4">Smart Search</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Type a law, case name, or legal concept to begin your research.</p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="e.g., 'Companies Act section 25' or 'negligence'" className="h-12 text-lg pl-12 pr-28 rounded-full shadow-lg" />
            <Button size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full">Search</Button>
          </div>
          
          <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline text-2xl font-semibold text-primary">Browse by Legal Area</h3>
                  <Button variant="link" asChild>
                      <Link href="/legal-areas">
                          View All
                          <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {displayedAreas.map((area) => {
                      const isHeld = heldAreas.has(area.id);
                      return (
                          <Link key={area.id} href="/legal-areas" passHref>
                              <Card className="group text-center p-4 h-full hover:shadow-md hover:-translate-y-1 transition-transform cursor-pointer relative">
                                  <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute top-1 right-1 h-7 w-7 z-10"
                                      onClick={(e) => toggleHold(area.id, e)}
                                  >
                                      {isHeld ? <Pin className="h-4 w-4 text-primary" /> : <PinOff className="h-4 w-4 text-muted-foreground group-hover:text-primary" />}
                                  </Button>
                                  <area.icon className="h-8 w-8 mx-auto text-primary mb-2 group-hover:text-accent" />
                                  <p className="font-semibold text-sm">{area.name}</p>
                              </Card>
                          </Link>
                      )
                  })}
              </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12">
          
          <section className="lg:col-span-2 space-y-6">
            <h3 className="font-headline text-2xl font-bold text-primary">Featured Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredHighlights.map(item => (
                <Card key={item.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <item.icon className="w-8 h-8 text-accent" />
                    <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-headline text-2xl font-bold text-primary mb-6">Legal News & Alerts</h3>
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {newsItems.map(item => (
                    <li key={item.title}>
                      <a href="#" className="flex items-center justify-between p-4 hover:bg-muted/50">
                        <span>{item.title}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

        </div>

        <section className="my-12">
          <h3 className="font-headline text-2xl font-bold text-primary mb-6">Personal Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardItems.map(item => (
               <Link key={item.title} href={item.href} className="block hover:shadow-lg transition-shadow rounded-lg">
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-start justify-between">
                        <div>
                            <CardTitle className="font-headline text-lg flex items-center gap-2">
                                <item.icon className="w-5 h-5 text-accent" />
                                {item.title}
                            </CardTitle>
                            <CardDescription className="mt-1">{item.description}</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                  </Card>
               </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
