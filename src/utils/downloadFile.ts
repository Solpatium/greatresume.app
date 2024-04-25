export const downloadFile = (file: Blob, name: string): void => {
  const url = URL.createObjectURL(file);

  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = url;
  tempLink.setAttribute("download", name);

  document.body.appendChild(tempLink);
  tempLink.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(tempLink);
  }, 200);
};
