import useTranslation from 'next-translate/useTranslation';
import logo from "../../../public/images/logo.svg";
import { LanguageSwitcher } from '../organisms/languageSwitcher';
import Img from "next/image";
import cn from "classnames"

export const Logo: React.FC<{className?: string}> = ({className}) => {
    const { t } = useTranslation("common");

    return <a href="/" className={cn("flex flex-row justify-center items-center gap-[8px] shrink-0", className)}>
        <span className="sr-only">{t("home")}</span>
        <Img {...logo} alt="Logo" />
        <div className="text-[32px] font-bold flex flex-row gap-[4px] text-blue-600">
            <span>Great</span> <span>Resume</span>
        </div>
    </a>
}

export const Header: React.FC<{ navigation: { translationKey: string, href: string }[] }> = (props) => {
    const {t} = useTranslation("home")
    return (
        <div>
            <nav className="flex h-9 items-center space-between" aria-label="Global">
                <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                    <Logo className='origin-left	scale-[75%] sm:scale-[70%] md:scale-[85%] lg:scale-100 -m-1.5 p-1.5'/>
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