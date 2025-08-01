'use client';

import type { Document } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Highlighter, Link as LinkIcon, Pilcrow } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { Separator } from '../ui/separator';
import Link from 'next/link';

interface DocumentViewProps {
  document: Document;
}

export function DocumentView({ document }: DocumentViewProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverTarget, setPopoverTarget] = useState<DOMRect | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width > 0) {
        setPopoverTarget(rect);
        setPopoverOpen(true);
      }
    } else {
      setPopoverOpen(false);
    }
  };

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const mark = document.createElement('mark');
      mark.style.backgroundColor = 'hsl(var(--accent) / 0.4)';
      mark.className = 'rounded-sm px-0.5';
      
      try {
        range.surroundContents(mark);
      } catch (e) {
        console.warn("Could not surround contents, using fallback.", e);
        mark.textContent = selection.toString();
        range.deleteContents();
        range.insertNode(mark);
      }
      
      selection.removeAllRanges();
    }
    setPopoverOpen(false);
  };
  
  useEffect(() => {
    const closePopover = () => setPopoverOpen(false);
    window.addEventListener('scroll', closePopover, true);
    window.addEventListener('resize', closePopover, true);
    return () => {
      window.removeEventListener('scroll', closePopover, true);
      window.removeEventListener('resize', closePopover, true);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3">
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">{document.title}</CardTitle>
            <CardDescription>{document.category} - {document.date}</CardDescription>
            {document.caseNumber && <CardDescription>Case No: {document.caseNumber}</CardDescription>}
            {document.court && <CardDescription>Court: {document.court}</CardDescription>}
            {document.judge && <CardDescription>Before: {document.judge}</CardDescription>}
          </CardHeader>

          {document.headnotes && (
            <>
              <Separator />
              <CardContent className="py-6">
                <h3 className="font-headline text-lg text-primary mb-2 flex items-center gap-2"><Pilcrow className="w-5 h-5" /> Headnotes</h3>
                <div className="prose-sm max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: document.headnotes }} />
              </CardContent>
            </>
          )}

          <Separator />
          <CardContent className="py-6">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <div ref={contentRef} onMouseUp={handleMouseUp} dangerouslySetInnerHTML={{ __html: document.content }} />
              {popoverTarget && (
                 <PopoverContent
                    style={{
                      position: 'fixed',
                      top: `${window.scrollY + popoverTarget.top - 50}px`,
                      left: `${window.scrollX + popoverTarget.left + popoverTarget.width / 2}px`,
                      transform: 'translateX(-50%)',
                    }}
                    className="w-auto p-0"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    align="center"
                  >
                  <Button size="sm" onClick={handleHighlight}>
                    <Highlighter className="mr-2 h-4 w-4" />
                    Highlight
                  </Button>
                </PopoverContent>
              )}
            </Popover>
          </CardContent>
        </Card>
      </div>
      <aside className="space-y-6">
        {(document.relatedCases || document.relatedStatutes) && (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2"><LinkIcon className="w-5 h-5" /> Cross-References</CardTitle>
                </CardHeader>
                <CardContent>
                    {document.relatedStatutes && document.relatedStatutes.length > 0 && (
                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">Statutes Referenced</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                {document.relatedStatutes.map(statute => (
                                    <li key={statute.id}>
                                        <Link href="#" className="text-primary hover:underline">{statute.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {document.relatedCases && document.relatedCases.length > 0 && (
                         <div>
                            <h4 className="font-semibold mb-2">Cases Referenced</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                {document.relatedCases.map(c => (
                                    <li key={c.id}>
                                        <Link href="#" className="text-primary hover:underline">{c.title}</Link>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardContent>
            </Card>
        )}
      </aside>
    </div>
  );
}
