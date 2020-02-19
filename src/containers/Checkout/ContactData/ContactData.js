import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Form/Input';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../../redux/actions/index';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },                
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP code"
                },
                value: "",
                validation: {
                    required: false,
                    maxLength: 5,
                    minLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-mail"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
               valid: true,
               value: "fastest"
            }
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for(let formElemId in this.state.orderForm){
            formData[formElemId] = this.state.orderForm[formElemId].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order, this.props.token);
    };

    changeHandler = (event, elementId) => {        
        let updatedForm = {
            ...this.state.orderForm            
        };
        let updatedFormElement = {
            ...updatedForm[elementId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[elementId] = updatedFormElement;

        let formIsValid = true;

        for(let elementId in updatedForm){
            formIsValid = updatedForm[elementId].valid && formIsValid;            
        }

        this.setState({orderForm: updatedForm, formIsValid: formIsValid});        
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(!rules){
            return true
        }
        if(rules.required){
            isValid = value.trim() !== "" && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;        
    }

    render() {
        let fornmElementsArr = [];

        for (let formElement in this.state.orderForm) {
            fornmElementsArr.push({
                id: formElement,
                config: this.state.orderForm[formElement]
            });
        };

        let form = (
            <form onSubmit={this.orderHandler}>                
                {
                    fornmElementsArr.map(formElement =>
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            invalid={!formElement.config.valid}
                            changed={(event) => this.changeHandler(event, formElement.id)}
                        />
                    )
                }                
                <div>
                    <Button btnType='Success' disabled={!this.state.formIsValid} >ORDER</Button>
                </div>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData} >
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionTypes.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));