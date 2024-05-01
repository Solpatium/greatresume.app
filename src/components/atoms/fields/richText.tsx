import { Label } from "./label";
import React from "react";
import dynamic from "next/dynamic";
import cn from "classnames";

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});

export const RichTextEditor: React.FC<{
    label?: string;
    value?: string;
    onChange: (v: string) => void;
    className?: string;
    long?: boolean;
}> = ({ className, label, onChange, value, long }) => {
    const editor = <MdEditor
        plugins={["font-bold", "font-italic", "list-unordered", "logger"]}
        view={{ menu: true, md: true, html: false }}
        canView={{ menu: true, md: true, html: false, both: false, fullScreen: false, hideMenu: false }} 
        className={cn(long && "long-editor", className)} 
        defaultValue={value} 
        onChange={({ text }) => onChange(text)} 
        // @ts-ignore
        renderHTML={() => null} 
    />;

    if (!label) {
        return <div className={className}>{editor}</div>;
    }

    return (
        <Label className={`mb-1 ${className} `} name={label}>
            {editor}
        </Label>
    );
};