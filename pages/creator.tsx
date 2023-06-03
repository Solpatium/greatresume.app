import React, { useCallback, useEffect, useRef, useState } from "react";
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

const Creator: React.FC = () => {
  useCreatePdf();
  const { t } = useTranslation("app");
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const isPreviewing = useSnapshot(usePdfState().previewState).previewVisible;
  const togglePreview = useCallback(() => {
    if (isPreviewing) {
      editorRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      previewRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isPreviewing, router]);

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
      <div className={"pb-0 w-[100dvw] h-screen h-[100dvh] overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory"}>
        <div ref={editorRef} className={cn(commonClasses, "overflow-y-scroll overflow-x-hidden lg:p-4 lg:rtl lg:static")}>
          <Editor className={cn("ltr", "block pb-[120px] lg:p-0 lg:max-w-[1000px]")}/>
        </div>
        <div
          ref={previewRef}
          className={cn(
            commonClasses,
            "overflow-hidden relative lg:top-0",
          )}
        >
          <PdfViewer/>
        </div>
        <MobilePreviewButton isPreviewing={isPreviewing} togglePreview={togglePreview} />
      </div>
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
