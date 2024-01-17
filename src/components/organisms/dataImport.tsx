import { ArrowUpTrayIcon, ClipboardDocumentListIcon, LanguageIcon } from "@heroicons/react/24/outline";
import { Button } from "../atoms/button";
import { useToggle } from "react-use";
import { BigModal } from "../layout/bigModal";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FlatSelect } from "../atoms/flatSelect";
import { useHistoryPush } from "../../utils/hooks";
import { useCallback, useState } from "react";
import React, { useMemo } from "react";
import Head from "next/head";
import { useDropzone } from "react-dropzone";
import { StructError } from "superstruct";
import { useDataPurgePermission, useGetLastUpdate } from "../../state/storage";
import { SelectableBox } from "../atoms/selectableBox";
import { DropZone } from "../atoms/dropZone";

const ImportResume: React.FC = () => {
    const { t } = useTranslation("app");
    const { push, prefetch } = useRouter();
    const canPurge = useDataPurgePermission();
  
    const onDrop = useCallback(([file]: File[]) => {
        if (!file) {
          alert(t`dataImport.invalidFile`);
          return;
        }
  
        prefetch("/creator");
  
        if (!canPurge()) {
          return;
        }
  
        import("../../utils/dataEmbeding").then(async (module) => {
          try {
            const buffer = await file.arrayBuffer();
            const data = await module.getEmbededData(buffer)
            localStorage.set(data);
            push("/creator");
          } catch (e) {
            if (e instanceof module.DataExtractionError) {
              alert(t`dataImport.extractionError`);
            } else if (e instanceof StructError) {
              alert(t`dataImport.validationError`);
            } else {
              console.error(e);
            }
          }
        }).catch(console.error);
      }, []);
  
    return (
        <DropZone onDrop={onDrop} accept=".pdf" multiple={false} text={t`dataImport.fileDropText`}/>
    );
  };
  
//   const UseSaved = () => {
//     const lastUpdate = useGetLastUpdate();
//     const { t } = useTranslation("start");
  
//     const { push } = useRouter();
  
//     return (<SelectableBox
//       className="col-span-full"
//       onClick={() => {
//         push("/creator");
//       }}
//       answer={`📄 ${t`responses.continueEditing.title`}`}
//       explanation={t("responses.continueEditing.description", {
//         date: lastUpdate || "???",
//       })}
//     />)
//   }

export const DataImport: React.FC = () => {
    const [open, toggle] = useToggle(false);
    const { t } = useTranslation("app");

    return <>
        <Button
            tertiary
            icon={ClipboardDocumentListIcon}
            largeIcon
            onClick={toggle}
        >{t`dataImport.title`}</Button>
        <BigModal show={open} title={t`dataImport.title`} onClose={toggle}>
            <ImportResume />
        </BigModal>
    </>
}