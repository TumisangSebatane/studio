import { AppHeader } from '@/components/layout/app-header';
import { QandA } from '@/components/qa/q-and-a';
import { DocumentExplorer } from '@/components/documents/document-explorer';
import { Search } from '@/components/search/search';
import { Settings } from '@/components/settings/settings';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { BookOpen, SearchIcon, MessageSquare, SettingsIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1">
        <Tabs defaultValue="documents" className="w-full">
          <div className="border-b bg-card">
            <div className="container mx-auto px-4">
              <TabsList className="h-12 w-full justify-start rounded-none border-b-0 bg-transparent p-0 sm:h-14">
                <TabsTrigger value="documents" className="relative h-full rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="search" className="relative h-full rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none">
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
                </TabsTrigger>
                <TabsTrigger value="qa" className="relative h-full rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Instant Q&A
                </TabsTrigger>
                <TabsTrigger value="settings" className="relative h-full rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-4 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <div className="container mx-auto p-4 py-6 md:p-6 lg:p-8">
            <TabsContent value="documents">
              <DocumentExplorer />
            </TabsContent>
            <TabsContent value="search">
              <Search />
            </TabsContent>
            <TabsContent value="qa">
              <QandA />
            </TabsContent>
            <TabsContent value="settings">
              <Settings />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
