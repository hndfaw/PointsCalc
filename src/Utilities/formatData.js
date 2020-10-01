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



export const formatDate = (date) => {
    let FormatedDate;
    if (date !== "N/A") {
      let newDate = new Date(date);
  
      let convertMonth = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec",
      };
      let month = newDate.getMonth();
      let day = newDate.getDate();
      // if I want to show last two deigits of year like 20 for 2020
      // let year = newDate.getFullYear().toString().substr(-2);
      let year = newDate.getFullYear();
  
      FormatedDate = `${convertMonth[month]} ${day}, ${year}`;
    } else {
      FormatedDate = "No date available yet.";
    }
  
    return FormatedDate;
  };