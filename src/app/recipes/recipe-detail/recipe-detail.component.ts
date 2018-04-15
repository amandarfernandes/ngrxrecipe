import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as slActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeDetail: Recipe;
  id: number;
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.route.params
    .subscribe((params: Params) => {
       this.id = +params['id'];
       this.recipeDetail = this.recipeService.getRecipe(this.id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  toShoppingList() {
    this.store.dispatch(new slActions.AddIngredients(this.recipeDetail.ingredients));
  }
}
