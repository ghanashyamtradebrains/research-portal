import { write } from "xlsx";

export const excelWorkbookToBlob = (workBook) => {
  const s2ab = (s) => {
    const buff = new ArrayBuffer(s.length);
    const view = new Uint8Array(buff);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i);
    }
    return buff;
  };

  const wOpts = {
    bookType: "xlsx",
    type: "binary",
  };
  const wbOut = write(workBook, wOpts);
  const blob = new Blob([s2ab(wbOut)], {
    type: "application/octect-stream",
  });
  return blob;
};
