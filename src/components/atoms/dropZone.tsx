import { DropzoneOptions, useDropzone } from "react-dropzone";
import React from "react";
import cn from "classnames";
import useTranslation from "next-translate/useTranslation";

export const DropZone: React.FC<DropzoneOptions & {text?: string}> = ({text, ...options}) => {
  const {t} = useTranslation("app");
  const { getRootProps, getInputProps, isDragActive } = useDropzone(options);
  const border = isDragActive ? "border-fuchsia-500" : "border-gray-400";
  return (
    <div
      {...getRootProps()}
      className={cn(
        "cursor-pointer flex items-center justify-center min-h-[300px] border-dashed border-2",
        border,
      )}>
      <input {...getInputProps()} />
      <div className="text-gray-800 text-lg">{text || t("dropzoneText")}</div>
    </div>
  );
};
