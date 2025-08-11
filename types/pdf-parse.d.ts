// types/pdf-parse.d.ts
declare module 'pdf-parse' {
  export interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: Record<string, any>;
    metadata: any;
    version: string;
    text: string;
  }

  export interface PDFParseOptions {
    // You can extend this as needed; keeping minimal for now.
    max?: number;
    pagerender?: (page: any) => Promise<string> | string;
    version?: string;
  }

  const pdf: (data: Buffer | Uint8Array, options?: PDFParseOptions) => Promise<PDFParseResult>;
  export default pdf;
}
