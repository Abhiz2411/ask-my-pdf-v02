'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import PDFUpload from '@/components/PDFUpload';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  const [docId, setDocId] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>('');

  const handleUploadSuccess = (newDocId: string, newFilename: string) => {
    setDocId(newDocId);
    setFilename(newFilename);
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {!docId ? (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">PDF Chatbot Assistant</h2>
                  <p className="text-muted-foreground text-lg">
                    Upload a PDF document and chat with it using AI. Ask questions and get answers based on the content.
                  </p>
                </div>
                <PDFUpload onUploadSuccess={handleUploadSuccess} />
              </div>
            ) : (
              <div className="h-[calc(100vh-8rem)] flex flex-col">
                <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Current Document:</h3>
                      <p className="text-sm text-muted-foreground">{filename}</p>
                    </div>
                    <button
                      onClick={() => {
                        setDocId(null);
                        setFilename('');
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground underline"
                    >
                      Upload new document
                    </button>
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  <ChatInterface docId={docId} filename={filename} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}