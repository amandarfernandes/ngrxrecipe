import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


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
    private router: Router) { }

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
    this.recipeService.addIngredients(this.recipeDetail.ingredients);
  }
}
