import React, { Component } from 'react';

import TopSlider from "./TopSlider";
import RandomProduct from "./RandomProduct"

export default class Landing extends Component {
    render() {
        return (
            <div className="home-landing">
                <TopSlider></TopSlider>
                <RandomProduct></RandomProduct>
            </div>
        )
    }
}
