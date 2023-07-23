import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useResize, useIsVisible } from "../../utils/hooks";
import { useAsync } from "react-use";
import { PDFDocumentProxy } from "pdfjs-dist";
import { ActionButton, Button } from "../atoms/button";
import { PlusIcon, MinusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import useTranslation from "next-translate/useTranslation";
import cn from "classnames";
import { subscribe, useSnapshot } from "valtio";
import { PdfState, usePdfState } from "../../state/store";
import spinner from "../../../public/images/spinner.svg"
import Image from "next/image"

const workerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

class Controller {
  constructor(
    private pdfStateProxy: PdfState,
    private wrapper: HTMLDivElement,
    private container: HTMLDivElement,
    private onRescale: (scale: number) => void,
  ) { }

  public init(): () => void {
    return subscribe(this.pdfStateProxy.rendered, () => {
      if (this.pdfStateProxy.rendered.file) {
        this.refreshPdf(this.pdfStateProxy.rendered.file);
      }
    });
  }

  private visible: boolean = false;
  public setVisible(value: boolean) {
    this.visible = value;
    this.pdfStateProxy.previewState.previewVisible = value;
    if (this.visible && this.pdfIndex != this.renderedPdfIndex && this.pdfStateProxy.rendered.file) {
      this.refreshPdf(this.pdfStateProxy.rendered.file);
    }
  }

  private scale?: number | undefined;
  public setScale(value: number | undefined) {
    if (value === this.scale) {
      return;
    }
    this.scale = value;
    this.render();
  }

  public handleResize() {
    if (this.visible) {
      // Rerender with updated scale.
      this.render(true);
    }
  }

  private pdfjs: any;
  private async refreshPdf(resume: Blob) {
    this.pdfIndex += 1;

    this.pdfjs = this.pdfjs || await import("pdfjs-dist");
    if (!this.pdfjs.GlobalWorkerOptions.workerSrc) {
      this.pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
    }

    if (!this.visible) {
      return;
    }

    this.pdfStateProxy.renderingState.renderingInProgress = true;

    const timeLabel = `Parsed PDF ${this.pdfIndex}`;
    console.time(timeLabel);
    try {
      const url = URL.createObjectURL(resume);
      const newPdf = await this.pdfjs.getDocument(url).promise;
      URL.revokeObjectURL(url);

      const oldPdf = this.pdf;
      this.pdf = newPdf;
      if (oldPdf) {
        oldPdf.cleanup(true).catch(console.error);
        if (this.visible) {
          // Just rerender existing
          this.render();
        }
      } else {
        // First render
        this.render(true);
      }
    } finally {
      console.timeEnd(timeLabel);
    }
  }

  private rerenderInProgress?: Promise<void>;
  public async render(updateScale: boolean = false) {
    const pdf = this.pdf;
    if (!pdf || !this.visible) {
      return;
    }

    if (this.rerenderInProgress) {
      return this.rerenderInProgress;
    }

    const pdfIndex = this.pdfIndex;
    this.rerenderInProgress = (async () => {
      const timeLabel = `Rendering PDF #${this.pdfIndex}`;
      console.time(timeLabel)
      const newCanvases = [...new Array(pdf.numPages)].map(
        () => document.createElement("canvas")
      );

      const deviceScale = window.devicePixelRatio;
      const wrapperWidth = this.wrapper.clientWidth;
      for (const [i, canvas] of newCanvases.entries()) {
        const page = await pdf.getPage(i + 1);

        const viewport = page.getViewport({ scale: 1 });
        if (updateScale || this.scale === undefined) {

          const padding = 60;
          const calculatedScale = wrapperWidth / (viewport.width + padding);
          // We don't want it to be too big
          this.scale = Math.min(1.5, calculatedScale);
          this.onRescale(this.scale);
        }

        const width = viewport.width * this.scale;
        const height = viewport.height * this.scale;
        canvas.height = height * deviceScale;
        canvas.width = width * deviceScale;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const renderContext = {
          canvasContext: canvas.getContext("2d")!,
          viewport: page.getViewport({ scale: this.scale * deviceScale }),
        };

        await page.render(renderContext).promise;
      }

      this.container.replaceChildren(...newCanvases);
      this.rerenderInProgress = undefined;
      this.pdfStateProxy.renderingState.renderingInProgress = false;
      this.renderedPdfIndex = pdfIndex;
      console.timeEnd(timeLabel);
    })();
  }

  private pdfIndex = 0;
  private renderedPdfIndex = 0;
  private pdf?: PDFDocumentProxy;
}

const DownloadButton: React.FC = () => {
  const { t } = useTranslation("app");
  const download = useSnapshot(usePdfState().rendered).download;
  if (!download) {
    return null;
  }

  return <ActionButton
    onClick={download}
    icon={ArrowDownTrayIcon}
  >
    {t`save`}
  </ActionButton>
}

const steps = [0.33, 0.5, 0.67, 0.75, 1, 1.1, 1.25, 1.5, 1.75, 2];
const ZoomControl: React.FC<{
  zoom: number,
  setZoom: (value: number) => void,
  reset: () => void,
}> = ({ zoom, setZoom, reset }) => {
  const { t } = useTranslation("app");
  let currentIndex = 0;
  for (let [index, step] of steps.entries()) {
    if (step <= zoom) {
      currentIndex = index;
    }
  }

  return (
    <div className={
      "flex items-end md:items-stretch flex-row absolute left-3 md:right-3 md:right-0 bottom-3 md:bottom-10 justify-center gap-3"}
    >
      <div className="flex flex-col gap-1 p-1 md:flex-row md:gap-3 md:p-3 bg-indigo-100 rounded-2xl shadow-xl items-center">
        <Button
          disabled={currentIndex === 0}
          onClick={() => setZoom(steps[currentIndex - 1] ?? 100)}
          className="p-2 block w-full md:w-auto md:p-4"
          ghost
        >
          <span className="sr-only">Zoom out</span>
          <MinusIcon aria-hidden width={24} />
        </Button>
        <span className="w-10 hidden md:flex justify-center items-center text-lg">
          <span className="sr-only">Zoom:</span> {Math.floor(zoom * 100)}%
        </span>
        <Button
          disabled={currentIndex === steps.length - 1}
          onClick={() => setZoom(steps[currentIndex + 1] ?? 100)}
          className="p-2 w-full md:w-auto md:p-4 flex justify-center"
          ghost
        >
          <span className="sr-only">Zoom in</span>
          <PlusIcon aria-hidden width={24} />
        </Button>
        {/* </div> */}
        <div aria-hidden className="hidden md:block sm:h-[30px] sm:w-[1px] bg-gray-500" />
        <Button ghost className="hidden md:block" onClick={reset}>{t`reset`}</Button>
      </div>
      <DownloadButton />
    </div>
  )
}

const LoadingIndicator: React.FC = () => {
  const loading = useSnapshot(usePdfState().renderingState);
  if (loading.pdfCreationInProgress || loading.renderingInProgress) {
    return (
        <Image className="absolute inset-x-0 inset-y-0 m-auto w-[60%] md:w-[50%] lg:w-[30%]" alt="Loading" src={spinner} />
    );
  }
  return null;
}

export const PdfViewer: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);

  const pdfStateProxy = usePdfState();
  const controller = useRef<Controller>(undefined as any);
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!container || !wrapper) {
      throw Error("Controller not attached.");
    }

    controller.current = new Controller(pdfStateProxy, wrapper, container, setZoom);
  }, [pdfStateProxy]);
  // useEffect runs after useLayoutEffect.
  useEffect(() => {
    return controller.current.init();
  }, []);

  // During the first render controller.current is not set.
  useResize(() => controller.current.handleResize());
  // We want to render resume only when it is visble
  useIsVisible(containerRef, (isVisible) => controller.current.setVisible(isVisible));

  return (
    <div className="w-full h-full overflow-auto flex flex-col flex-wrap items-center" ref={wrapperRef}>
      <LoadingIndicator />
      <ZoomControl
        zoom={zoom}
        setZoom={(value) => {
          setZoom(value);
          controller.current.setScale(value);
        }}
        reset={() => controller.current.render(true)}
      />
      <div className="py-[30px] pdf-container" ref={containerRef}></div>
    </div>
  );
};
