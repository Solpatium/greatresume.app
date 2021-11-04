// @refresh reset
// React spring throws an error with fast refresh
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGesture } from "react-use-gesture";
import { useMeasure, useUpdate } from "react-use";
import { animated, useSpring } from "react-spring";

export const getScaleTranslation = (
  scale: number,
  origin: number,
  previousTranslation = 0,
): number => origin * (1 - scale) + previousTranslation * scale;

interface ZoomAreaRefState {
  prePinch: {
    scroll: { x: number; y: number };
    pinch: { x: number; y: number };
  };
  previous: {
    translate: { x: number; y: number };
    scale: number;
  };
}

export const ZoomArea: React.FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const [sizingRef, measure] = useMeasure<HTMLDivElement>();
  const { width, height } = measure;
  // const sizeRef = useRefValue(size);
  const zoomValue = useRef(2);
  const prePinchRef = useRef<{
    scroll: { top: number; left: number };
    pinch: { x: number; y: number };
  }>({ scroll: { top: 0, left: 0 }, pinch: { x: 0, y: 0 } });

  const previousRef = useRef({ translateX: 0, translateY: 0, scale: 2 });
  const update = useUpdate();
  const scaleInProgress = useRef(false);
  const animationInProgress = useRef(false);
  const [event, setEvent] = useState<any>();
  const previousFrameScroll = useRef<number>(undefined);

  const [springProps, set] = useSpring(() => ({
    scale: 1.5,
    onFrame: ({ scale }) => {
      const translateX = getScaleTranslation(
        scale / previousRef.current.scale,
        prePinchRef.current.pinch.x,
        previousRef.current.translateX,
      );
      const translateY = getScaleTranslation(
        scale / previousRef.current.scale,
        prePinchRef.current.pinch.y,
        previousRef.current.translateY,
      );
      const currentScroll = wrapperRef.current.scrollTop;
      // There was a scroll from a user in the meantime, we should stop all animations
      if (
        previousFrameScroll.current !== undefined &&
        Math.abs(previousFrameScroll.current - currentScroll) > 10
      ) {
        setEvent({ previous: previousFrameScroll.current, currentScroll });
        // set({ scale: springProps.scale.getValue(), immediate: true });
        return;
      }
      setEvent("SAME");
      console.log({ previous: prePinchRef.current.scroll.top });
      const x = -translateX;
      const y = -translateY;
      console.log({ x, y });
      wrapperRef.current.scroll(x, y);
      previousFrameScroll.current = wrapperRef.current.scrollTop;
    },
    // onStart: () => {
    //   animationInProgress.current = true;
    // },
    // onRest: () => {
    //   animationInProgress.current = false;
    //   console.log("REST");
    //   // We need to disable will-change: transform
    //   setTimeout(() => update(), 20);
    // },
  }));

  const props = useGesture(
    {
      onPinchStart: state => {
        const scale = zoomValue.current;
        previousRef.current = {
          scale,
          translateX: -wrapperRef.current.scrollLeft,
          translateY: -wrapperRef.current.scrollTop,
        };
        previousFrameScroll.current = wrapperRef.current.scrollTop;
        const { left, top } = wrapperRef.current.getBoundingClientRect();
        const [documentX, documentY] = state.origin;
        // Why does it work?!
        const x = documentX - left; // + wrapperRef.current.scrollLeft;
        const y = documentY - top + wrapperRef.current.scrollTop;
        console.log("SCROLL TOP ", wrapperRef.current.scrollTop);
        prePinchRef.current = {
          scroll: {
            top: wrapperRef.current.scrollTop,
            left: wrapperRef.current.scrollLeft,
          },
          pinch: { x, y },
        };
        // update();
        scaleInProgress.current = true;
      },
      onPinchEnd: () => {
        scaleInProgress.current = false;
        // update();
      },
      onPinch: state => {
        if (!state.intentional) {
          return;
        }
        const [velocity] = state.velocities;
        const { current } = zoomValue;
        // touchpad events have a much bigger velocity
        const scale = state.event instanceof WheelEvent ? 0.05 : 0.3;
        zoomValue.current = Math.min(3, Math.max(0.4, current + velocity * scale));
        // console.log({ scale: zoomValue.current });
        set({
          scale: zoomValue.current,
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

  // const { zoom, height, width } = measures.current;
  console.log("SIZE", { width, height });
  return (
    <div className="h-full w-full">
      {/*<pre>{JSON.stringify(event, null, 2)}</pre>*/}
      <div id="xdd" ref={wrapperRef} {...props} className="cursor-move overflow-auto h-full w-full">
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
            width: springProps.scale.interpolate((v: number) =>
              width ? `${width * v}px` : "100%",
            ),
            height: springProps.scale.interpolate((v: number) =>
              height ? `${height * v}px` : "100%",
            ),
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
              transform: springProps.scale.interpolate((v: number) => `scale(${v})`),
              width: springProps.scale.interpolate(() => (width ? `${width}px` : "100%")),
              height: springProps.scale.interpolate(() => (height ? `${height}px` : "100%")),
              transformOrigin: "top left",
            }}>
            <div ref={sizingRef} style={{ width: "max-content", boxSizing: "border-box" }}>
              {/*<div className="p-4">*/}
              {children}
              {/*</div>*/}
            </div>
          </animated.div>
        </animated.div>
      </div>
    </div>
  );
};
