import { EventEmitter, Injectable } from '@angular/core';
import {Recipe}  from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    private recipes:Recipe[]=[   
        new Recipe(
        'Toast',
        'Well toasted bread with marmalade',
        'https://source.unsplash.com/9RGPG_ksS3Q',
        [
            new Ingredient('bread',2),
            new Ingredient('marmalade',1)
        ]),
        new Recipe(
        'Milkshake',
        'A delicious milkshake to tickle your tastebuds',
        'https://source.unsplash.com/VnsBx4onRxQ',
        [
            new Ingredient('milk',1),
            new Ingredient('banana',1),
            new Ingredient('cinammon',1),
            new Ingredient('sugar',1)
        ]) 
      ];
    
    recipesChanged:Subject<Recipe[]> = new Subject();
   
    constructor(private slService:ShoppingListService) {}
    
    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id:number) {
        return this.recipes.slice()[id];
    }

    addIngredients(ingredients:Ingredient[]) { 
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index:number,recipe:Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index:number) {
        const newRecipes = this.recipes.filter((recipe:Recipe,i:number)=>i !== index)
        this.recipes = newRecipes;
        this.recipesChanged.next(this.recipes.slice())
    }
}