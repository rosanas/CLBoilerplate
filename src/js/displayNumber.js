function displayNumber(number) {
    const power = 3;
    let numberFormattedArray = [];

    if (number !== 0) {
        while (number > 0) {
            let noConvertToStr = number.toString();
            if (noConvertToStr.length >= 3) {
                numberFormattedArray.push(noConvertToStr.substring(noConvertToStr.length - 3, noConvertToStr.length));
                number = Math.trunc(number / Math.pow(10, power));
            } else {
                numberFormattedArray.push(noConvertToStr.substring(0, noConvertToStr.length));
                number = 0;
            }
        }
    }
    else {
        numberFormattedArray.push("0");
    }
    return numberFormattedArray.reverse().join(",");
}

export default displayNumber;