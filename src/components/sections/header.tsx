import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link'
import logo from "../../../public/images/logo.svg";
import { LanguageSwitcher } from '../organisms/languageSwitcher';
import Img from "next/image";

export const Header: React.FC<{ navigation: { translationKey: string, href: string }[] }> = (props) => {
    const { t } = useTranslation("home");
    return (
        <div>
            <nav className="flex h-9 items-center space-between" aria-label="Global">
                <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                    <a href="/home" className="-m-1.5 p-1.5 flex flex-row justify-center items-center gap-2 origin-left	scale-[60%] md:scale-80 lg:scale-90 xl:scale-100">
                        <span className="sr-only">{t("home")}</span>
                        <Img {...logo} alt="Logo" />
                        <div className="text-[38px] font-bold tracking-wide">
                            <span className="text-indigo-500">Great</span> <span className="text-indigo-800">Resume</span>
                        </div>
                    </a>
                </div>
                <div className="flex min-w-0 flex-1 justify-end items-center gap-x-3 sm:gap-x-4 md:gap-x-10">
                    {props.navigation.map((item) => (
                        <a key={item.translationKey} href={item.href} className="font-semibold hidden sm:block text-gray-900 hover:text-gray-900">
                            {t("nav." + item.translationKey)}
                        </a>
                    ))}
                    <LanguageSwitcher />
                </div>
            </nav>
        </div>
    )
}