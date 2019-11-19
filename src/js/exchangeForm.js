import React from "react";
import displayNumber from "./displayNumber";
import GenerateListItems from "./ccyListGeneration";
import AccountsListGeneration from "./accountsListGeneration";
import {accountsArr,accountBalanceRetrieve,computeAmountRON} from "./constants";

class ExchangeForm extends React.Component {
    state = {
        operationType: "",
        foreignCcy: "",
        amountForeignCcy: "",
        debitAccount: "",
        creditAccount: "",
        amountRON: "",
        checkOutcome: "",
        disabledStatus: false,
        accountsArr: accountsArr,
        rateEUR: "",
        rateUSD: ""
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
        if (ev.target.name === "amountForeignCcy") {
            if (ev.target.value !== "") {
                if (!isNaN(ev.target.value)) {
                    this.setState({
                        amountForeignCcy: ev.target.value,
                        amountRON: this.state.amountForeignCcy !== "" ? computeAmountRON(parseInt(ev.target.value),
                            this.state.foreignCcy,this.state.rateEUR,this.state.rateUSD).toString() : ""
                    });
                } else {
                    alert("Please insert a valid number!");
                }
            } else {
                this.setState({
                    amountForeignCcy: "",
                    amountRON: ""
                })
            }
        } else if (ev.target.name === "foreignCcy") {
            this.setState({
                foreignCcy: ev.target.value,
                amountRON: (ev.target.value !== "" && this.state.amountForeignCcy !== "") ? displayNumber(computeAmountRON
                (parseInt(this.state.amountForeignCcy.split(",").join("")), ev.target.value,this.state.rateEUR,this.state.rateUSD).toString()) : "",
                debitAccount: ""
            })
        } else if (ev.target.name === "operationType") {
                this.setState({
                    operationType: ev.target.value,
                    debitAccount: "",
                    creditAccount: ""
                })
            }
        else {
            this.setState({
                [ev.target.name]: ev.target.value
            });
        }
    };

    handleFocus = ev => {
        if (ev.target.value !== "") {
            this.setState({
                amountForeignCcy: this.state.amountForeignCcy.split(",").join(""),
                amountRON: this.state.amountRON.split(",").join("")
            });
        }
    };

    handleBlur = () => {
        this.setState({
            amountForeignCcy: displayNumber(this.state.amountForeignCcy),
            amountRON: displayNumber(this.state.amountRON)
        });
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        const amountRequired = (this.state.operationType === "Buy" ? parseInt(this.state.amountRON.split(",").join("")) :
            parseInt(this.state.amountForeignCcy.split(",").join("")));
        const amountObtained = (this.state.operationType === "Buy" ? parseInt(this.state.amountForeignCcy.split(",").join("")) :
            parseInt(this.state.amountRON.split(",").join("")));

        if (this.state.operationType === "" || this.state.debitAccount === "" || this.state.creditAccount === "" ||
            this.state.amountForeignCcy === "" || this.state.foreignCcy === "") {
            this.setState({
                checkOutcome: "Fill in all the fields"
            });
        } else {
            if (parseInt(accountBalanceRetrieve(this.state.debitAccount).split(",").join("")) < amountRequired) {
                this.setState({
                    checkOutcome: "Insufficient funds!"
                });
            } else {
                this.setState({
                    disabledStatus: true,
                    checkOutcome: "Transaction was successfully completed! Please see above the modified balances!",
                    accountsArr: this.state.accountsArr.map((element) => {
                        if (element.accountCode === this.state.debitAccount) {
                            element.accountBalance = element.accountBalance - amountRequired;
                        } else if (element.accountCode === this.state.creditAccount) {
                            element.accountBalance = element.accountBalance + amountObtained;
                        }
                        return element;
                    })
                });
            }
        }
    };

    handleClick = () => {
        this.setState({
            operationType: "",
            foreignCcy: "",
            amountForeignCcy: "",
            debitAccount: "",
            creditAccount: "",
            amountRON: "",
            checkOutcome: "",
            disabledStatus: false
        });
        const opType = document.getElementsByName("operationType");
        for (let i=0; i<opType.length; i++) {
            opType[i].checked = false;
        }
    };

