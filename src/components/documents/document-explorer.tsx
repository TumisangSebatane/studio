'use client';

import { useState } from 'react';
import type { Document } from '@/lib/types';
import { DocumentList } from './document-list';
import { DocumentView } from './document-view';
import { MOCK_DOCUMENTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface DocumentExplorerProps {
  isLawReports?: boolean;
}

export function DocumentExplorer({ isLawReports = false }: DocumentExplorerProps) {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const documents = isLawReports 
    ? MOCK_DOCUMENTS.filter(doc => doc.category === 'Case Law') 
    : MOCK_DOCUMENTS;

  if (selectedDoc) {
    return (
      <div>
        <Button variant="ghost" onClick={() => setSelectedDoc(null)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>
        <DocumentView document={selectedDoc} />
      </div>
    );
  }

  return (
    <div>
        {isLawReports && (
             <Card className="mb-6 shadow-md">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                    <Input placeholder="Search by case name or keyword..." className="flex-grow"/>
                     <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="1992">1992</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by court" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="coa">Court of Appeal</SelectItem>
                            <SelectItem value="hc">High Court</SelectItem>
                        </SelectContent>
                    </Select>
                     <Button>Search</Button>
                </CardContent>
            </Card>
        )}
        <DocumentList documents={documents} onSelectDocument={setSelectedDoc} />
    </div>
  )
}
