export function AppFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} LexiBotswana. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <a href="#" className="text-sm hover:underline">Contact Us</a>
          <a href="#" className="text-sm hover:underline">About LexiBotswana</a>
          <a href="#" className="text-sm hover:underline">Terms of Use</a>
        </nav>
      </div>
    </footer>
  );
}
