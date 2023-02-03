import React, { useState } from "react";
import Head from "next/head";
import { Editor } from "../src/components/organisms/steps";
import { useIsMounted } from "../src/utils/ssr";
import { useRenderResume } from "../src/resumes";
import cn from "classnames";
import useTranslation from "next-translate/useTranslation";
import { PdfViewer } from "../src/components/organisms/pdfViewer";
import { AppStateProvider, useAppState } from "../src/state/store";
import 'react-markdown-editor-lite/lib/index.css';
import { PencilIcon, EyeIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { ActionButton } from "../src/components/atoms/button";

const Creator: React.FC = () => {
  const { t } = useTranslation("app");
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { resume, download, loading } = useRenderResume();
  return (
    <>
      <Head>
        <title>{t`page-title`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <div className="lg:pb-0 h-screen overflow-y-hidden lg:grid grid-cols-1 lg:grid-cols-2">
        <div className={cn("h-full w-full overflow-y-scroll lg:p-4 md:rtl lg:static", isPreviewing && "absolute top-[-100%]")}>
          <Editor
            download={download ?? undefined}
            className={cn("ltr", "block pb-20 lg:p-0")}
          />
        </div>
        <div
          className={cn(
            "relative min-h-screen w-full h-screen overflow-hidden",
          )}
        >
          <PdfViewer
            resume={resume ?? undefined}
            newPdfGenerating={loading}
            download={download}
          />
        </div>
        <div className="lg:hidden fixed bottom-3 right-3 flex flex-col">
          <ActionButton
            onClick={() => setIsPreviewing(v => !v)}
            className="w-[80px] h-[80px] rounded-full"
          >
            {isPreviewing ?
              <>
                <span className="sr-only">{t`edit`}</span>
                <PencilIcon aria-hidden className="w-[30px]" />
              </> :
              <>
                <span className="sr-only">{t`view`}</span>
                <DocumentIcon aria-hidden className="w-[30px]" />
              </>}
          </ActionButton>
        </div>
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
