import { DropzoneOptions, useDropzone } from "react-dropzone";
import React from "react";
import cn from "classnames";
import useTranslation from "next-translate/useTranslation";
import { Button } from "./button";

export const DropZone: React.FC<DropzoneOptions & {text?: string}> = ({text, ...options}) => {
  const {t} = useTranslation("app");
  const { getRootProps, getInputProps, isDragActive } = useDropzone(options);
  const border = isDragActive ? "border-fuchsia-500" : "border-gray-400";
  return (
    <div
      {...getRootProps()}
      className={cn(
        "p-2 cursor-pointer flex flex-col gap-4 items-center justify-center text-center min-h-[300px] border-dashed border-2",
        border,
      )}>
      <input {...getInputProps()} />
      <div className="text-gray-800 text-lg">{text || t("dropzoneText")}</div>
        <Button>{t("dropzoneButton")}</Button>
    </div>
  );
};
