/**
 *  @description Give me ward, district and province, I'll give you magic
 *  @example
 *    - ward: "Linh Trung"
 *    - district: undefine
 *    - province: "Ho Chi Minh"
 *  --> "Linh Trung, Ho Chi, Minh"
 */

export const renderLocation = (
  street: string | undefined = "",
  ward: string | undefined = "",
  district: string | undefined = "",
  province: string | undefined = "",
): string => {
  const location: (string | undefined)[] = [];
  if (street) location.push(street);
  if (ward) location.push(ward);
  if (district) location.push(district);
  if (province) location.push(province);
  return location.join(", ");
};
