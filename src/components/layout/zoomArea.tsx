import React, { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue, UpdateAction } from "react-quick-pinch-zoom";
import { useIsMounted } from "../../utils/ssr";

const Zoom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>();

  const onUpdate = useCallback((action: UpdateAction) => {
    const value = make3dTransformValue(action);
    wrapperRef.current!.style.setProperty("transform", value);
  }, []);

  return (
    <div className="h-full w-full">
      <QuickPinchZoom draggableUnZoomed onUpdate={onUpdate} containerProps={{style: {height: "100vh"}}}>
        <div ref={wrapperRef as any} className="cursor-grab overflow-auto min-h-screen w-full p-4 flex items-center justify-center lg:items-start">
        {children}
        </div>
      </QuickPinchZoom>
    </div>
  );
};

export const ZoomArea: React.FC<{ children: React.ReactNode }> = (props) => {
  const mounted = useIsMounted();
  if (!mounted) {
    return null;
  }
  return <Zoom {...props}/>
}