import { DropzoneOptions, useDropzone } from "react-dropzone";
import React from "react";
import { UploadIcon } from "@heroicons/react/outline";
import cn from "classnames";

export const DropZone: React.FC<DropzoneOptions> = options => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(options);
  const border = isDragActive ? "border-fuchsia-500" : "border-gray-300";
  return (
    <div
      {...getRootProps()}
      className={cn(
        "cursor-pointer flex items-center justify-center min-h-[300px] border-dashed border-2",
        border,
      )}>
      <input {...getInputProps()} />
      <div className="text-gray-500">Click or drag your file here</div>
      <UploadIcon className="h-10 w-10 text-gray-500" />
    </div>
  );
};
