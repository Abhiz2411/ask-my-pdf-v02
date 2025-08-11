import { StoredDocument, DocumentChunk, SimilarityResult } from '@/types';
import { cosineSimilarity } from './embeddings';

// In-memory storage for documents
const documentStore = new Map<string, StoredDocument>();

export function storeDocument(document: StoredDocument): void {
  documentStore.set(document.id, document);
}

export function getDocument(docId: string): StoredDocument | undefined {
  return documentStore.get(docId);
}

export function findSimilarChunks(
  docId: string,
  queryEmbedding: number[],
  topK: number = 3
): SimilarityResult[] {
  const document = documentStore.get(docId);
  if (!document) {
    return [];
  }

  const similarities: SimilarityResult[] = document.chunks.map(chunk => ({
    chunk,
    similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}

export function getAllDocuments(): StoredDocument[] {
  return Array.from(documentStore.values());
}