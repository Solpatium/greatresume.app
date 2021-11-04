import { useDropzone } from "react-dropzone";
import React, { useCallback, useState } from "react";

export const Dropzone: React.FC<{ className?: string }> = ({ className, children }) => {
  const [file, setFile] = useState<File>();

  const onDrop = useCallback(([file]: File[]) => {
    console.log(file);
    setFile(file);
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="className">
      {isDragActive && "DRAGGING"}
      <input {...getInputProps()} />
      {children}
      Upload file 📤
    </div>
  );
};
