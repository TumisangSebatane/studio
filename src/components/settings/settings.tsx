'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function Settings() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('lexibotswana-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('lexibotswana-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) {
    return (
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <div className="h-8 w-32 animate-pulse rounded-md bg-muted"></div>
          <div className="mt-2 h-4 w-48 animate-pulse rounded-md bg-muted"></div>
        </CardHeader>
        <CardContent>
          <div className="h-20 w-full animate-pulse rounded-lg bg-muted"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-lg shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">Settings</CardTitle>
        <CardDescription>Manage your preferences for the application.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
          <div className="space-y-0.5">
            <Label htmlFor="dark-mode" className="text-base font-medium">
              Appearance
            </Label>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark themes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-muted-foreground" />
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
