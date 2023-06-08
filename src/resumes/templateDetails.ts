import type { TemplateId } from "./templates";
import { useMemo } from "react";
import imageEnProfession from "../../public/examples/en/professional.webp"
import imageEnSerious from "../../public/examples/en/serious.webp"
import imageEnLax from "../../public/examples/en/lax.webp"
import imageEnEnergetic from "../../public/examples/en/energetic.webp"
import imageEnPeachy from "../../public/examples/en/peachy.webp"
import imageEnSimple from "../../public/examples/en/simple.webp"
import type { StaticImageData } from "next/image";
import { ApplicationPersistentState } from "../models/v1";

type TemplateDetails = Record<TemplateId, {
    title: string,
    image: StaticImageData,
    example: () => Promise<ApplicationPersistentState>
}>;

// TODO: i18n!
export const useTemplateDetails = (): TemplateDetails => {
    return useMemo(() => ({
        professional: {
            title: "Professional",
            image: imageEnProfession,
            example: () => import("../resumes/examples/professional").then(r => r.professionalExample),
        },
        serious: {
            title: "Serious",
            image: imageEnSerious,
            example: () => import("../resumes/examples/serious").then(r => r.seriousExample),
        },
        lax: {
            title: "Lax",
            image: imageEnLax,
            example: () => import("../resumes/examples/lax").then(r => r.laxExample),

        },
        energetic: {
            title: "Energetic",
            image: imageEnEnergetic,
            example: () => import("../resumes/examples/energetic").then(r => r.energeticExample),

        },
        peachy: {
            title: "Peachy",
            image: imageEnPeachy,
            example: () => import("../resumes/examples/peachy").then(r => r.peachyExample),

        },
        simple: {
            title: "Simple",
            image: imageEnSimple,
            example: () => import("../resumes/examples/simple").then(r => r.simpleExample),

        }
    }), []);
}