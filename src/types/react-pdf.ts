// PDF.js Type Definitions
declare global {
  interface Window {
    pdfjsLib: PDFJSLib;
  }
}

// Basic PDF.js type definitions
interface PDFJSLib {
  getDocument: (source: string | TypedArray | DocumentInitParameters) => PDFDocumentLoadingTask;
  GlobalWorkerOptions: GlobalWorkerOptions;
}

interface GlobalWorkerOptions {
  workerSrc: string;
}

interface PDFDocumentLoadingTask {
  promise: Promise<PDFDocumentProxy>;
  onProgress?: (progressData: { loaded: number, total: number }) => void;
  destroy: () => Promise<void>;
}

interface PDFDocumentProxy {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PDFPageProxy>;
}

interface PDFPageProxy {
  getViewport: (params: { scale: number }) => PDFViewport;
  render: (renderParameters: PDFRenderParams) => PDFRenderTask;
}

interface PDFViewport {
  width: number;
  height: number;
}

interface PDFRenderParams {
  canvasContext: CanvasRenderingContext2D;
  viewport: PDFViewport;
}

interface PDFRenderTask {
  promise: Promise<void>;
}

interface DocumentInitParameters {
  url?: string;
  data?: TypedArray;
  httpHeaders?: Record<string, string>;
  withCredentials?: boolean;
}

type TypedArray = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;

export type {
  PDFJSLib,
  GlobalWorkerOptions,
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  PDFPageProxy,
  PDFViewport,
  PDFRenderParams,
  PDFRenderTask,
  DocumentInitParameters,
  TypedArray
};