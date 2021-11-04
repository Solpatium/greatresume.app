import React, { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { Theme } from "../../src/utils/theme";
import { TwoPanes } from "../../src/components/layout/twoPanes";
import styled from "styled-components";
import { SectionSet } from "../../src/components/organisms/steps";
import { useIsMounted } from "../../src/utils/ssr";
import { PagePreview } from "../../src/components/layout/pagePreview";
import Preview from "../../src/templates";
import cn from "classnames";
import { ZoomArea } from "../../src/components/layout/zoomArea";
import { useDataUrl } from "../../src/utils/blob";
import { Icon } from "../../src/components/atoms/icon";
import { useResumeData } from "../../src/utils/storage";
import useTranslation from "next-translate/useTranslation";

const Wrapper = styled.div`
  @media print {
    .hide-on-print {
      display: none;
    }
    ${TwoPanes} {
      display: block;
      margin: 0;
      padding: 0;
    }
  }
`;

const Creator: React.FC = () => {
  const { t } = useTranslation("app");
  const [isPreviewing, setIsPreviewing] = useState(false);
  const mounted = useIsMounted();
  const [data, setData] = useResumeData();
  const image = useDataUrl(data.image);
  const dataWithDataUrlImage = useMemo(() => ({ ...data, image }), [image, data]);

  const [, setIsLoading] = useState(false);
  const onExport = useCallback(
    async (e: React.UIEvent) => {
      setIsLoading(true);
      console.log("EXPORT", data);
      e.preventDefault();
      return fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "export.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [data],
  );

  if (!mounted) {
    return null;
  }

  return (
    <Wrapper>
      <Head>
        <title>{t`page-title`}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Theme>
        <div className="lg:pb-0 grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:h-screen overflow-y-scroll lg:p-4 rtl">
            <SectionSet
              className={cn("ltr", isPreviewing ? "hidden" : "block pb-20 lg:p-0")}
              state={dataWithDataUrlImage}
              setState={setData}
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
              onClick={onExport}>
              <Icon>💾</Icon> {t`export`}
            </button>
            <ZoomArea>
              <PagePreview>
                <Preview data={dataWithDataUrlImage} />
              </PagePreview>
            </ZoomArea>
          </div>
          <div className="lg:hidden fixed bottom-3 right-3 flex flex-col">
            {isPreviewing && (
              <button
                type="button"
                className="text-black font-bold rounded-3xl p-4 w-28 bg-white mb-2 shadow-xl focus:outline-none	"
                onClick={onExport}>
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
    </Wrapper>
  );
};

export default Creator;
