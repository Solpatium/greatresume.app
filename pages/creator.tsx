import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { useRouter } from "next/router";
import { MobileInfoToggle } from "../src/components/molecules/mobileToggleInfo";
import { useIsVisible } from "../src/utils/hooks";
import { useToggle } from "react-use";


const Creator: React.FC = () => {
  const { t } = useTranslation("app");
  const router = useRouter();
  const { resume, download, loading } = useRenderResume();
  const mobilePreviewToggleRef = useRef<HTMLButtonElement>(null);
  const [hasPreviewToggle, toggleHasPreviewToggle] = useToggle(false);
  useIsVisible(mobilePreviewToggleRef, toggleHasPreviewToggle);

  const isPreviewing = router.asPath.split("#")[1] === "preview";

  // In case someone opened a link with the preview hash there is no history entry to go back
  const pushed = useRef(false);
  const togglePreview = useCallback(() => {
    if (isPreviewing) {
      if (pushed) {
        router.back();
        pushed.current = false;
      } else {
        router.replace({ hash: undefined }, undefined, { shallow: true, scroll: false });
      }
    } else {
      router.push({ hash: "preview" }, undefined, { shallow: true });
      pushed.current = true;
    }
  }, [isPreviewing, router]);

  // We don't want it to lose state
  const hiddenClass = "absolute top-[-100%]";
  return (
    <>
      <Head>
        <title>{t`page-title`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <div className="lg:pb-0 lg:h-screen lg:h-[100dvh] overflow-y-hidden lg:grid grid-cols-1 lg:grid-cols-2">
        <div className={cn("h-full w-full overflow-y-scroll lg:p-4 md:rtl lg:static", isPreviewing && hiddenClass)}>
          <Editor
            download={download ?? undefined}
            className={cn("ltr", "block pb-[120px] lg:p-0")}
          />
        </div>
        <div
          className={cn(
            "w-full h-screen h-[100dvh] overflow-hidden lg:relative lg:top-0",
            !isPreviewing && hiddenClass
          )}
        >
          <PdfViewer
            resume={resume ?? undefined}
            newPdfGenerating={loading}
            download={download}
            isMobilePreview={isPreviewing}
          />
        </div>
        <div className="lg:hidden fixed bottom-3 right-3 flex flex-col">
          {hasPreviewToggle && <MobileInfoToggle />}

          <ActionButton
            ref={mobilePreviewToggleRef}
            onClick={togglePreview}
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
