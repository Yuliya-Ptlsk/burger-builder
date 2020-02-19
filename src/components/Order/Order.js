import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({name: ingredient, amount: props.ingredients[ingredient]})
    }
    console.log(ingredients);
    let outputIngredients = ingredients.map(ingr => {
        return(
            <span key={ingr.name} style={{textTransform: 'capitalize', dispaly: 'inline-block', margin: '0 8px'}}>{ingr.name + '(' + ingr.amount + ')'}</span>
        );
    });
    return(
        <div className={classes.Order}>
            <p>Ingredients: {outputIngredients}</p>
            <p>Price: <strong>USD {(+props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;