export const diffArray = <T>(
  arr1: T[],
  arr2: T[],
  isEqual: (item1: T, item2: T) => boolean,
): T[] => {
  return arr1.filter(i1 => !arr2.find(i2 => isEqual(i1, i2)));
};
