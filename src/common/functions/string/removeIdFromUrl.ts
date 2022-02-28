export const removeIdFromUrl = (path: string) => {
  // Remove /:id string from url
  if (path.includes("/:id")) {
    const newPath = path.replace(/(\/:[a-z?]*)+/gi, "");
    return newPath;
  }
  return path;
};
