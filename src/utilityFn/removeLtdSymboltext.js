/*function to change meta tag to remove symbol and llt**/
export const removeSpecialSymbolText = (val) => {
  let txt = val?.replace("Ltd.", " ");

  return txt;
};
/*function to change meta tag to remove symbol and llt**/
export const removeLtdText = (val) => {
  let txt = val?.replace("Ltd.", "");

  return txt;
};

export const removeLtdTextPoint = (val) => {
  let txt = val?.replace("Ltd", "");

  return txt;
};
