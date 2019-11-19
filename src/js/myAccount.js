import React from "react";
import {NavLink} from "react-router-dom";
import displayNumber from "./displayNumber";

class MyAccount extends React.Component {
    state = {
        accountsArr: [
            {accountCode: "RO20XXXX1456247836957RON",
            accountBalance: 14500},
            {accountCode: "RO15XXXX1456247832389EUR",
            accountBalance: 2000},
            {accountCode: "RO45XXXX1456247833612USD",
            accountBalance: 500}],
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

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    };

    totalFunds = (arrObj,rateEUR,rateUSD) => {
        let totalSum = 0;
        arrObj.map(element => {
            switch (element.accountCode.substring(21, 24)) {
                case "RON":
                    totalSum = totalSum + element.accountBalance;
                    break;
                case "EUR":
                    totalSum = totalSum + Math.round(element.accountBalance * rateEUR);
                    break;
                case "USD":
                    totalSum = totalSum + Math.round(element.accountBalance * rateUSD);
                    break;
            }
        });
        return totalSum;
    };

    render() {
        return (
            <div className={"myAccount"}>
                <h3>Financial statement</h3>
                <input type={"text"} value={(new Date().getMonth()+1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()}
                       name={"statementDate"} id={"statementDate"} onChange={this.handleChange}
                placeholder={"Current Date"}/>
                <br/>
                <table>
                    <thead>
                    <tr>
                        <th>Account Number</th>
                        <th>Account balance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.accountsArr.map((element,index) => {
                        return(
                            <tr key={index}>
                                <td>{element.accountCode}</td>
                                <td>{displayNumber(element.accountBalance)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <h3>Total funds {displayNumber(this.totalFunds(this.state.accountsArr,this.state.rateEUR,this.state.rateUSD))} RON</h3>
                <br/>
                <br/>
                <button>
                    <NavLink className={"exchangeOperations"} exact to={"/ExchangeOps"}>Exchange operations</NavLink>
                </button>
                <br/>
                <button>
                    <NavLink className={"getLoan"} exact to = {"/GetLoan"}>Check ability to get a loan</NavLink>
                </button>
            </div>
        )
    }
}

export default MyAccount;