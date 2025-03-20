'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader } from './Loader';
// Import PDF.js types
import type { PDFDocumentProxy, PDFDocumentLoadingTask, PDFJSLib } from '@/types/react-pdf';

interface SeamlessPDFViewerProps {
  pdfUrl: string;
  title?: string;
}

export const SeamlessPDFViewer = ({ pdfUrl, title }: SeamlessPDFViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingTaskRef = useRef<PDFDocumentLoadingTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const pdfUrlRef = useRef<string>(pdfUrl);

  useEffect(() => {
    // Track if component is mounted to prevent state updates after unmount
    let isMounted = true;
    
    // Initialize PDF.js if it's not already loaded
    const initializePdfJs = async () => {
      if (!window.pdfjsLib) {
        try {
          // Load PDF.js script
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.crossOrigin = 'anonymous';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load PDF.js script'));
            document.body.appendChild(script);
          });
          
          // Wait for PDF.js to be available
          if (!window.pdfjsLib) {
            throw new Error('PDF.js library not found after loading');
          }
          
          // Set workerSrc property
          (window.pdfjsLib as PDFJSLib).GlobalWorkerOptions.workerSrc = 
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            } catch (err) {
          if (isMounted) {
            setError('Failed to load PDF.js library: ' + err);
            setLoading(false);
          }
          return false;
        }
      } else {
        // Ensure worker is set if PDF.js is already loaded
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      return true;
    };

    const loadAndRenderPdf = async () => {
      // Reset states when PDF changes
      if (isMounted) {
        setLoading(true);
        setError(null);
        setCurrentProgress(0);
      }
      
      // Cancel any ongoing loading task
      if (loadingTaskRef.current) {
        try {
          await loadingTaskRef.current.destroy();
        } catch (e) {
          console.log('Error destroying previous loading task:', e);
        }
        loadingTaskRef.current = null;
      }
      
      // Clear previous content
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      
      // Initialize PDF.js
      const initialized = await initializePdfJs();
      if (!initialized || !isMounted) return;
      
      try {
        // Load the PDF document
        loadingTaskRef.current = window.pdfjsLib.getDocument(pdfUrl);
        
        loadingTaskRef.current.onProgress = (progressData: { loaded: number, total: number }) => {
          if (progressData.total && isMounted) {
            setCurrentProgress(Math.round((progressData.loaded / progressData.total) * 100));
          }
        };
        
        const pdf = await loadingTaskRef.current.promise;
        
        // Check if component is still mounted and URL hasn't changed
        if (!isMounted || pdfUrlRef.current !== pdfUrl) return;
        
        // Render visible pages first (implement progressive loading)
        const pagesToRender = Math.min(pdf.numPages, 3); // Start with first few pages
        
        // Render initial pages
        for (let pageNum = 1; pageNum <= pagesToRender; pageNum++) {
          if (!isMounted || pdfUrlRef.current !== pdfUrl) return;
          await renderPage(pdf, pageNum);
        }
        
        // Render remaining pages
        if (pdf.numPages > pagesToRender) {
          setTimeout(async () => {
            for (let pageNum = pagesToRender + 1; pageNum <= pdf.numPages; pageNum++) {
              if (!isMounted || pdfUrlRef.current !== pdfUrl) return;
              await renderPage(pdf, pageNum);
            }
          }, 100);
        }
        
        if (isMounted) setLoading(false);
      } catch (err) {
        console.error('Error rendering PDF:', err);
        if (isMounted) {
          setError('Failed to render PDF');
          setLoading(false);
        }
      }
    };
    
    const renderPage = async (pdf: PDFDocumentProxy, pageNum: number) => {
      try {
        const page = await pdf.getPage(pageNum);
        
        // Create a div for each page
        const pageDiv = document.createElement('div');
        pageDiv.className = 'pdf-page';
        pageDiv.style.width = '100%';
        pageDiv.style.display = 'flex';
        pageDiv.style.justifyContent = 'center';
        pageDiv.style.marginBottom = '0';
        pageDiv.setAttribute('data-page-number', pageNum.toString());

        // Create canvas for page rendering
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        canvas.style.maxWidth = '100%';
        canvas.style.display = 'block';
        const context = canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance
        
        if (!context) {
          throw new Error('Could not get canvas context');
        }
        
        // Get base viewport
        const viewport = page.getViewport({ scale: 1.0 });
        
        // Calculate appropriate scale based on container width
        const containerWidth = containerRef.current?.clientWidth || 600;
        const scale = containerWidth / viewport.width;
        
        // Create scaled viewport
        const scaledViewport = page.getViewport({ scale: scale });
        
        // Account for device pixel ratio for high-DPI displays
        const pixelRatio = window.devicePixelRatio || 1;
        
        // Set canvas dimensions with pixel ratio for sharper rendering
        canvas.height = scaledViewport.height * pixelRatio;
        canvas.width = scaledViewport.width * pixelRatio;
        
        // Scale the canvas with CSS
        canvas.style.height = `${scaledViewport.height}px`;
        canvas.style.width = `${scaledViewport.width}px`;
        
        // Scale the context
        context.scale(pixelRatio, pixelRatio);
        
        // Render the page
        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport
        };
        
        await page.render(renderContext).promise;
        
        // Add canvas to page div
        pageDiv.appendChild(canvas);
        
        // Add page div to container
        if (containerRef.current && pdfUrlRef.current === pdfUrl) {
          containerRef.current.appendChild(pageDiv);
        }
      } catch (err) {
        console.error(`Error rendering page ${pageNum}:`, err);
      }
    };
    
    // Update ref to track current URL
    pdfUrlRef.current = pdfUrl;
    
    // Load and render PDF when component mounts or pdfUrl changes
    loadAndRenderPdf();
    
    // Cleanup function
    return () => {
      isMounted = false;
      
      // Cancel any ongoing loading task
      if (loadingTaskRef.current) {
        try {
          loadingTaskRef.current.destroy();
        } catch (e) {
          console.log('Error destroying loading task during cleanup:', e);
        }
        loadingTaskRef.current = null;
      }
    };
  }, [pdfUrl]);

  return (
    <div className="w-full flex flex-col items-center">
      {loading && (
        <div className="flex flex-col items-center my-12 w-full">
          <Loader size="large" />
          <p className="text-center mt-4 text-gray-400">
            {title || 'PDF'}<br />
            {currentProgress > 0 ? `${currentProgress}%` : ''}
          </p>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-800/20 border border-red-800 rounded my-4 text-center">
          <p className="text-red-200">{error}</p>
          <a 
            href={pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block mt-4 px-6 py-3 bg-amber-700 text-white hover:bg-amber-800 transition-colors"
          >
            View or Download PDF
          </a>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="pdf-container w-full max-w-full bg-black p-0"
        style={{ 
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
    </div>
  );
};