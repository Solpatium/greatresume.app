import React, { useRef } from "react";
import { useAsync } from "react-use";

export interface PdfViewer {
  url: string;
  newPdfGenerating: boolean;
}

export const PdfViewer: React.FC<PdfViewer> = ({ url, newPdfGenerating }) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const canvases = useRef<HTMLCanvasElement[]>([]);
  const state = useAsync(async () => {
    if (!url) {
      return;
    }
    const lib = await import("pdfjs-dist");
    lib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

    (await import("pdfjs-dist")).getDocument(url).promise.then(async d => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }
      const redundantCanvases = Math.max(canvases.current.length - d.numPages, 0);
      for (let i = 0; i < redundantCanvases; i++) {
        wrapper.removeChild(wrapper.lastChild);
        canvases.current.pop();
      }

      const missingCanvases = Math.max(d.numPages - canvases.current.length, 0);
      const newCanvases = [...new Array(missingCanvases)].map(() =>
        document.createElement("canvas"),
      );
      canvases.current.push(...newCanvases);
      wrapper.append(...newCanvases);

      for (const [i, canvas] of canvases.current.entries()) {
        const page = await d.getPage(i + 1);

        const viewport = page.getViewport({ scale: window.devicePixelRatio * 2 });
        // console.log(page.getViewport({ scale: 1 }));
        // console.log(page.view, "LAYOUT");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const ratio = viewport.width / viewport.height;

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
          canvasContext: canvas.getContext("2d"),
          viewport: viewport,
        };
        const renderTask = page.render(renderContext);
        await renderTask.promise;
      }
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
