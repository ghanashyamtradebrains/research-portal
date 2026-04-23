import { getMonth } from "./getMonth";

export const dateWithAMPM=(date)=>{
    let today = date.getDate();
    let month = date.getMonth();
    let monthChar= month<9? getMonth(`0${month + 1}`):getMonth(String(month+1));
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, "0");
    let strTime =
      today +
      " " +
      monthChar  +
      " " +
      year +
      " at " +
      hours +
      ":" +
      minutes +
      " " +
      ampm;
    return strTime;
}