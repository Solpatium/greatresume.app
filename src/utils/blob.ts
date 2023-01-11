import { useEffect, useRef, useState } from "react";

export const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  return new Promise((res, rej) => {
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      res(reader.result!.toString());
    };
    reader.onerror = () => {
      rej(new Error("FileReader error"));
    };
    reader.onabort = () => {
      rej(new Error("FileReader aborted"));
    };
  });
};

export const base64ToDataUrl = async (base64: string): Promise<string> => {
  // TODO: Check if is safe
  const blob = await (await fetch(base64)).blob();
  return URL.createObjectURL(blob);
};

export const useDataUrl = (base64: string): string | undefined => {
  const [url, setUrl] = useState<string>("");
  const urlsToRevoke = useRef<string[]>([]);
  useEffect(() => {
    if (base64) {
      // TODO: Error handling
      base64ToDataUrl(base64).then(url => {
        setUrl(url);
        urlsToRevoke.current.push(url);
      });
      return () => {
        urlsToRevoke.current.forEach(url => URL.revokeObjectURL(url));
        urlsToRevoke.current = [];
      };
    } else {
      setUrl("");
    }
  }, [base64]);
  return url;
};
