import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Users
} from 'lucide-react';

const legalAreas = [
  { name: 'Constitutional Law', icon: Landmark },
  { name: 'Criminal Law', icon: Gavel },
  { name: 'Contract Law', icon: FileText },
  { name: 'Company Law', icon: Briefcase },
  { name: 'Family Law', icon: Users },
  { name: 'Property Law', icon: BookCopy },
];

const featuredHighlights = [
    { title: "Latest Acts & Amendments", icon: Gavel, description: "Stay updated with new legislation." },
    { title: "Recent Judgments Summaries", icon: Scale, description: "Key insights from the latest court decisions." },
    { title: "Practice Directions & Circulars", icon: Newspaper, description: "Official updates for legal practitioners." },
];

const dashboardItems = [
    { title: "My Saved Documents", icon: FileText, description: "Access your bookmarked materials." },
    { title: "Recently Viewed Items", icon: FileClock, description: "Jump back into your recent research." },
    { title: "AI Draft a Document", icon: PenSquare, description: "Quickly start drafting legal documents." },
];

const newsItems = [
    { title: "Court Notices" },
    { title: "Regulatory Updates" },
    { title: "New Cases" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          
          {/* Main Section */}
          <section className="text-center py-12">
            <h2 className="font-headline text-4xl font-bold text-primary mb-4">Smart Search</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">Type a law, case name, or legal concept to begin your research.</p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="e.g., 'Companies Act section 25' or 'negligence'" className="h-12 text-lg pl-12 pr-28 rounded-full shadow-lg" />
              <Button size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full">Search</Button>
            </div>
            
            <div className="mt-12">
                <h3 className="font-headline text-2xl font-semibold text-primary mb-6">Browse by Legal Area</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {legalAreas.map((area) => (
                        <Card key={area.name} className="group text-center p-4 hover:shadow-md hover:-translate-y-1 transition-transform cursor-pointer">
                            <area.icon className="h-8 w-8 mx-auto text-primary mb-2 group-hover:text-accent" />
                            <p className="font-semibold text-sm">{area.name}</p>
                        </Card>
                    ))}
                </div>
            </div>
          </section>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12">
            
            {/* Featured Highlights */}
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

            {/* Legal News & Alerts */}
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

          {/* Personal Dashboard */}
          <section className="my-12">
            <h3 className="font-headline text-2xl font-bold text-primary mb-6">Personal Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardItems.map(item => (
                 <Card key={item.title} className="hover:shadow-lg transition-shadow">
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
              ))}
            </div>
          </section>

        </div>
      </main>
      <AppFooter />
    </div>
  );
}
