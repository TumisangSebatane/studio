'use client';

import type { Document } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Highlighter } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

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
    <Card className="rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">{document.title}</CardTitle>
        <CardDescription>{document.category} - {document.date}</CardDescription>
      </CardHeader>
      <CardContent>
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
  );
}
