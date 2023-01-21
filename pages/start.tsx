import React, { useMemo } from "react";
import Head from "next/head";
import { Theme } from "../src/utils/theme";
import { useResumeStorage } from "../src/utils/storage";
import { useRouter } from "next/router";
import { useIsMounted } from "../src/utils/ssr";
import { useDropzone } from "react-dropzone";
import { SelectableBox } from "../src/components/atoms/selectableBox";
import useTranslation from "next-translate/useTranslation";
import { useAppStateStorage, useGetLastUpdate } from "../src/state/storage";
import { DataExtractionError, getEmbededData } from "../src/utils/dataEmbeding";

const ImportResume: React.FC<{ dragging?: boolean }> = ({ dragging }) => {
  const { t } = useTranslation("data-options");
  const { push } = useRouter();
  const storage = useAppStateStorage();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: ([file]) => {
      if(!file) {
        alert(t`responses.importData.invalidFile`);
        return;
      }
      file.arrayBuffer()
      .then(getEmbededData)
      // TODO type
      .then(data => {
        storage.set({resume: data}) as any;
        push("/creator");
      })
      .catch(e => {
        if (e instanceof DataExtractionError) {
          alert(t`responses.importData.extractionError`);
        } else {
          console.error(e);
        }
      });
    },
    accept: ".pdf",
    multiple: false,
  });

  return (
    <button type="button" {...getRootProps()} className="cursor-pointer">
      <SelectableBox
        wrapper="div"
        answer={`📤 ${t("responses.importData.fileDropText")}`}
        explanation={dragging ? t`responses.importData.fileDropText` : t`responses.importData.description`}
      />
      <input {...getInputProps()} />
    </button>
  );
};

const UseSaved = () => {
  const storage = useAppStateStorage();
  const resume = useMemo(() => storage.get, [storage.get]);
  const lastUpdate = useGetLastUpdate();
  const { t } = useTranslation("data-options");

  const { push } = useRouter();

  if (!resume) {
    return null;
  }

  return (<SelectableBox
    className="col-span-full"
    onClick={() => {
      push("/creator");
    }}
    answer={`📄 ${t`responses.continueEditing.title`}`}
    explanation={t("responses.continueEditing.description", {
      date: lastUpdate || "???",
    })}
  />)
}

const StorageSettings: React.FC = () => {
  const { t } = useTranslation("data-options");
  const mounted = useIsMounted();
  const { push } = useRouter();
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
          role={undefined} // We don't want role from getRootProps
          tabIndex={undefined}>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 m-auto max-w-md text-center">
            <h3 className="font-regular text-medium col-span-full uppercase font-semibold text-gray-600">
              <span className="text-lg">🗄️ </span> {t("page-title")}
            </h3>
            <h1 className="font-fancy text-4xl col-span-full mb-0">{t`question`}</h1>
            {mounted && <UseSaved/>}
            <SelectableBox
              onClick={() => {
                push("/creator");
              }}
              answer={`✨ ${t`responses.startFresh.title`}`}
              explanation={t`responses.startFresh.description`}
            />
            {/* TODO should be visible right away */}
            {mounted && <ImportResume dragging={isDragActive} />}
          </form>
        </div>
      </Theme>
    </>
  );
};

export default StorageSettings;
