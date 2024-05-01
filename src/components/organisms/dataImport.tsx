import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { Button } from "../atoms/button";
import { useToggle } from "react-use";
import { BigModal } from "../layout/bigModal";
import useTranslation from "next-translate/useTranslation";
import { useCallback } from "react";
import React from "react";
import { StructError, assert } from "superstruct";
import { useAppStateStorage, useDataPurgePermission } from "../../state/storage";
import { DropZone } from "../atoms/dropZone";
import { usePersistentState } from "../../state/store";
import { proxy } from "valtio";
import { applicationStateStruct } from "../../models/v1";

const ImportResume: React.FC = () => {
    const { t } = useTranslation("app");
    const canPurge = useDataPurgePermission();
    const storage = useAppStateStorage();
    const state = usePersistentState();
    const [imported, toggle] = useToggle(false);

    const onDrop = useCallback(([file]: File[]) => {
        if (!file) {
            alert(t`dataImport.invalidFile`);
            return;
        }

        if (!canPurge()) {
            return;
        }

        return import("../../utils/dataEmbeding").then(async (module) => {
            try {
                const buffer = await file.arrayBuffer();
                const data = await module.getEmbededData(buffer)
                assert(data, applicationStateStruct);
                state.resume = proxy(data.resume);
                toggle();
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
    }, [storage]);

    if (imported) {
        return <p>✅ {t`dataImport.success`}</p>
    }

    return (
        <DropZone onDrop={onDrop} accept=".pdf" multiple={false} text={t`dataImport.fileDropText`} />
    );
};

const importKey = "import-data";

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
        <BigModal historyKey={importKey} show={open} title={t`dataImport.title`} onClose={toggle}>
            <ImportResume />
        </BigModal>
    </>
}