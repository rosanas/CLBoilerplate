import React from "react";
import MenuList from "./menuList";
import {NavLink} from "react-router-dom";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenuList: "none"
        }
    };

    handleMouseOver = () => {
        this.setState({
            displayMenuList: "block"
        })
    };

    handleMouseLeave = () => {
        this.setState({
            displayMenuList: "none"
        })
    };

    render() {
        return (
            <nav>
                <div className={"container"}>
                    <NavLink activeStyle={{textDecoration: 'underline'}} style={{textDecoration: 'none'}} exact
                             to="/LoginAccount">
                        My account</NavLink>
                    <img id="menu" src="http://localhost:63342/CLBoilerplate/assets/images/menu.png" alt="menu image"
                         onMouseOver={this.handleMouseOver}/>
                </div>
                <MenuList style={{display: this.state.displayMenuList}} onMouseLeave={this.handleMouseLeave}/>
            </nav>
        )
    }
}

export default Nav;