import React, { useRef } from "react";
import { useAsync } from "react-use";

export interface PdfViewerProps {
  url: string;
  newPdfGenerating: boolean;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ url, newPdfGenerating }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const state = useAsync(async () => {
    if (!url) {
      return;
    }
    const lib = await import("pdfjs-dist");
    lib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

    lib.getDocument(url).promise.then(async d => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }
      const newCanvases = [...new Array(d.numPages)].map(() =>
        document.createElement("canvas"),
      );

      for (const [i, canvas] of newCanvases.entries()) {
        const page = await d.getPage(i + 1);

        const viewport = page.getViewport({ scale: window.devicePixelRatio * 2 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const ratio = viewport.width / viewport.height;
        
        if (i > 0) {
          canvas.style.marginTop = "20px";
        }

        // letter 0.7727272727272727
        // A4 0.7070757680859299
        if (ratio > 0.71) {
          // letter
          canvas.className = "paper-letter";
        } else {
          // A4
          canvas.className = "paper-a4";
        }
        // Render PDF page into canvas context
        const renderContext = {
          canvasContext: canvas.getContext("2d")!,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
      }

      wrapper.replaceChildren(...newCanvases);
    });
  }, [url]);

  return (
    <div className="relative">
      {(state.loading || newPdfGenerating) && (
        <div className="absolute inset-x-0 margin-auto text-center top-1/2 text-xl">Loading...</div>
      )}
      <div className="pdf-renderer" ref={wrapperRef} />
    </div>
  );
};
