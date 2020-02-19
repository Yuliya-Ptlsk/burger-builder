import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    componentWillMount() {
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        // for (let param of query.entries()) {
        //     if (param[0] === 'price') {
        //         price = param[1];
        //     } else {
        //         ingredients[param[0]] = +param[1];
        //     }
        // };

        // this.setState({ ingredients: ingredients, price: price });        
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />        
        if (this.props.ings) {
            let purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            )
        }

        return summary;
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
        //price: state.burgerBuilder.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);