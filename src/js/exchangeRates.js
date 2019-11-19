import React from "react";

class ExchangeRates extends React.Component {
    state = {
        rateEUR: "",
        rateUSD: "",
        rateCHF: "",
        rateAUD: "",
        rateBGN: "",
        rateCAD: "",
        rateDKK: "",
        rateEGP: "",
        ratePLN: "",
        rateRUB: "",
        rateSEK: "",
        rateTRY: ""
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
            rateUSD: Math.round(resp.rates.RON/resp.rates.USD*10000)/10000,
            rateCHF: Math.round(resp.rates.RON/resp.rates.CHF*10000)/10000,
            rateAUD: Math.round(resp.rates.RON/resp.rates.AUD*10000)/10000,
            rateBGN: Math.round(resp.rates.RON/resp.rates.BGN*10000)/10000,
            rateCAD: Math.round(resp.rates.RON/resp.rates.CAD*10000)/10000,
            rateDKK: Math.round(resp.rates.RON/resp.rates.DKK*10000)/10000,
            rateEGP: Math.round(resp.rates.RON/resp.rates.EGP*10000)/10000,
            ratePLN: Math.round(resp.rates.RON/resp.rates.PLN*10000)/10000,
            rateRUB: Math.round(resp.rates.RON/resp.rates.RUB*10000)/10000,
            rateSEK: Math.round(resp.rates.RON/resp.rates.SEK*10000)/10000,
            rateTRY: Math.round(resp.rates.RON/resp.rates.TRY*10000)/10000,
        })
    })
    }

    render() {
        return (
            <>
                <h3>Exchange rates ECB</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Currency</th>
                        <th>Exchange rate</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td id={"EUR"}>EUR</td>
                        <td>{this.state.rateEUR}</td>
                    </tr>
                    <tr>
                        <td id={"USD"}>USD</td>
                        <td>{this.state.rateUSD}</td>
                    </tr>
                    <tr>
                        <td>CHF</td>
                        <td>{this.state.rateCHF}</td>
                    </tr>
                    <tr>
                        <td>AUD</td>
                        <td>{this.state.rateAUD}</td>
                    </tr>
                    <tr>
                        <td>BGN</td>
                        <td>{this.state.rateBGN}</td>
                    </tr>
                    <tr>
                        <td>CAD</td>
                        <td>{this.state.rateCAD}</td>
                    </tr>
                    <tr>
                        <td>DKK</td>
                        <td>{this.state.rateDKK}</td>
                    </tr>
                    <tr>
                        <td>EGP</td>
                        <td>{this.state.rateEGP}</td>
                    </tr>
                    <tr>
                        <td>PLN</td>
                        <td>{this.state.ratePLN}</td>
                    </tr>
                    <tr>
                        <td>RUB</td>
                        <td>{this.state.rateRUB}</td>
                    </tr>
                    <tr>
                        <td>SEK</td>
                        <td>{this.state.rateSEK}</td>
                    </tr>
                    <tr>
                        <td>TRY</td>
                        <td>{this.state.rateTRY}</td>
                    </tr>
                    </tbody>
                </table>
            </>
        )
    }
}

export default ExchangeRates;




