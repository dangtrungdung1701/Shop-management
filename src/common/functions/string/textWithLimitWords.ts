export const textWithLimitWords = (
  text = "",
  limit: number,
  ellipsisFormat = "...",
) => {
  let words = text?.split(" ");

  if (words?.length > limit) {
    words = words.slice(0, limit);
    words[words.length - 1] += ellipsisFormat;
  }

  const result = words?.join(" ");
  return result;
};
