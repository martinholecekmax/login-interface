export const getPrice = (price) => {
  price = parseInt(price);

  if (isNaN(price)) {
    return null;
  }

  if (price === 0) {
    return "£0.00";
  }
  if (price === null || price === undefined) {
    return "£0.00";
  }
  return "£" + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
