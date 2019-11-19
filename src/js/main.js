import React from "react";
import ReactDOM from "react-dom";
import {Route, HashRouter} from "react-router-dom";
import HomePage from "./homePage";
import LoginAccount from "./loginAccount";
import MyAccount from "./myAccount";
import RegisterClient from "./registerClient";
import GetLoan from "./getLoan";
import ExchangeForm from "./exchangeForm";


class App extends React.Component {
    render() {
            return (
                <HashRouter>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/LoginAccount" component={LoginAccount}/>
                    <Route path="/MyAccount" component={MyAccount} />
                    <Route path="/ExchangeOps" component={ExchangeForm} />
                    <Route path="/RegisterClient" component={RegisterClient}/>
                    <Route path="/GetLoan" component={GetLoan} />
                </HashRouter>
            )
    }
}

document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(
        <App />,
        document.getElementById("app")
    );
});

