import React, { Component } from "react";
import axios from 'axios';

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: []
        }
    }

    getPortfolioItems() {
        axios.get('https://chrisburbidge.devcamp.space/portfolio/portfolio_items', {
            withCredentials: true
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log('error in get portfolio itmes', error)
        })
    }

    componentDidMount() {
        this.getPortfolioItems()
    }

    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <h1>Portfolio form...</h1>
                </div>

                <div className="right-column">
                    <h1>Portofolio sidebar...</h1>
                </div>
            </div>
        )
    }
}

