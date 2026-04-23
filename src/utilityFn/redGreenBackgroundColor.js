export const redGreenBackgroundColor = (price, lightMode) => {
  if (lightMode) {
    if (price >= 0) return "#C2F8D8";
    else return "#F3CED0";
  } else {
    if (price >= 0) return "#1a513f";
    else return "#4C2837";
  }
};
