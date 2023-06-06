import {
    BoltIcon,
    PaintBrushIcon,
    FaceSmileIcon,
    LockClosedIcon,
    LanguageIcon,
    ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline'
import Image from "next/image";
import cvImage from "../../../public/images/cv.jpg"
import useTranslation from 'next-translate/useTranslation';

const features = [
    { feature: 'noFees', icon: FaceSmileIcon },
    { feature: 'customization', icon: PaintBrushIcon },
    { feature: 'private', icon: LockClosedIcon },
    { feature: "languages", icon: LanguageIcon },
    { feature: 'devices', icon: BoltIcon },
    { feature: "reimport", icon: ArrowUpOnSquareIcon },
];

export const Features = () => {
    const { t } = useTranslation("home");
    return (
        <div id="about" className="overflow-hidden bg-white">
            <div className="relative mx-auto max-w-3xl px-6 lg:max-w-7xl lg:px-8">
                <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 bg-[#fff6f0] p-8 sm:p-10 md:p-20 rounded-3xl">
                    <div className="relative col-span-full mb-8">
                        <h2 className="text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                            {t("features.title")}
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-center text-xl text-gray-500">
                            {t("features.subtitle")}
                        </p>
                    </div>

                    <div className="relative">
                        <dl className="space-y-10">
                            {features.map((item, index) => (
                                <div key={index} className="relative">
                                    <dt>
                                        <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-white">
                                            <item.icon className="h-8 w-8" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{t(`features.${item.feature}.title`)}</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">{t(`features.${item.feature}.description`)}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="hidden lg:block relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
                        <Image
                            className="relative mx-auto rounded-lg"
                            // width={490}
                            src={cvImage}
                            alt="Example resume"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}