/**
 * @description This will help you remove all properties which has null/undefined value
 * @returns an object may miss some key
 * @example
 *  input: {
 *    cow: "something",
 *    cat: 0,
 *    fish: undefined.
 *    dog: false
 *  }
 *
 *  output: {
 *    cow: "something",
 *    cat: 0,
 *    dog: false
 *  }
 */

export const cleanObject = <T>(
  initObject: T,
): { [key in keyof T]?: typeof initObject[key] | undefined } => {
  if (!initObject || typeof initObject !== "object") {
    console.error("[CleanObject] Object input is not valid!");
    return initObject;
  }
  try {
    const obj = { ...initObject };
    for (let propName in obj) {
      if (obj[propName] === undefined || obj[propName] === null) {
        delete obj[propName];
      } else {
        if (typeof obj[propName] === "object" && !Array.isArray(obj[propName]))
          obj[propName] = cleanObject(obj[propName]) as any;
      }
    }
    return obj;
  } catch (error) {
    console.error(error);
    return initObject;
  }
};
