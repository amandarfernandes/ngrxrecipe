import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { fromPromise } from 'rxjs/observable/fromPromise';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import * as firebase from 'firebase';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';


@Injectable()
export class RecipeEffects {
    @Effect({dispatch: false})
    recipesStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {
            const req = new HttpRequest('PUT',
            'https://ng-recipebook-mandycodestoo.firebaseio.com/recipes.json',
            state.recipes,
            {reportProgress: true}
        );
        return this.httpClient.request(req);
        });
    @Effect()
    recipesFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
     return this.httpClient.get<Recipe[]>(
            'https://ng-recipebook-mandycodestoo.firebaseio.com/recipes.json',
            {
            observe: 'body',
            responseType: 'json'
            }
        );
    })
    .map((recipes) => {
        recipes.forEach(recipe => {
            if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
            }
        });
        return {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
        };
    });

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.FeatureState>) {}
}
