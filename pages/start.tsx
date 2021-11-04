import React, { useMemo } from "react";
import Head from "next/head";
import { Theme } from "../src/utils/theme";
import { useResumeStorage } from "../src/utils/storage";
import { useRouter } from "next/router";
import { useIsMounted } from "../src/utils/ssr";
import { useDropzone } from "react-dropzone";
import { SelectableBox } from "../src/components/atoms/selectableBox";
import useTranslation from "next-translate/useTranslation";

const ImportResume: React.FC<{ dragging?: boolean }> = ({ dragging }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: console.log,
    accept: ".json",
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <SelectableBox
        wrapper="div"
        answer="📤 Import data"
        explanation={dragging ? "Drop your file here." : "Use resume created previously."}
      />
      <input {...getInputProps()} />
    </div>
  );
};

const StorageSettings: React.FC = () => {
  const { t } = useTranslation("data-options");
  const mounted = useIsMounted();
  const { push } = useRouter();
  const { getResume } = useResumeStorage();
  const resume = useMemo(() => (mounted ? getResume() : undefined), [getResume, mounted]);
  const { getRootProps, isDragActive } = useDropzone();

  return (
    <>
      <Head>
        <title>{t`page-title`}</title>
      </Head>
      <Theme>
        <div
          className="flex align-center justify-center min-h-screen"
          {...getRootProps()}
          tabIndex={undefined}>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 m-auto max-w-md text-center">
            <h3 className="font-regular text-medium col-span-full uppercase font-semibold text-gray-600">
              <span className="text-lg">🗄️ </span> {t("page-title")}
            </h3>
            <h1 className="font-fancy text-4xl col-span-full mb-0">{t`question`}</h1>
            {resume && (
              <SelectableBox
                className="col-span-full"
                onClick={() => {
                  push("/creator");
                }}
                answer={`📄 ${t`responses.continue-editing.title`}`}
                explanation={t("responses.continue-editing.description", {
                  date: resume.lastUpdate.toLocaleDateString(),
                })}
              />
            )}
            <SelectableBox
              onClick={() => {
                push("/creator");
              }}
              answer={`✨ ${t`responses.start-fresh.title`}`}
              explanation={t`responses.start-fresh.description`}
            />
            <ImportResume dragging={isDragActive} />
          </form>
        </div>
      </Theme>
    </>
  );
};

export default StorageSettings;
