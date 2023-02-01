import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PaperSize } from "../../models/v1";

import { useResize, useIsVisible } from "../../utils/hooks";
import { useAsync } from "react-use";
import { PDFDocumentProxy } from "pdfjs-dist";
import { Button } from "../atoms/button";

export interface PdfViewerProps {
  resume?: Blob;
  paperSize: PaperSize;
  newPdfGenerating: boolean;
}

const workerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";


class Controller {
  public pdf?: PDFDocumentProxy;

  constructor(
    private wrapper: HTMLDivElement,
    private container: HTMLDivElement,
    private onRescale: (scale: number) => void,
  ) { }

  private _visible: boolean = false;
  public set visible(value: boolean) {
    this._visible = value;
    this.render();
  }

  private _scale?: number | undefined;
  public set scale(value: number | undefined) {
    if (value === this._scale) {
      return;
    }
    this._scale = value;
    this.render();
  }

  async updatePdf(resume: Blob) {
    const lib = await import("pdfjs-dist");
    lib.GlobalWorkerOptions.workerSrc = workerUrl;
    const url = URL.createObjectURL(resume);
    const newPdf = await lib.getDocument(url).promise;

    URL.revokeObjectURL(url);
    const oldPdf = this.pdf;
    this.pdf = newPdf;
    if (oldPdf) {
      oldPdf.cleanup(true).catch(console.error);
      // First render
      this.render(true);
    } else {
      // Jest rerender
      this.render();
    }
  }

  private rerenderInProgress?: Promise<void>;
  async render(updateScale: boolean = false) {
    const pdf = this.pdf;
    if (!pdf || !this._visible) {
      return;
    }

    if (this.rerenderInProgress) {
      return this.rerenderInProgress;
    }

    this.rerenderInProgress = (async () => {
      const newCanvases = [...new Array(pdf.numPages)].map(
        () => document.createElement("canvas")
      );

      const wrapperWidth = this.wrapper.clientWidth;
      for (const [i, canvas] of newCanvases.entries()) {
        const page = await pdf.getPage(i + 1);

        const viewport = page.getViewport({ scale: window.devicePixelRatio });
        if (updateScale || this._scale === undefined) {

          const padding = 60;
          // We don't want it to be too big
          this._scale = Math.min(2, wrapperWidth / (viewport.width + padding));
          this.onRescale(this._scale);
        }

        console.log({ scale: this._scale, wrapperWidth });
        const width = viewport.width * this._scale;
        const height = viewport.height * this._scale;
        canvas.height = height;
        canvas.width = width;
        const renderContext = {
          canvasContext: canvas.getContext("2d")!,
          viewport: page.getViewport({ scale: this._scale * window.devicePixelRatio }),
        };

        await page.render(renderContext).promise;
      }

      this.container.replaceChildren(...newCanvases);
      this.rerenderInProgress = undefined;
    })();
  }
}

const useController = (
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  onRescale: (scale: number) => void,
): MutableRefObject<Controller> => {
  // Controller must be attached at all time
  const controller = useRef<Controller>(undefined as any);
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!container || !wrapper) {
      throw Error("Controller not attached.");
    }

    controller.current = new Controller(wrapper, container, onRescale);
  }, []);

  return controller;
}

const steps = [0.33, 0.5, 0.67, 0.75, 1, 1.1, 1.25, 1.5, 1.75, 2];
const ZoomControl: React.FC<{ zoom: number, setZoom: (value: number) => void, reset: () => void }> = ({ zoom, setZoom, reset }) => {
  let currentIndex = 0;
  for (let [index, step] of steps.entries()) {
    if (step <= zoom) {
      currentIndex = index;
    }
  }

  return (
    <div className="flex flex-row fixed md:absolute left-3 md:right-3 md:right-0 bottom-3 md:bottom-10 justify-center">
      <div className="flex flex-col gap-1 p-1 md:flex-row md:gap-3 md:p-3 bg-white rounded-2xl shadow-xl items-center">
        {/* <div className="flex flex-row gap-2"> */}

        <Button
          disabled={currentIndex === 0}
          onClick={() => setZoom(steps[currentIndex - 1] ?? 100)}
          className="p-2 w-full md:w-auto md:p-4"
          ghost
        >
          <span className="sr-only">Zoom out</span>
          <span className="text-lg" aria-hidden>–</span>
        </Button>
        <span className="w-10 flex justify-center items-center text-lg">
          <span className="sr-only">Zoom:</span> {Math.floor(zoom * 100)}%
        </span>
        <Button
          disabled={currentIndex === steps.length - 1}
          onClick={() => setZoom(steps[currentIndex + 1] ?? 100)}
          className="p-2 w-full md:w-auto md:p-4"
          ghost
        >
          <span className="sr-only">Zoom in</span>
          <span className="text-lg" aria-hidden>+</span>
        </Button>
        {/* </div> */}
        <div aria-hidden className="hidden md:block sm:h-[30px] sm:w-[1px] bg-gray-500" />
        <Button ghost onClick={reset}>Reset</Button>
      </div>
    </div>
  )
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ resume, paperSize, newPdfGenerating }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);

  const controller = useController(wrapperRef, containerRef, setZoom)

  // We want to render resume only when it is visble
  const documentState = useAsync(async () => {
    if (resume) {
      controller.current.updatePdf(resume);
    }
  }, [resume, controller]);

  useIsVisible(containerRef, (isVisible) => {
    controller.current.visible = isVisible;
  });

  useResize(() => controller.current.render(true));

  useEffect(() => {
    controller.current.scale = zoom;
  }, [zoom]);

  return (
    <div className="w-full h-full overflow-auto flex flex-col flex-wrap justify-center items-center md:justify-start" ref={wrapperRef}>
      {(documentState.loading || newPdfGenerating) && (
        <div className="absolute inset-x-0 margin-auto text-center top-1/2 text-xl">Loading...</div>
      )}
      <ZoomControl
        zoom={zoom}
        setZoom={setZoom}
        reset={() => controller.current.render(true)}
      />
      <div className="py-[30px]" ref={containerRef}></div>
    </div>
  );
};
