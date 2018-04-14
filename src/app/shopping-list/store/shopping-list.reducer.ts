import { Ingredient } from '../../shared/ingredient.model';
import * as slActions from './shopping-list.actions';


const initialState = {
    ingredients:  [
        new Ingredient('bread', 2),
        new Ingredient('marmalade', 1)
    ]
};

export function shoppingListReducer(state = initialState, action: slActions.ShoppingListActions) {
    switch (action.type) {
        case slActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [ ...state.ingredients, action.payload]
            };
        default:
            return state;
        }
}
