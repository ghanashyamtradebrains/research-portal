import { getMonth } from "./getMonth";

export const getMonthYear=(num)=>{
    const stringNum=String(num)
    const year = stringNum?.substring(0, stringNum?.length - 2);
    const month = stringNum?.slice(4);
    const combineDate = `${getMonth(month)} ${year}`;
    return combineDate
}