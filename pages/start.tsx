import React, { useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import { SelectableBox } from "../src/components/atoms/selectableBox";
import useTranslation from "next-translate/useTranslation";
import { useAppStateStorage, useGetLastUpdate } from "../src/state/storage";
import { StructError } from "superstruct";
import { ClientOnly, makeClientOnly } from "../src/components/atoms/clientOnly";

const ImportResume: React.FC<{ dragging?: boolean, hasResume: boolean }> = ({ dragging, hasResume }) => {
  const { t } = useTranslation("start");
  const { push, prefetch } = useRouter();
  const storage = useAppStateStorage();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: ([file]) => {
      if (!file) {
        alert(t`responses.importData.invalidFile`);
        return;
      }

      prefetch("/creator");

      if (hasResume && !confirm(t`overwriteQuestion`)) {
        return;
      }

      import("../src/utils/dataEmbeding").then(async (module) => {
        try {
          const buffer = await file.arrayBuffer();
          const data = await module.getEmbededData(buffer)
          storage.set(data);
          push("/creator");
        } catch (e) {
          if (e instanceof module.DataExtractionError) {
            alert(t`responses.importData.extractionError`);
          } else if (e instanceof StructError) {
            alert(t`responses.importData.validationError`);
          } else {
            console.error(e);
          }
        }
      }).catch(console.error);
    },
    accept: ".pdf",
    multiple: false,
  });

  return (
    <button type="button" {...getRootProps()} className="cursor-pointer">
      <SelectableBox
        wrapper="div"
        answer={`📤 ${t("responses.importData.title")}`}
        explanation={dragging ? t`responses.importData.fileDropText` : t`responses.importData.description`}
      />
      <input {...getInputProps()} />
    </button>
  );
};

const UseSaved = () => {
  const lastUpdate = useGetLastUpdate();
  const { t } = useTranslation("start");

  const { push } = useRouter();

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

const StartFresh: React.FC<{ hasResume: boolean }> = ({ hasResume }) => {
  const { t } = useTranslation("start");
  const storage = useAppStateStorage();

  const { push, prefetch } = useRouter();

  return (<SelectableBox
    onClick={() => {
      prefetch("/creator")

      if (hasResume && !confirm(t`overwriteQuestion`)) {
        return;
      }

      storage.remove();
      push("/creator");
    }}
    answer={`✨ ${t`responses.startFresh.title`}`}
    explanation={t`responses.startFresh.description`}
  />)
}

const StorageSettings: React.FC = () => {
  const storage = useAppStateStorage();
  const hasResume = useMemo(() => !!storage.get(), [storage.get]);
  const { t } = useTranslation("start");
  const { getRootProps, isDragActive } = useDropzone();

  return (
      <div
        className="flex align-center justify-center min-h-screen"
        {...getRootProps()}
        role={undefined} // We don't want role from getRootProps
        tabIndex={undefined}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 m-auto max-w-md text-center">
          <h1 className="font-regular text-medium col-span-full uppercase font-semibold text-gray-600">
            <span className="text-lg">🗄️ </span> {t("pageTitle")}
          </h1>
          <h2 className="font-fancy text-4xl col-span-full mb-0">{t`question`}</h2>
          {hasResume && <UseSaved />}
          <StartFresh hasResume={hasResume} />
          {/* TODO should be visible right away */}
          <ImportResume hasResume={hasResume} dragging={isDragActive} />
        </form>
      </div>
  );
};

const Page = () => {
  const { t } = useTranslation("start")
  return <>
    <Head>
      <title>{t`pageTitle`}</title>
    </Head>
    <ClientOnly>
      <StorageSettings />
    </ClientOnly>
  </>
}

export default Page;
