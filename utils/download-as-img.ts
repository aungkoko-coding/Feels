import "client-only";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

export default function downloadAsImage(
  elementId: string,
  format: string = "png",
  fileName: string = `feels-${new Date().valueOf()}`
) {
  const element = document.getElementById(elementId);
  if (element) {
    htmlToImage
      .toPng(element, { quality: 1 })
      .then((dataUrl) => download(dataUrl, `${fileName}.${format}`));
  }
}
