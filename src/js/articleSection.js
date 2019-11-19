import React from "react";
import ExchangeRates from "./exchangeRates";
import News from "./news";

class ArticleSection extends React.Component {
    render() {
        return (
            <section className={"articleSection"}>
                <article className={"exchangeRates"}>
                    <ExchangeRates/>
                </article>
                <article className={"news"}>
                    <News/>
                </article>
            </section>
        )
    }
}

export default ArticleSection;