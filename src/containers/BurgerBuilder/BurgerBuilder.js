import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from '../../redux/actions/index';
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
    state = {        
        purchasing: false        
    };  
    
    componentDidMount() {
        console.log(this.props); 
        this.props.onInitIngredients();       
    }

    updatePurchaseState(ingredients) {        
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, cur) => {
            return sum + cur
        },0);        
        return sum > 0;
    }

    // addIngredienrt = type => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = ENGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice,
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // };

    // removeIngredient = type => {
    //     const oldCount = this.props.ings[type];
    //     if(oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = ENGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice,
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // };

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing: true
            });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
       
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {        
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "Max Piatlitskiy",
        //         address: {
        //             street: "Teststreet 1",
        //             zipCode: "220055",
        //             country: "Belarus"
        //         },
        //         email: "test@test.com"
        //     },
        //     deliveryMethod: "fastest"
        // }
        // axios.post("/orders.json", order)
        //     .then(response => {                
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false,
        //         })
        //     });

        // const queryParams = [];

        // for(let ingredient in this.props.ings){
        //     queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.props.ingrs[ingredient]));
        // }

        // queryParams.push('price=' + this.state.totalPrice);

        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname:'/checkout',
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        let disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? <p style={{textAlign: "center"}}>Ingredients can't be loaded</p> : <Spinner />;
        let orderSummary = null;
        if(this.props.ings){
            burger = <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                ingredientAdded={this.props.onIngredientsAdded}
                ingredientRemoved={this.props.onIngredientsRemoved}
                disabled={disabledInfo}
                price={this.props.price}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                isAuth={this.props.isAuthenticated} />
                
            </Aux>;

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price}/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}    
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token != null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));