import type { TemplateId } from "./templates";
import { useMemo, useTransition } from "react";
import imageEnProfession from "../../public/examples/en/professional.webp"
import imageEnSerious from "../../public/examples/en/serious.webp"
import imageEnLax from "../../public/examples/en/lax.webp"
import imageEnEnergetic from "../../public/examples/en/energetic.webp"
import imageEnPeachy from "../../public/examples/en/peachy.webp"
import imageEnSimple from "../../public/examples/en/simple.webp"
import imagePlProfession from "../../public/examples/pl/professional.webp"
import imagePlSerious from "../../public/examples/pl/serious.webp"
import imagePlLax from "../../public/examples/pl/lax.webp"
import imagePlEnergetic from "../../public/examples/pl/energetic.webp"
import imagePlPeachy from "../../public/examples/pl/peachy.webp"
import imagePlSimple from "../../public/examples/pl/simple.webp"
import type { StaticImageData } from "next/image";
import { ApplicationPersistentState } from "../models/v1";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

type TemplateDetails = Record<TemplateId, {
    title: string,
    description: string,
    image: StaticImageData,
    example: () => Promise<ApplicationPersistentState>
}>;

export const useTemplateDetails = (): TemplateDetails => {
    const { t } = useTranslation("common");
    const { locale } = useRouter();
    const usedLocale = locale == "fr" ? "en" : locale;
    return useMemo(() => ({
        professional: {
            title: t("templates.professional.title"),
            description: t("templates.professional.description"),
            image: locale == "pl" ? imagePlProfession : imageEnProfession,
            example: () => import(`./examples/${usedLocale}/professional`).then(r => r.professionalExample),
        },
        serious: {
            title: t("templates.serious.title"),
            description: t("templates.serious.description"),
            image: locale == "pl" ? imagePlSerious : imageEnSerious,
            example: () => import(`./examples/${usedLocale}/serious`).then(r => r.seriousExample),
        },
        lax: {
            title: t("templates.lax.title"),
            description: t("templates.lax.description"),
            image: locale == "pl" ? imagePlLax : imageEnLax,
            example: () => import(`./examples/${usedLocale}/lax`).then(r => r.laxExample),

        },
        energetic: {
            title: t("templates.energetic.title"),
            description: t("templates.energetic.description"),
            image: locale == "pl" ? imagePlEnergetic : imageEnEnergetic,
            example: () => import(`./examples/${usedLocale}/energetic`).then(r => r.energeticExample),

        },
        peachy: {
            title: t("templates.peachy.title"),
            description: t("templates.peachy.description"),
            image: locale == "pl" ? imagePlPeachy : imageEnPeachy,
            example: () => import(`./examples/${usedLocale}/peachy`).then(r => r.peachyExample),

        },
        simple: {
            title: t("templates.simple.title"),
            description: t("templates.simple.description"),
            image: locale == "pl" ? imagePlSimple : imageEnSimple,
            example: () => import(`./examples/${usedLocale}/simple`).then(r => r.simpleExample),

        }
    }), [usedLocale]);
}