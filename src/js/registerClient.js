import React from "react";

class RegisterClient extends React.Component {
    state = {
        surname: "",
        name: "",
        streetType: " ",
        streetName: "",
        streetNo: "",
        blockNo: "",
        stairNo: "",
        apt: "",
        district: " ",
        localityType: " ",
        locality: "",
        county: " ",
        userName: "",
        password: ""
    };

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        const errorsArr = [];
        if (this.state.surname === "") {
            errorsArr.push("Please insert your surname!");
        }
        if (this.state.name === "") {
            errorsArr.push("Please insert your first name!");
        }
        if (this.state.streetType === "") {
            errorsArr.push("Please select the street type!");
        }
        if (this.state.streetName === "") {
            errorsArr.push("Please insert the street name!");
        }
        if (this.state.streetNo === "") {
            errorsArr.push("Please insert the street number!");
        }
        if (this.state.localityType === "") {
            errorsArr.push("Please select the locality type!");
        }
        if (this.state.locality === "") {
            errorsArr.push("Please insert the locality name!");
        }
        if (this.state.county === "") {
            errorsArr.push("Please insert the county!");
        }
        if (this.state.locality === "Bucuresti" && this.state.district === "") {
            errorsArr.push("Please insert the district!");
        }
        if (this.state.userName === "") {
            errorsArr.push("Please insert your username!");
        }
        if (this.state.password === "") {
            errorsArr.push("Please insert your password!");
        }
        if (errorsArr.length !== 0) {
            alert(errorsArr.join("\n"));
        }
    };

    render() {
        return (
            <form className={"newClient"} onSubmit={this.handleSubmit}>
                <div className={"container"}>
                    <h4>First Name and Surname</h4>
                    <div className={"name"}>
                        <label htmlFor={"surname"}>Surname</label>
                        <input type={"text"} name={"surname"} id={"surname"} value={this.state.surname}
                               onChange={this.handleChange}/>
                    </div>
                    <div className={"name"}>
                        <label htmlFor={"name"}>First Name</label>
                        <input type={"text"} name={"name"} id={"name"} value={this.state.name}
                               onChange={this.handleChange}/>
                    </div>
                    <h4>Address</h4>
                    <div className={"addressItems"}>
                        <label htmlFor={"streetType"}>Street</label>
                        <select name={"streetType"} value={this.state.streetType} id={"streetType"}
                                onChange={this.handleChange}>
                            <option value={"null"}></option>
                            <option value={"boulevard"}>Bd</option>
                            <option value={"street"}>Str</option>
                            <option value={"alley"}>Alley</option>
                            <option value={"road"}>Road</option>
                        </select>
                        <input type={"text"} name={"streetName"} id={"streetName"} value={this.state.streetName}
                               onChange={this.handleChange}/>
                    </div>
                    <div className={"addressItems"}>
                        <label htmlFor={"streetNo"}>No</label>
                        <input type={"number"} name={"streetNo"} id={"streetNo"} value={this.state.streetNo}
                               onChange={this.handleChange}/>
                        <label htmlFor={"blockNo"}>Block</label>
                        <input type={"text"} name={"blockNo"} id={"blockNo"} value={this.state.blockNo}
                               onChange={this.handleChange}/>
                        <label htmlFor={"stairNo"}>Stair</label>
                        <input type={"number"} name={"stairNo"} id={"stairNo"} value={this.state.stairNo}
                               onChange={this.handleChange}/>
                    </div>
                    <div className={"addressItems"}>
                        <label htmlFor={"apt"}>Apt No</label>
                        <input type={"number"} name={"apt"} id={"apt"} value={this.state.apt}
                               onChange={this.handleChange}/>
                        <label htmlFor={"district"}>District</label>
                        <select name={"district"} id={"district"} value={this.state.district}
                                onChange={this.handleChange}>
                            <option value={"null"}></option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                        </select>
                    </div>
                    <div className={"addressItems"}>
                        <label htmlFor={"localityType"}>Locality</label>
                        <select name={"localityType"} id={"localityType"} value={this.state.localityType}
                                onChange={this.handleChange}>
                            <option value={"null"}></option>
                            <option value={"town"}>Town</option>
                            <option value={"village"}>Village</option>
                            <option value={"city"}>City</option>
                        </select>
                        <input type={"text"} name={"locality"} id={"locality"} value={this.state.locality}
                               onChange={this.handleChange}/>
                    </div>
                    <label htmlFor={"county"}>County</label>
                    <select name={"county"} id={"county"} value={this.state.county} onChange={this.handleChange}>
                        <option value={"null"}></option>
                        <option>Bucuresti</option>
                        <option>Alba</option>
                        <option>Calarasi</option>
                        <option>Constanta</option>
                        <option>Mures</option>
                        <option>Timisoara</option>
                    </select>
                    <h4>Please set username & password</h4>
                    <div className={"user"}>
                        <label htmlFor={"user"}>User Name</label>
                        <input type={"text"} name={"userName"} id={"user"} value={this.state.userName}
                               onChange={this.handleChange}/>
                    </div>
                    <div className={"user"}>
                        <label htmlFor={"pass"}>Password</label>
                        <input type={"password"} name={"password"} id={"pass"} value={this.state.password}
                               onChange={this.handleChange}/>
                    </div>
                    <br/>
                    <div className={"submitBtn"}>
                        <button type={"submit"} name={"submitButton"} id={"submitButton"}>Register user</button>
                    </div>
                    <br />
                    <br />
                    <div className={"legend"}>
                        <span>Legend</span>
                        <div id={"legendSquare"}>  </div>
                        <span>Mandatory fields</span>
                    </div>
                </div>
            </form>
        )
    }
}

export default RegisterClient;