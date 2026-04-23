import { getMonth } from "./getMonth";
export const getFormatDate = (date) => {
  if(date===null) return "NA"
  let formatdate = new Date(date);
  let day = formatdate.getDate();
  let month = formatdate?.getMonth();
  let year = formatdate?.getFullYear();
  let charMonth =month<9? getMonth(`0${month + 1}`):getMonth(String(month+1));
  return `${day} ${charMonth} ${year}`;
};
export const getFormatDateAgo = (dateStr) => {
  const date = new Date(dateStr);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hour = Math.round(seconds / (60 * 60));
  const days = Math.round(seconds / (60 * 60 * 24));
  const weeks = Math.round(seconds / (60 * 60 * 24 * 7));
  const months = Math.round(seconds / (60 * 60 * 24 * 7 * 4));

  if (seconds < 5) {
    return "Just now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hour < 24) {
    return `${hour} hours ago`;
  } else if (days < 5) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else {
    return `${months} month ago`;
  }
};
