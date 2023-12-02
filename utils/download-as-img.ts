import "client-only";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

export default function downloadAsImage(
  elementId: string,
  fileName: string = `feels-${new Date().valueOf()}.png`
) {
  const element = document.getElementById(elementId);
  if (element) {
    htmlToImage
      .toPng(element, { width: 100, height: 50 })
      .then((dataUrl) => download(dataUrl, fileName));
  }
}
