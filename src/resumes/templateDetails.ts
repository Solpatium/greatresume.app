import type { TemplateId } from "./templates";
import { useMemo, useTransition } from "react";
import imageEnProfession from "../../public/examples/en/professional.webp"
import imageEnSerious from "../../public/examples/en/serious.webp"
import imageEnLax from "../../public/examples/en/lax.webp"
import imageEnEnergetic from "../../public/examples/en/energetic.webp"
import imageEnPeachy from "../../public/examples/en/peachy.webp"
import imageEnSimple from "../../public/examples/en/simple.webp"
import type { StaticImageData } from "next/image";
import { ApplicationPersistentState } from "../models/v1";
import useTranslation from "next-translate/useTranslation";

type TemplateDetails = Record<TemplateId, {
    title: string,
    description: string,
    image: StaticImageData,
    example: () => Promise<ApplicationPersistentState>
}>;

export const useTemplateDetails = (): TemplateDetails => {
    const {t} = useTranslation("common");
    return useMemo(() => ({
        professional: {
            title: t("templates.professional.title"),
            description: t("templates.professional.description"),
            image: imageEnProfession,
            example: () => import("../resumes/examples/professional").then(r => r.professionalExample),
        },
        serious: {
            title: t("templates.serious.title"),
            description: t("templates.serious.description"),
            image: imageEnSerious,
            example: () => import("../resumes/examples/serious").then(r => r.seriousExample),
        },
        lax: {
            title: t("templates.lax.title"),
            description: t("templates.lax.description"),
            image: imageEnLax,
            example: () => import("../resumes/examples/lax").then(r => r.laxExample),

        },
        energetic: {
            title: t("templates.energetic.title"),
            description: t("templates.energetic.description"),
            image: imageEnEnergetic,
            example: () => import("../resumes/examples/energetic").then(r => r.energeticExample),

        },
        peachy: {
            title: t("templates.peachy.title"),
            description: t("templates.peachy.description"),
            image: imageEnPeachy,
            example: () => import("../resumes/examples/peachy").then(r => r.peachyExample),

        },
        simple: {
            title: t("templates.simple.title"),
            description: t("templates.simple.description"),
            image: imageEnSimple,
            example: () => import("../resumes/examples/simple").then(r => r.simpleExample),

        }
    }), []);
}