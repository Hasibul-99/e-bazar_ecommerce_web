import React, { Component } from 'react';

import TopSlider from "./TopSlider";
import RandomProduct from "./RandomProduct";
import ItemType from "./ItemType";

export default class Landing extends Component {
    render() {
        return (
            <div className="home-landing">
                <TopSlider></TopSlider>
                <ItemType></ItemType>
                <RandomProduct></RandomProduct>
            </div>
        )
    }
}
