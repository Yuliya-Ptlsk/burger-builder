import React from "react";
import { withRouter } from 'react-router-dom';

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"
//import BurgerBuilder from "../../containers/BurgerBuilder/BurgerBuilder";

const burger = props => {
    console.log(props);

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((c, i) => <BurgerIngredient key={igKey + i} type={igKey} />)
        })
        .reduce((arr, cur) => {
            return arr.concat(cur)
        }, [])

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start to add ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default (withRouter)(burger);