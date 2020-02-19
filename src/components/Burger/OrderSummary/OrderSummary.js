import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey, i) => {
            return <li key={igKey + i}><span style={{ textTransform: "capitalize" }}>{igKey}</span>: {props.ingredients[igKey]}</li>
        })

    return (
        <Aux>
            <h3>Your order</h3>
            <p>Adelecious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to check out?</p>
            <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;