'use client';

import { useState } from 'react';
import type { Document } from '@/lib/types';
import { DocumentList } from './document-list';
import { DocumentView } from './document-view';
import { MOCK_DOCUMENTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function DocumentExplorer() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

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

  return <DocumentList documents={MOCK_DOCUMENTS} onSelectDocument={setSelectedDoc} />;
}
