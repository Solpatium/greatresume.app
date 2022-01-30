export const downloadFile = (url: string, name: string): void => {
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = url;
  tempLink.setAttribute("download", name);

  document.body.appendChild(tempLink);
  tempLink.click();

  setTimeout(() => {
    document.body.removeChild(tempLink);
  }, 200);
};
