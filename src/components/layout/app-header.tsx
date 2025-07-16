import { Scale, Search, Bookmark, User, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Scale className="h-6 w-6 text-primary" />
          <h1 className="ml-2 font-headline text-xl font-bold text-primary">
            LexiBotswana
          </h1>
        </div>
        <div className="flex flex-1 max-w-lg items-center gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="w-full pl-9"
            />
          </div>
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            My Saved Docs
          </Button>
          <Button variant="ghost" size="sm">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" size="sm">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Button>
        </nav>
      </div>
    </header>
  );
}
