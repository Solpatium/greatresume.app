import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { Button } from "../atoms/button";
import { useToggle } from "react-use";
import { BigModal } from "../layout/bigModal";
import useTranslation from "next-translate/useTranslation";
import { useCallback } from "react";
import React from "react";
import { StructError } from "superstruct";
import { useAppStateStorage, useDataPurgePermission } from "../../state/storage";
import { DropZone } from "../atoms/dropZone";

const ImportResume: React.FC<{ onImport: () => void }> = ({ onImport }) => {
    const { t } = useTranslation("app");
    const canPurge = useDataPurgePermission();
    const storage = useAppStateStorage();

    const onDrop = useCallback(([file]: File[]) => {
        if (!file) {
            alert(t`dataImport.invalidFile`);
            return;
        }

        if (!canPurge()) {
            return;
        }

        import("../../utils/dataEmbeding").then(async (module) => {
            try {
                const buffer = await file.arrayBuffer();
                const data = await module.getEmbededData(buffer)
                storage.set(data);
                onImport();
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
    }, [onImport, storage]);

    return (
        <DropZone onDrop={onDrop} accept=".pdf" multiple={false} text={t`dataImport.fileDropText`} />
    );
};


export const DataImport: React.FC = () => {
    const [open, toggle] = useToggle(false);
    const { t } = useTranslation("app");

    const onImport = useCallback(() => {
        toggle();
        alert(t`dataImport.success`);
    }, [toggle]);
    return <>
        <Button
            tertiary
            icon={ClipboardDocumentListIcon}
            largeIcon
            onClick={toggle}
        >{t`dataImport.title`}</Button>
        <BigModal show={open} title={t`dataImport.title`} onClose={toggle}>
            <ImportResume onImport={onImport} />
        </BigModal>
    </>
}