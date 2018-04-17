import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as slActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.RecipeState>;
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store< fromRecipe.FeatureState>
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
       this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
    });
  }

  onDelete() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

  toShoppingList() {
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.RecipeState) => {
        this.store.dispatch(new slActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }
}
