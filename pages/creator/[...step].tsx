// @refresh reset

import React, { useMemo, useState } from "react";
import Head from "next/head";
import { Theme } from "../../src/utils/theme";
import { Editor } from "../../src/components/organisms/steps";
import { useIsMounted } from "../../src/utils/ssr";
import { useRenderResume } from "../../src/resumes";
import cn from "classnames";
import { ZoomArea } from "../../src/components/layout/zoomArea";
import { Icon } from "../../src/components/atoms/icon";
import useTranslation from "next-translate/useTranslation";
import { PdfViewer } from "../../src/components/organisms/pdfViewer";
import { AppStateProvider } from "../../src/state/store";
import 'react-markdown-editor-lite/lib/index.css';

const Creator: React.FC = () => {
  const { t } = useTranslation("app");
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { url, download, loading } = useRenderResume();

  return (
    <>
      <Head>
        <title>{t`page-title`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Theme>
        {/* <PDFViewer showToolbar style={{width: "100%", height: "100vh"}}>
          <MyDocument />
        </PDFViewer> */}
        <div className="lg:pb-0 grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:h-screen overflow-y-scroll lg:p-4 rtl">
            <Editor
              className={cn("ltr", isPreviewing ? "hidden" : "block pb-20 lg:p-0")}
            />
          </div>
          <div
            className={cn(
              isPreviewing ? "block" : "hidden",
              "relative max-w-full lg:block lg:h-screen lg:flex overflow-hidden",
            )}>
            <button
              type="button"
              className="hidden lg:block absolute bottom-4 left-0 m-auto right-0 z-50 text-black font-bold rounded-3xl p-4 w-28 bg-white mb-2 shadow-xl focus:outline-none	"
              onClick={download}>
              <Icon>💾</Icon> {t`export`}
            </button>
            <ZoomArea>{url ? <PdfViewer url={url} newPdfGenerating={loading} /> : null}</ZoomArea>
          </div>
          <div className="lg:hidden fixed bottom-3 right-3 flex flex-col">
            {isPreviewing && (
              <button
                type="button"
                className="text-black font-bold rounded-3xl p-4 w-28 bg-white mb-2 shadow-xl focus:outline-none	"
                onClick={download}>
                <Icon>💾</Icon> {t`export`}
              </button>
            )}
            <button
              type="button"
              className={cn(
                "text-black font-bold rounded-3xl p-4 w-28  bg-white focus:outline-none",
                isPreviewing ? "shadow-xl" : "red-glow",
              )}
              onClick={() => setIsPreviewing(v => !v)}>
              <Icon>{isPreviewing ? "🖊️" : "🚀"}</Icon>
              {isPreviewing ? t`edit` : t`view`}
            </button>
          </div>
        </div>
      </Theme>
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
