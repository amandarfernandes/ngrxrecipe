import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpRequest } from '@angular/common/http';


@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
       /* return this.httpClient.put('https://ng-recipebook-mandycodestoo.firebaseio.com/recipes.json',
                this.recipeService.getRecipes());
        */
       const req = new HttpRequest('PUT',
        'https://ng-recipebook-mandycodestoo.firebaseio.com/recipes.json',
        this.recipeService.getRecipes(),
        {reportProgress: true}
        );
        return this.httpClient.request(req);
    }

    getRecipes() {
        this.httpClient.get<Recipe[]>(
            'https://ng-recipebook-mandycodestoo.firebaseio.com/recipes.json',
            {
            observe: 'body',
            responseType: 'json'
            }
        )
            .map((recipes) => {
                recipes.forEach(recipe => {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                });
                return recipes;
            })
            .subscribe((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            });
    }

}
