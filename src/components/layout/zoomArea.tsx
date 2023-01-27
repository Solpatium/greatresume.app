import { MagnifyingGlassPlusIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { PaperSize } from "../../models/v1";
import { useIsVisible } from "../../utils/hooks";
import { useIsMounted } from "../../utils/ssr";
import { Button } from "../atoms/button";

const steps = [33, 50, 67, 75, 90, 100, 110, 125, 150, 175, 200]
const minZoom = steps[0]!;
const maxZoom = 100;
const Zoom2: React.FC<{ children: React.ReactNode, paperSize: PaperSize }> = ({ children, paperSize }) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const parentRef = useRef<HTMLDivElement>();

  const [zoom, setZoom] = useState(100); // %
  const [adjusted, setAdjusted] = useState(false);

  const adjust = useCallback(() => {
    const wrapper = wrapperRef.current;
    const parent = parentRef.current;
    if (!wrapper || !parent) {
      return;
    }

    const { width: contentWidth } = wrapper.getBoundingClientRect();
    const { width: parentWidth } = parent.getBoundingClientRect();

    if (contentWidth === 0) {
      setZoom(100);
      return;
    }
    const newScaleFraction = parentWidth / contentWidth;
    const newScale = Math.floor(newScaleFraction * 100);

    // Make sure it doesn't get smaller/bigger than possible window
    setZoom(
      Math.min(maxZoom, Math.max(minZoom, newScale))
    );
  }, []);

  useIsVisible(parentRef, (visible) => {
    if (visible) {
      adjust();
    }
  });

  useEffect(() => {
    adjust();
    setAdjusted(true);
  }, [paperSize]);


  useEffect(() => {
    let handle: ReturnType<typeof setTimeout> | undefined;

    const handler = () => {
      if (handle) {
        clearTimeout(handle);
      }
      handle = setTimeout(adjust, 100);
    }
    addEventListener("resize", handler);
    return () => removeEventListener("resize", handler);
  }, [])

  let currentIndex = 0;
  for (let [index, step] of steps.entries()) {
    if (step <= zoom) {
      currentIndex = index;
    }
  }

  return (
    <div ref={parentRef as any} className="relative h-screen w-full">
      <div
        className="h-full w-full overflow-auto"
      >
        <div
          ref={wrapperRef as any}
          className="m-auto lg:my-0 flex w-max p-20 md:p-6"
          style={{
            zoom: zoom / 100,
            transformOrigin: "center, center",
            opacity: adjusted ? 1 : 0,
          }}
        >
          {children}
        </div>
      </div>
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
              <span className="sr-only">Zoom:</span> {zoom}%
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
          <Button ghost onClick={adjust}>Reset</Button>
        </div>
      </div>
    </div>
  );
};

export const ZoomArea: React.FC<{ children: React.ReactNode, paperSize: PaperSize }> = (props) => {
  const mounted = useIsMounted();
  if (!mounted) {
    return null;
  }
  return <Zoom2 {...props} />
}