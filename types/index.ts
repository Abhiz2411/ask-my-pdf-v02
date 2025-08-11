export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface DocumentChunk {
  id: string;
  text: string;
  embedding: number[];
  metadata: {
    page?: number;
    chunkIndex: number;
  };
}

export interface StoredDocument {
  id: string;
  filename: string;
  chunks: DocumentChunk[];
  uploadedAt: Date;
}

export interface SimilarityResult {
  chunk: DocumentChunk;
  similarity: number;
}