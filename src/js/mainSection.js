import React from "react";

class MainSection extends React.Component {
    state = {
        backgroundImage: "http://localhost:63342/CLBoilerplate/assets/images/laptop.png"
    };

    componentDidMount() {
        const photoArray = ["http://localhost:63342/CLBoilerplate/assets/images/laptop.png",
            "http://localhost:63342/CLBoilerplate/assets/images/house.png", "http://localhost:63342/CLBoilerplate/assets/images/car.png"];
        let index = 0;
        this.idInterval = setInterval(() => {
            if (index < photoArray.length - 1) {
                index = index + 1;
                this.setState({
                    backgroundImage: photoArray[index]
                })
            } else if (index === photoArray.length - 1) {
                index = 0;
                this.setState({
                    backgroundImage: photoArray[index]
                })
            }
        }, 3000)
    };

    componentWillUnmount() {
        clearInterval(this.idInterval);
    }

    render() {
        return (
            <section className={"main"}>
                <div className={"container"} style={{backgroundImage: `url(${this.state.backgroundImage})`}}></div>
                <p className={"motto"}>You can have <strong>everything you want</strong> <br/> should you choose the <strong>right financing</strong></p>
            </section>
        )
    }
}

export default MainSection;