import pdf from 'pdf-parse';
import { DocumentChunk } from '@/types';
import { createEmbedding } from './embeddings';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export function chunkText(text: string, chunkSize: number = 500, overlap: number = 100): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim().length > 0) {
      chunks.push(chunk.trim());
    }
  }
  
  return chunks;
}

export async function createDocumentChunks(text: string): Promise<DocumentChunk[]> {
  const textChunks = chunkText(text);
  const chunks: DocumentChunk[] = [];
  
  for (let i = 0; i < textChunks.length; i++) {
    const chunkText = textChunks[i];
    const embedding = await createEmbedding(chunkText);
    
    chunks.push({
      id: `chunk_${i}`,
      text: chunkText,
      embedding,
      metadata: {
        chunkIndex: i,
      },
    });
  }
  
  return chunks;
}