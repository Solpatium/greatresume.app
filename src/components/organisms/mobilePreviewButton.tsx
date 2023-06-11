import { useRef } from "react";
import { useMedia } from "react-use";
import { ActionButton } from "../atoms/button";

import { Dialog } from "@headlessui/react";
import { ArrowSmallDownIcon, DocumentIcon, PencilIcon } from "@heroicons/react/24/outline";
import useTranslation from "next-translate/useTranslation"
import { useCallback, useEffect, useState } from "react";
import styles from "./mobilePreviewButton.module.scss";
import cn from "classnames";
import { useAppState } from "../../state/store";
import { subscribe, useSnapshot } from "valtio";

const storageKey = "mobilePreviewToggle";

export const MobilePreviewButtonImpl: React.FC<{ isPreviewing: boolean, togglePreview: () => void }> = ({
    isPreviewing,
    togglePreview,
}) => {
    const { t } = useTranslation("app");
    const mobilePreviewToggleRef = useRef<HTMLButtonElement>(null);
    const showPreviewButton = useMedia('(max-width: 1023px)');


    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem(storageKey)) {
            setShowExplanation(true);
        }
    }, []);

    const onClick = useCallback(() => {
        if (showExplanation) {
            sessionStorage.setItem(storageKey, "true");
            setShowExplanation(false);
        }
        togglePreview();
    }, [togglePreview, showExplanation]);

    if (!showPreviewButton) {
        return null;
    }

    const button = <ActionButton
        ref={mobilePreviewToggleRef}
        onClick={onClick}
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
    </ActionButton>;


    if (!showExplanation) {
        return <div className="lg:hidden fixed bottom-3 right-3 flex flex-col">{button}</div>;
    }

    return (
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" open={showExplanation} onClose={() => setShowExplanation(false)}>
            <div className="flex items-end justify-end min-h-screen min-h-[100dvh] pb-[100px] px-3 text-center">
                <Dialog.Overlay className={cn(styles.backdrop, "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity")} />

                <Dialog.Panel className={cn(styles.infoBox, "fixed bottom-3 ml-3 right-3 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl")}>
                    <div className="lg:hidden flex flex-col items-end">
                        <div className="mb-2">{t`toggleButtonInfo`}</div>
                        {button}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export const MobilePreviewButton: React.FC<{ isPreviewing: boolean, togglePreview: () => void }> = ({
    isPreviewing,
    togglePreview,
}) => {
    // We want to show preview button only after the first section is filled.
    const enablePreview = useSnapshot(useAppState().progress).sectionsFilled > 0;
    return enablePreview ? <MobilePreviewButtonImpl isPreviewing={isPreviewing} togglePreview={togglePreview} /> : null;
}