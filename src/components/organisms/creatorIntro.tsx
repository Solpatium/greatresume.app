import { useLocalStorage } from 'react-use';
import { Modal } from '../layout/modal';
import { CircleStackIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';


type ConsentValue = boolean | undefined;
export const useHideIntro: () => ReturnType<typeof useLocalStorage<ConsentValue>> = () => useLocalStorage<ConsentValue>("creator-intro");

export const CreatorInfo: React.FC = () => {
    const [hideIntro, setHideIntro] = useHideIntro();
    const { t } = useTranslation("app");
    if (hideIntro) {
        return null;
    }

    return <Modal title={t`intro.title`} onClose={() => setHideIntro(true)}>
        <div className='flex flex-col gap-5 mt-5'>
            <div className='flex flex-row gap-3'>
                <div className='flex shrink-0	 h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white'>
                    <CircleStackIcon className="h-8 w-8" />
                </div>
                <span>{t`intro.localStorage`}</span>
            </div>
            <div className='flex flex-row gap-3'>
                <div className='flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white'>
                    <LockClosedIcon className="h-8 w-8" />
                </div>
                <span>
                    <Trans
                        i18nKey="app:intro.incognito"
                        components={[<a className="font-semibold text-indigo-600" target='blank' href={t`intro.incognitoUrl`} />]}
                    />
                </span>
            </div>
        </div>
    </Modal>
}