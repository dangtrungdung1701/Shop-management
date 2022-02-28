/**
 * @return {string} base64 image
 */
export const readFile = (file: File | undefined) => {
  if (!file) return;
  return new Promise<string | null>(resolve => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result as any), false);
    reader.readAsDataURL(file);
  });
};
