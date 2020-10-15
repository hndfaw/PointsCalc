export const formatCurrency = number => {
    if (typeof number === "number") {
      let fixNumber = number ? number.toFixed(2) : 0.0;
      return `$${fixNumber
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    } else {
      return number;
    }
  };