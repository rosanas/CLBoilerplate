import React from "react";

class GenerateListItems extends React.Component {
    state = {
        accountsArr: ["RO20XXXX1456247836957RON", "RO15XXXX1456247832389EUR", "RO45XXXX1456247833612USD"]
    };

    render() {
        return (
            <>
                <option>Select</option>
                {this.state.accountsArr.map((element, index) => {
                    if (element.substring(21, 24) !== "RON") {
                        return (
                            <option key={index} value={element.substring(21, 24)}>{element.substring(21, 24)}</option>
                        )
                    }
                })
                }
            </>
        )
    }
}

export default GenerateListItems;