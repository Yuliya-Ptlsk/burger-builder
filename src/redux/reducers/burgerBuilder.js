import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';


const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
    building: false    
};

const ENGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.6,
    bacon: 0.7,
}

const addIngredient = (state, action) => {
    let addedUpdatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            let addedUpdatedIngs = updateObject(state.ingredients, addedUpdatedIng);
            let updatedStateAfterAdd = {
                ingredients: addedUpdatedIngs,
                totalPrice: state.totalPrice + ENGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedStateAfterAdd);
};

const removeIngredient = (state, action) => {
    let removededUpdatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            let removedUpdatedIngs = updateObject(state.ingredients, removededUpdatedIng);
            let updatedStateAfterRem = {
                ingredients: removedUpdatedIngs,
                totalPrice: state.totalPrice + ENGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedStateAfterRem);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
            
        },
        totalPrice: 2,
        error: false,
        building: false
    })
};

const setIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true})
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);                       
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);            
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);              
        case actionTypes.SET_INGREDIENTS_FAILED: return setIngredientsFailed(state, action);             
        default: return state;    
    }
};

export default reducer;