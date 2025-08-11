import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createEmbedding } from '@/lib/embeddings';
import { findSimilarChunks, getDocument } from '@/lib/document-store';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { docId, query } = await request.json();
    
    if (!docId || !query) {
      return NextResponse.json(
        { error: 'Document ID and query are required' },
        { status: 400 }
      );
    }

    // Check if document exists
    const document = getDocument(docId);
    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Create embedding for the query
    const queryEmbedding = await createEmbedding(query);
    
    // Find similar chunks
    const similarChunks = findSimilarChunks(docId, queryEmbedding, 3);
    
    if (similarChunks.length === 0) {
      return NextResponse.json({
        response: "I couldn't find relevant information in the document to answer your question.",
      });
    }

    // Prepare context from similar chunks
    const context = similarChunks
      .map(result => result.chunk.text)
      .join('\n\n');

    // Create prompt for OpenAI
    const prompt = `Based on the following context from the uploaded PDF document, please answer the user's question. If the answer cannot be found in the context, say so clearly.

Context:
${context}

Question: ${query}

Answer:`;

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that answers questions based only on the provided context from a PDF document. If the answer is not in the context, say so clearly.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'No response generated.';

    return NextResponse.json({
      response,
      chunksUsed: similarChunks.length,
    });
  } catch (error) {
    console.error('Ask error:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}