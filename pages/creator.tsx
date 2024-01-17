import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { Editor } from "../src/components/organisms/steps";
import { useIsMounted } from "../src/utils/ssr";
import { useCreatePdf } from "../src/resumes";
import cn from "classnames";
import useTranslation from "next-translate/useTranslation";
import { PdfViewer } from "../src/components/organisms/pdfViewer";
import { AppStateProvider, usePdfState } from "../src/state/store";
import 'react-markdown-editor-lite/lib/index.css';
import { useRouter } from "next/router";
import { MobilePreviewButton } from "../src/components/organisms/mobilePreviewButton";
import { useSnapshot } from "valtio";
import { useHistoryPush, useIsLarge, useIsMobile } from "../src/utils/hooks";
import { useUnmount } from "react-use";

const BottomBar: React.FC = () => {
  // TODO: Accessiblity
  const state = usePdfState().previewState;
  const isPreviewing = useSnapshot(state).previewVisible;
  // useHistoryPush("/preview");
  // useEffect(() => {
    //   window.addEventListener("popstate", console.log)
    // }, []);
  const togglePreview = () => {
    state.previewVisible = !state.previewVisible;
  };
  const history = useHistoryPush("preview", togglePreview);
  return <div className="w-[100dvw] h-[60px] flex fixed bottom-0 left-0 bg-indigo-900 text-white font-bold lg:hidden">
    <div 
      className="w-[30px] h-[2px] bg-white absolute bottom-[10px] m-auto left-0 right-0" 
      style={{transition: "transform 0.3s", transform: `translate(${isPreviewing ? "25dvw" : "-25dvw"}, 0)`}}/>
    <button className="w-[50%]" style={{opacity: isPreviewing ? "70%" : ""}} disabled={!isPreviewing} onClick={() => {
      history.maybePop();
      togglePreview();
    }}>EDIT</button>
    <button className="w-[50%]" style={{opacity: !isPreviewing ? "70%" : ""}} disabled={isPreviewing} onClick={() => {
      history.push();
      togglePreview();
    }}>PREVIEW</button>
  </div>
}

const Creator: React.FC = () => {
  useCreatePdf();
  const { t } = useTranslation("app");
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const isPreviewing = useSnapshot(usePdfState().previewState).previewVisible;
  const isLarge = useIsLarge();

  // We don't want it to lose state
  const commonClasses = "h-full min-w-[100dvw] w-[100dvw] h-[100dvh] lg:min-w-[50%] lg:w-[50%] snap-center";
  return (
    <>
      <Head>
        <title>{t`page-title`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <div className="overflow-hidden w-[100dvw] h-screen h-[100dvh]">
        <div 
          className={"pb-0 w-[200dvw] h-screen h-[100dvh] lg:w-[100dvw] flex"} 
          style={{transform: !isLarge && isPreviewing ? "translate(-100dvw, 0)" : "", transition: "transform 0.3s"}}>
          <div ref={editorRef} className={cn(commonClasses, "overflow-y-scroll overflow-x-hidden pt-2 lg:p-4 lg:rtl lg:static")}>
            <Editor className={cn("ltr", "block pb-[120px] lg:p-0 lg:max-w-[1000px]")} />
          </div>
          <div
            ref={previewRef}
            className={cn(
              commonClasses,
              "overflow-hidden relative lg:top-0",
            )}
          >
            <PdfViewer />
          </div>
        </div>
      </div>
      <BottomBar/>
    </>
  );
};

export const Loader: React.FC = () => {
  const mounted = useIsMounted();

  if (!mounted) {
    return null;
  }

  return <AppStateProvider><Creator /></AppStateProvider>;
};

export default Loader;