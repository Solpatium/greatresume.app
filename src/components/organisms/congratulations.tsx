import { useLocalStorage, useToggle } from 'react-use';
import { Modal } from '../layout/modal';
import useTranslation from 'next-translate/useTranslation';
import { useAppState } from '../../state/store';
import { useSnapshot } from 'valtio';
import animation from "../../../public/images/checkmark-animation.json";
import Lottie from "lottie-react";
import { Transition } from '@headlessui/react';
import authorImage from "../../../public/images/creators.webp";
import Image from "next/image"
import Trans from 'next-translate/Trans';

const useHide: () => ReturnType<typeof useLocalStorage<true>> = () => useLocalStorage<true>("congratulations");

const Animation: React.FC<{ onEnd: () => void }> = (props) => {
    return <Lottie style={{ width: 250, height: 250 }} animationData={animation} loop={false} onComplete={props.onEnd} />
}

export const Congratulations: React.FC = () => {
    const state = useAppState();
    const [animationVisible, toggleAnimation] = useToggle(true);
    const [textVisible, toggleText] = useToggle(false);
    const { downloaded } = useSnapshot(state.downloadInfo);
    const [hide, setHide] = useHide();
    const { t } = useTranslation("app");

    if (!downloaded || hide) {
        return null;
    }


    return <Modal title={t`congratulations.title`} onClose={() => setHide(true)}>
        <Transition
            show={animationVisible}
            className="flex justify-center"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={toggleText}
        >
            <Animation onEnd={toggleAnimation} />
        </Transition>
        <Transition
            show={textVisible}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100">
            <div className="bg-slate-50 rounded-3xl p-4 relative mb-[20px]">

                <p><Trans i18nKey="app:congratulations.content" components={[<span className="font-semibold"/>]}/></p>
                <br />

                <div className="pr-[100px]">
                    <p>
                    {t`congratulations.greetings`}
                        <br />
                        {t`congratulations.signature`}</p>
                </div>
                <Image
                    className="absolute rounded-full max-w-[100px] sm:max-w-[120px] bottom-[-10px] sm:bottom-[-30px] right-[10px] sm:right-[40px]"
                    src={authorImage}
                    alt={t`congratulations.signature`}
                />
            </div>
        </Transition>
    </Modal>
}