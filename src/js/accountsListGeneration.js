import React from "react";

class AccountsListGeneration extends React.Component {
    state = {
        accountsArr: [
            {accountCode: "RO20XXXX1456247836957RON",
                accountBalance: 14500},
            {accountCode: "RO15XXXX1456247832389EUR",
                accountBalance: 2000},
            {accountCode: "RO45XXXX1456247833612USD",
                accountBalance: 500}]
    };

    accountCcy;

    render() {
        return (
            <>
                <option> </option>
            {this.state.accountsArr.map((element, index) => {
                    {if (element.accountCode.substring(21,24) === this.props.accountCcy) {
                            return (
                                <option key={index} value={element.accountCode}>{element.accountCode}</option>
                            )
                        }
                    }
                })
            }

            </>
        )
    }
}

export default AccountsListGeneration;