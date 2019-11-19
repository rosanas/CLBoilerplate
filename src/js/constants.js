import React from "react";
import displayNumber from "./displayNumber";

    export const estimatedMonthlyExpensePerChild = 500; //in RON

    export const minSalary = 1400; //in RON - considered as min level of monthly expenses

    export const accountsArr = [
    {accountCode: "RO20XXXX1456247836957RON",
        accountBalance: 14500},
    {accountCode: "RO15XXXX1456247832389EUR",
        accountBalance: 2000},
    {accountCode: "RO45XXXX1456247833612USD",
        accountBalance: 500}];

    export const accountBalanceRetrieve = account => {
    let accBalance=0;
    accountsArr.forEach((element) => {
        if (element.accountCode === account) {
            accBalance = displayNumber(element.accountBalance);
        }
    });
    return accBalance;
};

export const computeAmountRON = (amount, ccy,rateEUR,rateUSD) => {
    let amountRON = 0;
    switch (ccy) {
        case "RON":
            amountRON = amount;
            break;
        case "EUR":
            amountRON = Math.round(amount * rateEUR);
            break;
        case "USD":
            amountRON = Math.round(amount * rateUSD);
            break
    }
    return amountRON;
};