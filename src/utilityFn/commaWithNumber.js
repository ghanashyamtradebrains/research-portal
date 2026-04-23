function commaWihNumber(num) {
    return num > 10000
      ? Math.trunc(num)
          .toLocaleString("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
      : num
          ?.toLocaleString("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
  }
  
  export default commaWihNumber;