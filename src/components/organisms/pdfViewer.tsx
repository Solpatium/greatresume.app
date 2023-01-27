import { PDFDocumentProxy } from "pdfjs-dist";
import React, { useEffect, useRef, useState } from "react";
import { useAsync } from "react-use";
import { PaperSize } from "../../models/v1";
import { useIsVisible } from "../../utils/hooks";

export interface PdfViewerProps {
  resume?: Blob;
  paperSize: PaperSize;
  newPdfGenerating: boolean;
}

const workerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

export const PdfViewer: React.FC<PdfViewerProps> = ({ resume, paperSize, newPdfGenerating }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // We want to render resume only when it is visble
  const [visible, setVisible] = useState(false)
  useIsVisible(wrapperRef, setVisible);

  // document rendered in web worker, right away
  const documentState = useAsync(async () => {
    if (!resume) {
      return undefined;
    }

    const lib = await import("pdfjs-dist");
    lib.GlobalWorkerOptions.workerSrc = workerUrl;
    const url = URL.createObjectURL(resume);
    return lib.getDocument(url).promise.then(r => {
      URL.revokeObjectURL(url);
      return r;
    })
  }, [resume]);

  const pdfDocument = documentState.value;
  // visible triggers new rerender
  const rendered = useRef<PDFDocumentProxy | undefined>();

  // Showing document in rendered canvas is delayed, when it is actually needed
  const renderState = useAsync(async () => {
    const wrapper = wrapperRef.current;
    if (!pdfDocument || rendered.current === pdfDocument || !wrapper || !visible) {
      return;
    }
    console.log("RUN")
    const newCanvases = [...new Array(pdfDocument.numPages)].map(() =>
      document.createElement("canvas"),
    );

    for (const [i, canvas] of newCanvases.entries()) {
      const page = await pdfDocument.getPage(i + 1);

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
    rendered.current = pdfDocument;
    pdfDocument.cleanup(true);
  }, [pdfDocument, visible]);

  const paperClass = paperSize === "A4" ? "paper-a4" : "paper-letter";
  return (
    <div className="relative flex">
      {(documentState.loading || renderState.loading || newPdfGenerating) && (
        <div className="absolute inset-x-0 margin-auto text-center top-1/2 text-xl">Loading...</div>
      )}
      <div className="pdf-renderer flex flex-col" ref={wrapperRef}
        dangerouslySetInnerHTML={{
          __html: `<div class='${paperClass}'></div>`
        }}></div>
    </div>
  );
};
