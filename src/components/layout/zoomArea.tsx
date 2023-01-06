import React, { useEffect, useRef } from "react";
import { useMeasure } from "react-use";
import { animated, useSpring } from "react-spring";
import { useGesture } from "@use-gesture/react";

export const getTranslation = (
  scale: number,
  origin: number,
  viewport: number,
  prevScale: number,
): number => (viewport * scale) / prevScale - origin * (1 - scale / prevScale);

type Point = { x: number; y: number };

interface ZoomAreaRefState {
  scale: number;
  prevScale: number;
  // Position of viewed part
  viewport: Point;
  // Origin position within the viewport
  origin: Point;
}

export const ZoomArea: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const [sizingRef, measure] = useMeasure<HTMLDivElement>();
  const { width, height } = measure;

  const refState = useRef<ZoomAreaRefState>({
    scale: 1,
    prevScale: 1,
    origin: { x: 0, y: 0 },
    viewport: { x: 0, y: 0 },
  });

  const [springProps, controller] = useSpring(() => ({
    scale: refState.current.scale,
    onChange: (_result, values) => {
      const { scale } = values.get();
      const { viewport, origin, prevScale } = refState.current;
      const translateY = getTranslation(scale, origin.y, viewport.y, prevScale);
      const translateX = getTranslation(scale, origin.x, viewport.x, prevScale);
      wrapperRef.current.scroll(translateX, translateY);
    },
  }));

  const props = useGesture(
    {
      onPinchStart: state => {
        controller.resume();
        const { left, top } = wrapperRef.current.getBoundingClientRect();
        const [documentX, documentY] = state.origin;
        const viewport = { x: wrapperRef.current.scrollLeft, y: wrapperRef.current.scrollTop };
        const origin = { x: documentX - left, y: documentY - top };
        refState.current = {
          ...refState.current,
          scale: refState.current.scale,
          prevScale: controller.current[0].get().scale,
          viewport,
          origin,
        };
      },
      onPinchEnd: () => {
        controller.stop();
      },
      onPinch: state => {
        if (!state.intentional) {
          return;
        }
        const [velocity] = state.velocity;
        const currentScale = refState.current.scale;
        // touchpad events have a much bigger velocity
        const scale = state.event instanceof WheelEvent ? 0.05 : 0.3;
        // zoomValue.current = Math.min(3, Math.max(0.4, currentScale + velocity * scale));
        const newScale = Math.min(3, Math.max(0.2, currentScale + velocity * scale));
        refState.current.scale = newScale;

        controller({ scale: newScale });
      },
    },
    { target: wrapperRef, eventOptions: { passive: false } },
  );

  // jumps because transition origin is suddenly different
  useEffect(() => {
    document.addEventListener("gesturestart", e => e.preventDefault());
    document.addEventListener("gesturechange", e => e.preventDefault());
  }, []);

  return (
    <div className="h-full w-full">
      <div id="xdd" ref={wrapperRef} {...props} className="cursor-move overflow-auto h-full w-full">
        <animated.div
          className="w-max relative m-auto p-4 lg:p-8"
          style={{
            pointerEvents: "none",
            boxSizing: "content-box",
            width: springProps.scale.to((v: number) => (width ? `${width * v}px` : "100%")),
            height: springProps.scale.to((v: number) => (height ? `${height * v}px` : "100%")),
          }}>
          <animated.div
            className="w-max"
            style={{
              ...springProps,
              width: springProps.scale.to(() => (width ? `${width}px` : "100%")),
              height: springProps.scale.to(() => (height ? `${height}px` : "100%")),
              transformOrigin: "top left",
            }}>
            <div ref={sizingRef} style={{ width: "max-content", boxSizing: "border-box" }}>
              {children}
            </div>
          </animated.div>
        </animated.div>
      </div>
    </div>
  );
};
