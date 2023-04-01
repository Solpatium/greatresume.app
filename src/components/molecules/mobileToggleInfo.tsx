import { Dialog } from "@headlessui/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/outline";
import useTranslation from "next-translate/useTranslation"
import { useCallback, useEffect, useState } from "react";
import { Button } from "../atoms/button";

export const MobileInfoToggle: React.FC = () => {
    const { t } = useTranslation("app");
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(!sessionStorage.getItem("mobileInfoToggle")) {
            setShow(true);
        }
    }, []);

    const close = useCallback(() => {
        setShow(false);
        sessionStorage.setItem("mobileInfoToggle", "true");
    }, []);

    return (
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" open={show} onClose={close}>
            <div className="flex items-end justify-end min-h-screen min-h-[100dvh] pb-[100px] px-3 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all gap-1">
                    <div className="flex">
                        <div>
                            <div className="mb-2">{t`toggleButtonInfo`}</div>
                            <Button onClick={close}>{t`ok`}</Button>
                        </div>
                        <ArrowSmallDownIcon width={30} />
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}