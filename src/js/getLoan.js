import React from "react";
import creditCalculator from "./creditCalculator";
import {maxPeriod,maxAmount,interestPercent} from "./loanData";
import checkLoanReimbursementAbility from "./checkLoanReimbusementAbility";
import displayNumber from "./displayNumber";
import {computeAmountRON} from "./constants";

class GetLoan extends React.Component {
    state = {
        income: "",
        existingInstallments: "",
        childrenNo: "",
        loanType: "",
        financingPeriod: "",
        loanAmount: "",
        loanCcy: "",
        loanInRONeq: "",
        interestPercent: "",
        monthlyInstallment: "",
        visibility: "hidden",
        rateEUR: "",
        rateUSD: "",
        submitDisabledStatus: false
    };

    componentDidMount() {
        fetch("https://api.exchangeratesapi.io/latest",{
            method: "GET"
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
        }).then(resp => {
            this.setState({
                rateEUR: resp.rates.RON,
                rateUSD: Math.round(resp.rates.RON / resp.rates.USD * 10000) / 10000,
            })
        })
    }

    handleChange = ev => {
        if (ev.target.name === "income" || ev.target.name === "existingInstallments" || ev.target.name === "loanAmount") {
            if (ev.target.value !== "") {
                if (!isNaN(ev.target.value)) {
                    this.setState({
                        [ev.target.name]: ev.target.value
                    });
                    if (ev.target.name === "loanAmount") {
                        this.setState({
                            loanInRONeq: this.state.loanCcy !== "" ? computeAmountRON(parseInt(ev.target.value), this.state.loanCcy,
                                this.state.rateEUR, this.state.rateUSD).toString() : ""
                        });
                    }
                } else {
                    alert("Please insert a valid number")
                }
            }
            else {
                this.setState({
                    [ev.target.name]: ""
                });
            }
        }
        else {
            this.setState({
                [ev.target.name]: ev.target.value
                });
            if (ev.target.name === "loanCcy") {
                this.setState({
                        loanInRONeq: this.state.loanAmount !== "" ? displayNumber(computeAmountRON(parseInt(this.state.loanAmount.
                            split(",").join("")),ev.target.value,this.state.rateEUR,this.state.rateUSD)) : ""
                });
            }
        }
    };

    handleFocus = ev => {
        if (ev.target.value !== "") {
            this.setState({
                [ev.target.name]: this.state[ev.target.name].split(",").join("")
            });
            if (ev.target.name === "loanAmount") {
                this.setState({
                    loanInRONeq: this.state.loanInRONeq.split(",").join("")
                });
            }
        }
    };

    handleBlur = ev => {
        if (ev.target.name === "income" || ev.target.name === "existingInstallments" || ev.target.name === "loanAmount") {
            if (ev.target.value !== "") {
                this.setState({
                    [ev.target.name]: displayNumber(this.state[ev.target.name])
                });
                if (ev.target.name === "loanAmount" && this.state.loanCcy !== "") {
                    this.setState({
                        loanInRONeq: displayNumber(this.state.loanInRONeq)
                    });
                    if (this.state.loanInRONeq > maxAmount(this.state.loanType)) {
                        alert("Please modify the loan amount down to the max amount allowed");
                    }
                }
            }
        }
        else if (ev.target.name === "financingPeriod") {
                if (ev.target.value !== "" && ev.target.value > maxPeriod(this.state.loanType)) {
                    alert("Please insert a number up to the max period of the loan!")
                }
            }
        else if (ev.target.name === "loanCcy" && this.state.loanAmount !== "") {
            if (this.state.loanInRONeq.split(",").join("") > maxAmount(this.state.loanType)) {
                alert("Please modify the loan amount down to the max amount allowed");
            }
        }
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        let errorArr=[];
        if (this.state.monthlyInstallment === "" || this.state.income === "" || this.state.existingInstallments === "" || this.state.
        childrenNo === "") {
        errorArr.push("Please fill all the required data");
        }
        if (this.state.financingPeriod > maxPeriod(this.state.loanType)) {
            errorArr.push("The financing period is higher than allowed!");
        }
        if (this.state.loanInRONeq > maxAmount(this.state.loanType)) {
            errorArr.push("The loan amount is higher than allowed!");
        }
        if (errorArr.length === 0) {
           this.setState({
               visibility: "visible",
               submitDisabledStatus: true
           })
        }
        else {
            alert(errorArr.join("\n"));
        }
    };

    handleClick = () => {
        this.setState({
            income: "",
            existingInstallments: "",
            childrenNo: "",
            loanType: "",
            financingPeriod: "",
            loanAmount: "",
            loanCcy: "",
            loanInRONeq: "",
            interestPercent: "",
            monthlyInstallment: "",
            visibility: "hidden",
            submitDisabledStatus: false
        });
    };

