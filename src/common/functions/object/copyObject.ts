export const copyObject = <T>(object: T): T =>
  JSON.parse(JSON.stringify(object));
