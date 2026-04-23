import { alphabet } from "./columnAlphabet"

export const excelHeaderCalc=(alphaNum)=>{
if(alphaNum<26){
    return alphabet[alphaNum-1]
}
else{
const FirstLetter=alphaNum/26
const secondLetter=alphaNum%26
return `${alphabet[Math.trunc(FirstLetter)-1]}${alphabet[secondLetter===0?25:secondLetter-1]}`
}
}

export const numToAlpha=(num) =>{

    let alpha = '';
  
    for (; num >= 0; num = parseInt(num / 26, 10) - 1) {
      alpha = String.fromCharCode(num % 26 + 0x41) + alpha;
    }
  
    return alpha;
  }