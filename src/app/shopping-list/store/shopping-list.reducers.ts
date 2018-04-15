import { Ingredient } from '../../shared/ingredient.model';
import * as slActions from './shopping-list.actions';

export interface AppState {
    shoppingList: ShoppingListState;

}
export interface ShoppingListState {
    ingredients: Ingredient[];
    currentIngredient: Ingredient;
    currentIndex: number;
}

const initialState: ShoppingListState = {
    ingredients:  [
        new Ingredient('bread', 2),
        new Ingredient('marmalade', 1)
    ],
    currentIngredient: null,
    currentIndex: -1
};

export function shoppingListReducer(state = initialState, action: slActions.ShoppingListActions) {
    switch (action.type) {
        case slActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [ ...state.ingredients, action.payload]
            };
        case slActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [ ...state.ingredients, ...action.payload]
            };
        case slActions.UPDATE_INGREDIENT:
            const ingredients = state.ingredients.map((ing: Ingredient, i: number) => (
                    i !== state.currentIndex ? ing : action.payload
                ));
            return {
                ...state,
                ingredients: [...ingredients],
                currentIngredient: null,
                currentIndex: -1
            };
        case slActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ing: Ingredient, index: number) => index !== state.currentIndex),
                currentIngredient: null,
                currentIndex: -1
            };
        case slActions.START_EDIT:
            return {
                ...state,
                currentIndex: action.payload,
                currentIngredient: {...state.ingredients[action.payload]}
            };
        case slActions.STOP_EDIT:
            return {
                ...state,
                currentIngredient: null,
                currentIndex: -1
            };
        default:
            return state;
        }
}