    render() {
        return (
            <form className={"exchangeForm"} onSubmit={this.handleSubmit}>
                <h4>Select exchange operation type - Buy/Sell</h4>
                <div className={"exchangeOpType"}>
                    <label htmlFor={"opTypeBuy"}>Buy</label>
                    <input type={"radio"} name={"operationType"} id={"opTypeBuy"} value={"Buy"} disabled={this.state.disabledStatus}
                           onChange={this.handleChange}/>
                    <label htmlFor={"opTypeSell"}>Sell</label>
                    <input type={"radio"} name={"operationType"} id={"opTypeSell"} value={"Sell"} disabled={this.state.disabledStatus}
                           onChange={this.handleChange}/>
                </div>
                {this.state.operationType === "" ?
                    <h4>Select foreign currency</h4> : this.state.operationType === "Buy" ?
                        <h4>Select the foreign currency to be bought</h4> :
                        <h4>Select the foreign currency to be sold</h4>}
                <div className={"exchangeOpDesc"}>
                    <select name={"foreignCcy"} value={this.state.foreignCcy} disabled={this.state.disabledStatus}
                            onChange={this.handleChange}>
                        <GenerateListItems/>
                    </select>
                    <input type={"text"} name={"amountForeignCcy"} id={"amountForeignCcy"}
                           value={this.state.amountForeignCcy}
                           placeholder={"Input amount (int)"} autoComplete={"off"} onChange={this.handleChange}
                           onFocus={this.handleFocus}
                           onBlur={this.handleBlur} disabled={this.state.disabledStatus}/>
                </div>
                {this.props.operationType === "" ?
                    <h4>Amount equivalent in RON</h4> : this.state.operationType === "Buy" ?
                        <h4>Amount required for the operation</h4> : <h4>Amount obtained from the operation</h4>
                }
                <div className={"amountRON"}>
                    <input type={"text"} name={"amountRON"} id={"amountRON"} value={this.state.amountRON}
                           onChange={this.handleChange}
                           disabled={true}/>
                    <span>RON</span>
                </div>
                <div className={"exchangeOpAccounts"}>
                    <h4>Please select the debit account</h4>
                    <div className={"accountDisplay"}>
                        <select name={"debitAccount"} value={this.state.debitAccount}
                                disabled={this.state.disabledStatus}
                                onChange={this.handleChange}>
                            {this.state.operationType === "Buy" ? <AccountsListGeneration accountCcy={"RON"}/> :
                                <AccountsListGeneration accountCcy={this.state.foreignCcy}/>
                            }
                        </select>
                        <input type={"text"} name={"debitAccBalance"} id={"debitAccBalance"} disabled={true} value=
                            {this.state.debitAccount !== "" ? accountBalanceRetrieve(this.state.debitAccount) : ""}/>
                    </div>
                    <h4>Please select the credit account</h4>
                    <div className={"accountDisplay"}>
                        <select name={"creditAccount"} value={this.state.creditAccount}
                                disabled={this.state.disabledStatus}
                                onChange={this.handleChange}>
                            {this.state.operationType === "Buy" ?
                                <AccountsListGeneration accountCcy={this.state.foreignCcy}/> :
                                <AccountsListGeneration accountCcy={"RON"}/>
                            }
                        </select>
                        <input type={"text"} name={"creditAccBalance"} id={"creditAccBalance"} disabled={true} value=
                            {this.state.creditAccount !== "" ? accountBalanceRetrieve(this.state.creditAccount) : ""}/>
                    </div>
                </div>
                <div className={"submitBtn"}>
                    <button type={"submit"} disabled={this.state.disabledStatus}>Confirm transaction!</button>
                </div>
                <div className={"checkTransaction"}>
                    {!this.state.checkOutcome ?
                        <> </> :
                        <>
                            <h4>{this.state.checkOutcome}</h4>
                            {this.state.checkOutcome === "Transaction was successfully completed! Please see above the modified balances!" ?
                                <button onClick={this.handleClick}>Reset</button> : <></>}
                        </>
                    }
                </div>
            </form>
        )
    };
}

export default ExchangeForm;