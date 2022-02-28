export const renderPriceTypeDollar = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const newPrice = formatter.format(price);
  return newPrice;
};
