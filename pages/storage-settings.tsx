import React from "react";
import Head from "next/head";
import { useStorageSelected } from "../src/utils/storage";
import { useRouter } from "next/router";
import { SelectableBox } from "../src/components/atoms/selectableBox";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import { useStorageMigration } from "../src/state/storage";
import { ClientOnly } from "../src/components/atoms/clientOnly";

const StorageSettings: React.FC = () => {
  const { t } = useTranslation("storage-settings");
  const { push, query } = useRouter();
  const [, setStorage] = useStorageSelected();
  const start = () => "skip-start" in query ? push("/creator") : push("/start");
  const migrateStorage = useStorageMigration();

  return (

    <div className="flex align-center justify-center min-h-screen">
      <form className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 m-auto max-w-lg text-center">
        <h1 className="font-regular text-medium col-span-full uppercase font-semibold text-gray-600">
          <span className="text-lg">💾 </span> {t`pageTitle`}
        </h1>
        <h2 className="font-fancy text-4xl col-span-full mb-0">{t`question`}</h2>
        <SelectableBox
          onClick={() => {
            migrateStorage("local");
            setStorage("local");
            start();
          }}
          answer={t`options.yes.title`}
          explanation={t`options.yes.description`}
        />
        <SelectableBox
          onClick={() => {
            migrateStorage("session");
            setStorage("session");
            start();
          }}
          answer={t`options.no.title`}
          explanation={t`options.no.description`}
        />
        <div className="col-span-full text-sm">
          <p>
            <Trans
              i18nKey="storage-settings:notice"
              components={[<em key={0} className="underline" />]}
            />
          </p>
          <p className="col-span-full text-sm">{t`reminder`}</p>
        </div>
      </form>
    </div>
  );
};

const Page = () => {
  const { t } = useTranslation("storage-settings");
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
