// @refresh reset
// React spring throws an error with fast refresh
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGesture } from "react-use-gesture";
import { useMeasure, useUpdate } from "react-use";
import { Controller, animated, useSpring } from "react-spring";

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

export const ZoomArea: React.FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const [sizingRef, measure] = useMeasure<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>();
  const { width, height } = measure;
  // const sizeRef = useRefValue(size);

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
        console.log("PINCH START");
        const { left, top } = wrapperRef.current.getBoundingClientRect();
        const [documentX, documentY] = state.origin;
        // Why does it work?!
        const viewport = { x: wrapperRef.current.scrollLeft, y: wrapperRef.current.scrollTop };
        const origin = { x: documentX - left, y: documentY - top };
        refState.current = {
          ...refState.current,
          scale: refState.current.scale,
          prevScale: controller.current[0].get().scale,
          viewport,
          origin,
        };
        // update();
      },
      onPinchEnd: () => {
        controller.stop();
        console.log("PINCH END");
        // update();
      },
      onPinch: state => {
        if (!state.intentional) {
          return;
        }
        const [velocity] = state.velocities;
        const currentScale = refState.current.scale;
        // touchpad events have a much bigger velocity
        const scale = state.event instanceof WheelEvent ? 0.05 : 0.3;
        // zoomValue.current = Math.min(3, Math.max(0.4, currentScale + velocity * scale));
        const newScale = Math.min(3, Math.max(0.2, currentScale + velocity * scale));
        refState.current.scale = newScale;

        controller({
          scale: newScale,
          // immediate: false,
        });
        // update();
      },
    },
    { domTarget: wrapperRef, eventOptions: { passive: false } },
  );

  // jumps because transition origin is suddenly different
  useEffect(() => {
    document.addEventListener("gesturestart", e => e.preventDefault());
    document.addEventListener("gesturechange", e => e.preventDefault());
    document.addEventListener("touchmove", e => {
      // alert("TEST");
      // setEvent(e);
      // set({ scale: springProps.scale.getValue() });
      // console.log(e);
    });
  }, []);

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    console.log(e);
    const { left, top } = wrapperRef.current.getBoundingClientRect();
    const documentX = e.clientX;
    const documentY = e.clientY;
    const scale = refState.current.scale < 3 ? 3 : 2;
    const viewport = { x: wrapperRef.current.scrollLeft, y: wrapperRef.current.scrollTop };
    const origin = { x: documentX - left, y: documentY - top };
    console.log({ viewport, origin });
    refState.current = {
      ...refState.current,
      scale,
      origin,
      viewport,
      prevScale: refState.current.scale,
    };
    controller({
      scale,
      // immediate: false,
    });
  };

  // const { zoom, height, width } = measures.current;
  console.log("SIZE", { width, height });
  return (
    <div className="h-full w-full">
      {/*<pre>{JSON.stringify(event, null, 2)}</pre>*/}
      <div
        id="xdd"
        ref={wrapperRef}
        onClick={onClick}
        {...props}
        onScroll={() => console.log("SCROLL")}
        className="cursor-move overflow-auto h-full w-full">
        {/*<div className="font-bold absolute bg-red-100 z-50	">*/}
        {/*  {scaleInProgress.current ? "IN PROGRESS" : "NOT IN PROGRESS"}*/}
        {/*</div>*/}
        <animated.div
          // className="w-max relative"
          className="w-max relative m-auto p-4 lg:p-8"
          style={{
            pointerEvents: "none",
            // height: "90vh",
            boxSizing: "content-box",
            width: springProps.scale.to((v: number) => (width ? `${width * v}px` : "100%")),
            height: springProps.scale.to((v: number) => (height ? `${height * v}px` : "100%")),
          }}>
          {/*<animated.div*/}
          {/*  style={{*/}
          {/*    zIndex: 100,*/}
          {/*    height: "10px",*/}
          {/*    width: "10px",*/}
          {/*    position: "absolute",*/}
          {/*    background: "red",*/}
          {/*    top: springProps.scale.interpolate(*/}
          {/*      (scale: number) => `${prePinchRef.current.pinch.y}px`,*/}
          {/*    ),*/}
          {/*    left: springProps.scale.interpolate(*/}
          {/*      (scale: number) => `${prePinchRef.current.pinch.x}px`,*/}
          {/*    ),*/}
          {/*  }}*/}
          {/*/>*/}
          <animated.div
            className="w-max"
            style={{
              ...springProps,
              // willChange: springProps.scale.interpolate(v => {
              //   // console.log("run");
              //   // if (!animationInProgress.current) {
              //   //   console.log("NOT iN PROGRESSS");
              //   // }
              //   console.log(animationInProgress.current ? "transform" : "auto");
              //   return animationInProgress.current ? "transform" : "auto";
              // }),
              // transform: springProps.scale.to((v: number) => `scale(${v})`),
              width: springProps.scale.to(() => (width ? `${width}px` : "100%")),
              height: springProps.scale.to(() => (height ? `${height}px` : "100%")),
              transformOrigin: "top left",
            }}>
            <div ref={sizingRef} style={{ width: "max-content", boxSizing: "border-box" }}>
              <div ref={contentRef}>
                {/*<div className="p-4">*/}
                {children}
                {/*</div>*/}
              </div>
            </div>
          </animated.div>
        </animated.div>
      </div>
    </div>
  );
};
