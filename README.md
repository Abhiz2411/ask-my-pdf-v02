# PDF Chatbot - AI-Powered Document Assistant

A Next.js application that allows users to upload PDF documents and chat with them using OpenAI's GPT models. Features include text extraction, embeddings-based retrieval, and voice input capabilities.

## Features

- **PDF Upload & Processing**: Upload PDF documents with automatic text extraction and chunking
- **AI-Powered Chat**: Ask questions about your PDF using OpenAI's chat completion API
- **RAG (Retrieval-Augmented Generation)**: Uses embeddings and cosine similarity for accurate context retrieval
- **Voice Input**: Speech-to-text functionality using Web Speech API
- **Responsive Design**: Clean, modern interface that works on all devices
- **Real-time Chat**: Instant responses with message history
- **Vercel Ready**: Optimized for easy deployment to Vercel

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_EMBED_MODEL=text-embedding-3-small
```

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Add it to your `.env.local` file

### 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## How It Works

1. **PDF Upload**: User uploads a PDF file
2. **Text Extraction**: Server extracts text using pdf-parse
3. **Chunking**: Text is split into ~500-word chunks with 100-word overlap
4. **Embeddings**: Each chunk is converted to embeddings using OpenAI's embedding API
5. **Storage**: Chunks and embeddings are stored in memory (keyed by document ID)
6. **Query Processing**: User questions are embedded and matched against document chunks
7. **Context Retrieval**: Top 3 most similar chunks are retrieved using cosine similarity
8. **AI Response**: Context + question sent to OpenAI chat completion API

## API Endpoints

- `POST /api/upload` - Upload and process PDF files
- `POST /api/ask` - Send questions about uploaded documents

## Voice Input

The application includes voice input functionality using the Web Speech API:
- Click the microphone button to start/stop voice recording
- Supports modern browsers (Chrome, Edge, Safari)
- Automatically appends recognized speech to the message input

## Technologies Used

- **Next.js 13+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **OpenAI API** for chat completion and embeddings
- **pdf-parse** for PDF text extraction
- **Web Speech API** for voice input
- **Lucide React** for icons

## Browser Support

- Modern browsers with Web Speech API support for voice input
- All major browsers for core functionality

## Limitations

- Documents are stored in memory (resets on server restart)
- Single document at a time
- No user authentication
- File size limits apply

## Future Enhancements

- Persistent storage (database)
- Multiple document support
- User authentication
- Document management
- Advanced search capabilities