/**
 * @description This function will check that Is this current page has a single item and
 *      its page index is greater than 1. It will return true
 * @warn make sure you define action clearly
 */

export const shouldDecreasePageIndex = (
  currentPage: number, // page starts with 1
  totalSize: number,
  sizePerPage: number,
) => {
  const pageShouldBe = getTotalPage(totalSize, sizePerPage);
  if (pageShouldBe === 0 && currentPage === 1) return false;
  if (pageShouldBe < currentPage) {
    return true;
  }
  return false;
};

export const getTotalPage = (totalSize: number, sizePerPage: number) => {
  return Math.ceil(totalSize / sizePerPage);
};
