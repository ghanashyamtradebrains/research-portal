export const greenColorPicker = (price, lightMode) => {
  if (lightMode) {
    if (price) return "#009633";
  } else {
    if (price) return "#00FF57";
  }
};
