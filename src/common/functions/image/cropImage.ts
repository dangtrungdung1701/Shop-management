import { Area } from "react-easy-crop/types";

const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", error => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

/**
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 *
 * @returns {Object} { file, base64File }
 *
 */
export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  fileType: "image/jpeg" | "image/png" = "image/jpeg",
): Promise<{ file: File; base64File: string }> => {
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx?.translate(safeArea / 2, safeArea / 2);
  ctx?.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx?.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );
  const data = ctx?.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx?.putImageData(
    data as any,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  );

  // As Base64 string

  // As a blob
  return new Promise(resolve => {
    canvas.toBlob((blob: any) => {
      try {
        const base64File = canvas.toDataURL(fileType);

        const file = new File(
          [blob],
          `fileName.${fileType === "image/jpeg" ? "jpg" : "png"}`,
          {
            type: fileType,
          },
        );
        resolve({ file, base64File });
      } catch (error) {
        console.error(error);
      }
    }, fileType);
  });
};
