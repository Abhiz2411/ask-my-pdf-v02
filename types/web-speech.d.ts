// Minimal Web Speech API typings so TS/Vercel builds succeed without extra deps.
export {};

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }

  // You can expand this to the full interface if you like.
  interface SpeechRecognition {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives?: number;
    start: () => void;
    stop: () => void;
    abort?: () => void;
    onaudiostart?: (e: any) => void;
    onsoundstart?: (e: any) => void;
    onspeechstart?: (e: any) => void;
    onspeechend?: (e: any) => void;
    onsoundend?: (e: any) => void;
    onaudioend?: (e: any) => void;
    onresult?: (e: any) => void;
    onnomatch?: (e: any) => void;
    onerror?: (e: any) => void;
    onstart?: (e: any) => void;
    onend?: (e: any) => void;
  }
}
