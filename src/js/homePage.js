import React from "react";
import Header from "./header";
import Logo from "./logo";
import Nav from "./nav";
import ExchangeRates from "./exchangeRates";
import MainSection from "./mainSection";
import ArticleSection from "./articleSection";
import News from "./news";
import Footer from "./footer";

class HomePage extends React.Component {

    render() {
        return (
            <>
                <Header>
                    <Logo/>
                    <Nav/>
                </Header>
                <MainSection/>
                <ArticleSection>
                    <ExchangeRates />
                    <News/>
                </ArticleSection>
                <Footer/>
            </>
        )
    }
}

export default HomePage;