export const removeEmptyObj = (arrayofObj) => {
  const results = arrayofObj.filter((element) => {
    if (Object.keys(element).length !== 0&&element.mcap!==0) {
      return true;
    }

    return false;
  });
  return results
};
