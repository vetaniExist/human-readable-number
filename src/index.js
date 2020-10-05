const { parse } = require("semver");

module.exports = function toReadable (number) {
    number = number.toString();
    if (number.length === 3) {
        let dozens = configureDozens(number.slice(1));
        if (dozens !== "") {
            return configureDigits(number[0]) + " hundred" + " " + dozens; 
        }
        return configureDigits(number[0]) + " hundred"; 
    } else if (number.length === 2) {
        return configureDozens(number);
    } else {
        return configureDigits(number[0]);
    }

}

function configureDozens(number) {
    let tens = ["", "ten","twenty", "thirty", "forty", "fifty", "sixty" , "seventy", "eighty", "ninety"];
    switch(number) {
        case "10": {
            return "ten";
        }
        case "11": {
            return "eleven";
        }
        case "12": {
            return "twelve";
        }
        case "14": {
            return "fourteen";
        }
        default: {
            if (number[1] == "0") {
                return tens[number[0]];
            } else if (parseInt(number) >= 12 && parseInt(number) <= 19){
                return tens[parseInt(number[1])].replace("ty","teen");
            }
            let result = tens[number[0]];
            if (result === "") {
                return configureDigits(number[1]);
            }
            return result + " " + configureDigits(number[1]);
        }
    }
}

function configureDigits(digit) {
    let digits = ["zero","one", "two", "three", "four" , "five", "six","seven", "eight", "nine"];
    return digits[digit];
}