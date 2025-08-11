import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF, createDocumentChunks } from '@/lib/pdf-processor';
import { storeDocument } from '@/lib/document-store';
import { StoredDocument } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    // Check if file is PDF
    if (!file.type?.includes('pdf')) {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract text from PDF
    const text = await extractTextFromPDF(buffer);
    
    if (!text.trim()) {
      return NextResponse.json({ error: 'No text found in PDF' }, { status: 400 });
    }

    // Create chunks and embeddings
    const chunks = await createDocumentChunks(text);
    
    // Generate document ID
    const docId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store document
    const document: StoredDocument = {
      id: docId,
      filename: file.name,
      chunks,
      uploadedAt: new Date(),
    };
    
    storeDocument(document);
    
    return NextResponse.json({
      success: true,
      docId,
      filename: file.name,
      chunkCount: chunks.length,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF' },
      { status: 500 }
    );
  }
}