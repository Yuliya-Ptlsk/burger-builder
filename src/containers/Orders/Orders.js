import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorrHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../redux/actions/index';
import Spiner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);    
    };

    render() {
        let orders = <Spiner />;

        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
        }

        return (
            <div>
                {orders}    
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorrHandler(Orders, axios));