import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: RecipeState;
}

export interface RecipeState {
    recipes: Recipe[];
}

const initialState: RecipeState = {
    recipes: [
        new Recipe(
        'Toast',
        'Well toasted bread with marmalade',
        'https://source.unsplash.com/9RGPG_ksS3Q',
        [
            new Ingredient('bread', 2),
            new Ingredient('marmalade', 1)
        ]),
        new Recipe(
        'Milkshake',
        'A delicious milkshake to tickle your tastebuds',
        'https://source.unsplash.com/VnsBx4onRxQ',
        [
            new Ingredient('milk', 1),
            new Ingredient('banana', 1),
            new Ingredient('cinammon', 1),
            new Ingredient('sugar', 1)
        ])
      ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    // console.log(state)
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: action.payload
            };
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPE):
            const { recipes } = state;
            const updatedRecipes = recipes.map((recipe: Recipe, index: number) => (
                index === action.payload.index ? action.payload.recipe : recipe ));

            return {
                ...state,
                recipes: updatedRecipes
            };
        case (RecipeActions.DELETE_RECIPE):
            return {
                ...state,
                recipes: state.recipes.filter((recipe: Recipe, id: number) => id !== action.payload)
            };
        default: return state;
    }
}
