function numFormatter(num) {
    // if(num > 999 && num < 100000){
    //     return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    // }
     if(num > 100000&&num<10000000){
        return (num/100000).toFixed(2) + 'L'; // convert to M for number from > 1 million 
    }
    else if(num>10000000)
           return (num/10000000).toFixed(2) + 'Cr';
    else if(num < 100000){
        return num.toFixed(0); // if value < 1000, nothing to do
    }
}
export default numFormatter