    handleClick2 = (ev) => {
        ev.stopPropagation();
        let errorArr = [];
        if (this.state.loanType === "" || this.state.loanCcy === "" || this.state.loanAmount === "") {
            errorArr.push("Please fill in all data regarding the loan");
            }
        if (this.state.financingPeriod > maxPeriod(this.state.loanType)) {
            errorArr.push("Please modify the financing period to meet the max period!");
            }
        if (this.state.loanInRONeq.split(",").join("") > maxAmount(this.state.loanType)) {
            errorArr.push("Please modify the loan amount to meet the max ceiling!");
            }
        if (errorArr.length !== 0) {
            alert(errorArr.join("\n"));
            }
        else {
            this.setState({
            monthlyInstallment: creditCalculator(parseInt(this.state.loanAmount.split(",").join("")),this.state.interestPercent,
                this.state.financingPeriod)
            });
        }
    };

    render() {
        return (
            <div>
                <form className={"loanCheck"} onSubmit={this.handleSubmit}>
                    <div className = "financialData">
                    <h4>Please insert some financial data!</h4>
                    <label htmlFor={"income"}>Total monthly income (RON equiv)</label>
                    <div className={"container"}>
                    <input type={"text"} name={"income"} id={"income"} value={this.state.income} onFocus={this.handleFocus} onBlur={
                        this.handleBlur} onChange={this.handleChange} autoComplete={"off"}/>
                    <span>RON</span>
                    </div>
                    <label htmlFor={"installments"}>Existing monthly installments (RON equiv)</label>
                    <div className={"container"}>
                    <input type={"text"} name={"existingInstallments"} id={"installments"} value={this.state.existingInstallments}
                           onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} autoComplete={"off"}/>
                    <span>RON</span>
                    </div>
                    <label htmlFor={"childrenNo"}>No of minor children</label>
                    <select name={"childrenNo"} id={"childrenNo"} value={this.state.childrenNo} onChange={this.handleChange} >
                        <option value={""}></option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3 or more</option>
                    </select>
                    </div>
                    <br />
                    <div className = {"loanData"}>
                    <h4>Monthly installment calculator</h4>
                    <label>Select loan type
                        <span>  </span>
                    <select name={"loanType"} id={"loanType"} value={this.state.loanType} onChange={this.handleChange}>
                        <option value={""}> </option>
                        <option value={"consumerLoan"}>Consumer Loan</option>
                        <option value={"mortgageLoan"}>Mortgage Loan</option>
                    </select>
                    </label>
                    <div className={"financingPer"}>
                    <label htmlFor={"financingPeriod"}>Period (max {maxPeriod(this.state.loanType)} months) </label>
                    <input type={"number"} name={"financingPeriod"} id={"financingPeriod"} value={this.state.financingPeriod}
                           onChange={this.handleChange} onBlur={this.handleBlur}/><span>Months</span>
                    </div>
                    <label htmlFor={"loanAmount"}>Loan Amount (max {displayNumber(maxAmount(this.state.loanType))} RON)</label>
                    <div className={"loanAmount"}>
                    <input type={"text"} name={"loanAmount"} id={"loanAmount"} value={this.state.loanAmount} placeholder={"Amount"}
                           onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} autoComplete={"off"}/>
                    <select name={"loanCcy"} id={"loanCcy"} value={this.state.loanCcy} onChange={this.handleChange} onBlur={this.handleBlur}>
                        <option value={""}>Ccy </option>
                        <option value={"RON"}>RON</option>
                        <option value={"EUR"}>EUR</option>
                        <option value={"USD"}>USD</option>
                    </select>
                        <input type={"text"} name={"loanInRONeq"} id={"loanInRONeq"} value={this.state.loanInRONeq} disabled={true}
                               placeholder={"RON eq"} onChange={this.handleChange} />
                        <span id={"RON"}>RON</span>
                        <input type={"text"} name={"interestPercent"} id={"interestPercent"} value={(this.state.loanType!=="" &&
                        this.state.loanCcy!=="") ? interestPercent(this.state.loanType,this.state.loanCcy) : ""} disabled={true}
                        placeholder={"Int rate"}/>
                        <span id={"percent"}>%</span>
                    </div>
                    </div>
                    <div className={"buttons"}>
                        <div className={"monthlyInstallment"}>
                            <button type={"button"} name={"calculateInstallment"} id={"calculateInstallment"} onClick={this.handleClick2}>Compute installment</button>
                            <div className={"monthlyInstallmentData"}>
                                <input name={"monthlyInstallment"} id={"monthlyInstallment"} autoComplete={"off"}
                                       value = {displayNumber(this.state.monthlyInstallment)} />
                                <span>{this.state.loanCcy} / month</span>
                            </div>
                        </div>
                        <div className={"submitButton"}>
                            <button type={"submit"} name={"submitLoanForm"} id={"submitLoanForm"} disabled={this.state.submitDisabledStatus}>
                                Submit request</button>
                        </div>
                        <div className={"precheckResolution"} style={{visibility: this.state.visibility}}>
                        {checkLoanReimbursementAbility(parseInt(this.state.income.split(",").join("")),this.state.childrenNo, parseInt
                        (this.state.existingInstallments.split(",").join("")), this.state.loanCcy,this.state.monthlyInstallment,
                            this.state.rateEUR,this.state.rateUSD) ?
                            <h4>Congratulations, you can get the loan!</h4> :
                            <h4>Sorry, insufficient income to get the loan!</h4>}
                            <br/>
                            <button type={"button"} onClick={this.handleClick}>Reset info</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default GetLoan;