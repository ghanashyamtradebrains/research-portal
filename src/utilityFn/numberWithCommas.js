function numberWithCommas(num) {
  return num > 10000
    ? Math.trunc(num)
        .toLocaleString("en-IN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
        ?.replace("-", "")
    : num
        ?.toLocaleString("en-IN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
        ?.replace("-", "");
}

export default numberWithCommas;
