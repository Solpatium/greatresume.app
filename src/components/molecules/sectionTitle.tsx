import React from "react";
import { Section } from "../../models/v1";
import { useSnapshot } from "valtio";
import { Input } from "../atoms/fields/input";
import useTranslation from "next-translate/useTranslation";
import { PencilIcon } from "@heroicons/react/20/solid";
import cn from "classnames";

const textStyle = "text-xl font-semibold my-4 text-slate-800";

const SectionTitleEdit: React.FC<{ sectionProxy: Section }> = ({ sectionProxy }) => {
    const section = useSnapshot(sectionProxy);
    const { t } = useTranslation("app");
    return <div className="relative">
        <input
            type="text"
            className={cn(
                textStyle,
                "block w-full focus:ml-0 -ml-3 pr-[36px] focus:ring-indigo-500 focus:shadow-sm focus:border-indigo-500 block border-transparent rounded-md"
            )}
            aria-label={t`newSection.sectionTitle`}
            placeholder={t`newSection.sectionTitle`}
            onChange={(e) => (sectionProxy.title = e.target.value)}
            value={section.title}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <PencilIcon className="h-[20px] w-[20px] text-slate-600" aria-hidden="true" />
        </div>
    </div>;
}

export const SectionTitle: React.FC<{ sectionProxy: Section } | { title: string }> = (props) => {
    if ("title" in props) {
        return <h2 className={textStyle}>{props.title}</h2>
    }
    return <SectionTitleEdit {...props} />;
}