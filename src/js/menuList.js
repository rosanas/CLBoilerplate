import React from "react";
import {NavLink} from "react-router-dom";

class MenuList extends React.Component {
    constructor(props) {
        super(props);
        this.listArray = ["Register client", "Get a loan"];
    }

    newPath = index => {
        let newPath = "";
        switch (index) {
            case 0:
                newPath = "/RegisterClient";
                break;
            case 1:
                newPath = "/GetLoan";
                break;
        }
        return newPath;
    };

    render() {
        return (
            <ul className={"menu"} style={this.props.style} onMouseLeave={this.props.onMouseLeave}>
                {this.listArray.map((element, index) => {
                    return (
                        <li key={index}><NavLink exact to = {this.newPath(index)}>{element}</NavLink></li>
                    )
                })
                }
            </ul>
        )
    }
}

export default MenuList;