import React, { useEffect, useRef } from "react";
import { useDebounce, useThrottle } from "react-use";
import { segmentify } from "../../utils/segmentify";
import style from "./pagePreview.module.sass";

export const PagePreview: React.FC = ({ children }) => {
  const sourceRef = useRef<any>();
  const resultRef = useRef();

  useDebounce(
    () => {
      const source = sourceRef.current?.children[0];
      if (!source || !resultRef.current) {
        return;
      }
      segmentify(source, resultRef.current);
      window.status = "ready";
    },
    100,
    [children],
  );

  return (
    <>
      <div className="page-preview-source" ref={sourceRef}>
        {children}
      </div>
      <div className="generated-preview" ref={resultRef} />
    </>
  );
};

export const ConstantPage: React.FC = ({ children }) => {
  const sourceRef = useRef<any>();
  const resultRef = useRef();

  useEffect(() => {
    const source = sourceRef.current?.children[0];
    if (!source || !resultRef.current) {
      return;
    }
    segmentify(source, resultRef.current);
    window.status = "ready";
  }, []);

  return (
    <>
      <div className="page-preview-source" ref={sourceRef}>
        {children}
      </div>
      <div className="generated-preview" ref={resultRef} />
    </>
  );
};
