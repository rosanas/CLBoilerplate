import React from "react";

 export const maxPeriod = loanType => {
    let maxPeriod = ""; // loan period in months
    switch(loanType) {
        case "consumerLoan": maxPeriod=60; break;
        case "mortgageLoan": maxPeriod=360; break;
    }
    return maxPeriod;
};

export const maxAmount = loanType => {
    let maxAmount = "";
    switch(loanType) {
        case "consumerLoan": maxAmount=100000; break;
        case "mortgageLoan": maxAmount=1000000; break;
    }
    return maxAmount;
};

export const interestPercent = (loanType, loanCcy) => {
    let interestPercent = "";
    switch (loanType) {
        case "consumerLoan":
            switch (loanCcy) {
                case "RON":
                    interestPercent = 10.85;
                    break;
                case "EUR":
                    interestPercent = 7.53;
                    break;
                case "USD":
                    interestPercent = 8.60;
                    break;
            }
            break;
        case "mortgageLoan":
            switch (loanCcy) {
                case "RON":
                    interestPercent = 7.25;
                    break;
                case "EUR":
                    interestPercent = 5.90;
                    break;
                case "USD":
                    interestPercent = 6.20;
                    break;
            }
            break;
    }
    return interestPercent;
};