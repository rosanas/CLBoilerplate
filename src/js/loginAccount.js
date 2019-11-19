import React from "react";
import {NavLink} from "react-router-dom";

const color = "lightseagreen";

class LoginAccount extends React.Component {
    state = {
        userName: "",
        password: "",
        onOff: false,
        errorsArr: [],
        userBorderColor: color,
        passBorderColor: color,
        submitBackground: "lightpink"
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        let errorList = [];
        if (this.state.userName === "") {
            errorList.push("Please insert your user!");
            this.setState({
                userBorderColor: "red"
            })
        }
        else {
            this.setState({
                userBorderColor: color
            })
        }
        if (this.state.password === "") {
            errorList.push("Please insert your password!");
            this.setState({
                passBorderColor: "red"
            })
        }
        else {
            this.setState({
                passBorderColor: color
            })
        }
        if (errorList.length === 0) {
            this.setState({
                onOff: true,
                submitBackground: "lightgreen"
            })
        }
        else {
            this.setState({
                errorsArr: errorList,
                onOff: false
            });
        }
    };

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    };

    render() {
        return (
            <>
            <form className={"login"} onSubmit={this.handleSubmit}>
                <h4> Please insert your username and password </h4>
                <br/>
                <label htmlFor={"user"}>User Name</label>
                <input type={"text"} name={"userName"} id={"user"} value={this.state.userName} onChange={this.handleChange}
                        style={{borderColor: this.state.userBorderColor}} autoComplete={"off"}/>
                <br/>
                <label htmlFor={"pass"}>Password</label>
                <input type={"password"} name={"password"} id={"pass"} value={this.state.password} onChange={this.handleChange}
                       style={{borderColor: this.state.passBorderColor}}/>
                <br/>
                <button type={"submit"} name={"loginBtn"} id={"loginBtn"} style={{backgroundColor: this.state.submitBackground}}>
                    {this.state.onOff === true ?
                        <NavLink className={"login"} exact to={"/MyAccount"} >Press to Sign in</NavLink>
                        : "Submit"
                    }
                </button>
            </form>
                <div className={"errorList"}>
                        {this.state.errorsArr.length!==0 ? this.state.errorsArr.map((elem,index) => {
                        return(
                            <p key={index}>{elem}</p>
                        )
                    }):<p> </p>
                    }
                </div>
                </>
        )
    }
}

export default LoginAccount;