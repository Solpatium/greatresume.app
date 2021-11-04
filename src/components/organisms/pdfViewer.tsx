import React, { useRef } from "react";
import { useAsync } from "react-use";
import { PaperSize } from "../../models/v1";

export interface PdfViewer {
  url: string;
  paperSize: PaperSize;
}

export const PdfViewer: React.FC<PdfViewer> = ({ url, paperSize }) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const canvases = useRef<HTMLCanvasElement[]>([]);
  const state = useAsync(async () => {
    if (!url) {
      return;
    }
    console.log(url);
    console.log(await import("pdfjs-dist"));
    const lib = await import("pdfjs-dist");
    lib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

    (await import("pdfjs-dist")).getDocument(url).promise.then(async d => {
      console.time("PDF");
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

      console.time("all pages");
      for (const [i, canvas] of canvases.current.entries()) {
        console.log("PAGES", d.numPages, i);
        const page = await d.getPage(i + 1);

        const viewport = page.getViewport({ scale: window.devicePixelRatio * 2 });
        // console.log(page.getViewport({ scale: 1 }));
        // console.log(page.view, "LAYOUT");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const ratio = viewport.width / viewport.height;
        console.log({ ratio });

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
        console.time("CONTEXT");
        const renderContext = {
          canvasContext: canvas.getContext("2d"),
          viewport: viewport,
        };
        console.timeEnd("CONTEXT");
        const renderTask = page.render(renderContext);
        await renderTask.promise;
        console.timeEnd("PDF");
      }
      console.timeEnd("all pages");
    });
  }, [url]);

  return (
    <>
      <h1>{state.loading && "Loading..."}</h1>
      <div className="pdf-renderer" ref={wrapperRef} />
    </>
  );
};
