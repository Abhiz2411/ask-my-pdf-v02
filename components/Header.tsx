import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">PDF Chatbot</h1>
          </div>
          <Link
            href="https://github.com/Abhiz2411/ask-my-pdf-v02"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View code on GitHub
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}