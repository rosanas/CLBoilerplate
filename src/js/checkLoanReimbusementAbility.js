import {estimatedMonthlyExpensePerChild, minSalary} from "./constants";

const checkLoanReimbursementAbility = function(income,childrenNo,existingInstallments,ccy,monthlyInstallment,rateEUR,rateUSD) {
        const netMonthlyIncome = income - minSalary - childrenNo * estimatedMonthlyExpensePerChild - existingInstallments;
        let checkResolution = "";
        switch (ccy) {
            case "RON":
                netMonthlyIncome >= monthlyInstallment ? checkResolution = true : checkResolution = false;
                break;
            case "EUR":
                netMonthlyIncome >= monthlyInstallment * rateEUR ? checkResolution = true : checkResolution = false;
                break;
            case "USD":
                netMonthlyIncome >= monthlyInstallment * rateUSD ? checkResolution = true : checkResolution = false;
                break;
        }
        return checkResolution;
};

export default checkLoanReimbursementAbility;