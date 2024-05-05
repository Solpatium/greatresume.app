import Image from "next/image";
import authorImage from "../../../public/images/creators.webp";
import dribbleImage from "../../../public/images/dribbble_icon.svg";
import { EnvelopeIcon, LinkIcon } from "@heroicons/react/24/outline";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";

export const AuthorSection = () => {
    const {t} = useTranslation("home");
    return (
        <section
            id="authors"
            aria-labelledby="author-title"
            className="bg-white relative scroll-mt-14 pb-3 pt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-10 lg:pt-16"
        >
            <div className="relative mx-auto max-w-5xl pt-16 sm:px-6">
                <div className="bg-slate-50 pt-px rounded-3xl">
                    <div className="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full bg-slate-200 md:float-right md:h-54 md:w-54 md:mr-20 lg:h-56 lg:w-56">
                        <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={authorImage}
                            alt=""
                            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem"
                        />
                    </div>
                    <div className="px-4 py-5 md:py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-32">
                        <p className="mt-8 mb-8 font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                            <span className="block text-blue-600">{t`authors.names`}</span>
                            {t`authors.subtitle`}
                        </p>
                        <Trans i18nKey={`home:authors.text`} components={{
                            p: <p className="mt-2 text-xl tracking-tight text-slate-700" />,
                            small: <span className="text-sm" />
                        }} />
                        <p className="mt-8 flex flex-row flex-wrap gap-6">
                            <a className="inline-flex items-center text-lg font-bold tracking-tight text-blue-600" href="https://dribbble.com/aleksandranie">
                                <Image className="h-5 w-5" {...dribbleImage} alt="Dribble logo" />
                                <span className="ml-1">{t`authors.linkOla`}</span>
                            </a>
                            <a className="inline-flex items-center text-lg font-bold tracking-tight text-blue-600" href="https://kubaptak.com">
                                <LinkIcon style={{ strokeWidth: "1.75px" }} className="h-5 w-5" />
                                <span className="ml-1">{t`authors.linkKuba`}</span>
                            </a>
                            <a className="inline-flex items-center text-lg font-bold tracking-tight text-blue-600" href="mailto:contact@greatresume.app">
                                <EnvelopeIcon style={{ strokeWidth: "1.75px" }} className="h-5 w-5" />
                                <span className="ml-1">contact@greatresume.app</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}