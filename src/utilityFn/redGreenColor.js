export const redGreenColorPicker = (price, lightMode) => {
  if (lightMode) {
    if (price >= 0) return "#009633";
    else return "#FF0000";
  } else {
    if (price >= 0) return "#00FF57";
    else return "#F82E2E";
  }
};
