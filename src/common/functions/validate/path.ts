export const regex = /^\/[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
export const isPath = (path: string): boolean => regex.test(path);
