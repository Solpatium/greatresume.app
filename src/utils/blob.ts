export const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  return new Promise((res, rej) => {
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      res(reader.result.toString());
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
