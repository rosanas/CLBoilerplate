function creditCalculator (loanAmount, interestPercent, monthsPer) {
    let interestAccumulation = 0;
    const monthlyInterestFactor = 1 + interestPercent * 30 / 36000;
    for (let i=0; i < monthsPer-1; i++) {
        interestAccumulation += Math.pow(monthlyInterestFactor, i);
    }
    const firstPrincipalPayment = loanAmount/interestAccumulation;
    return Math.round(loanAmount*interestPercent*30/36000 + firstPrincipalPayment);
}

export default creditCalculator;