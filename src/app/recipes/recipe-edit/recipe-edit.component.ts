import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
        private router: Router,
        private store: Store<fromRecipe.FeatureState>) { }

  private initForm() {
    let recipeName = '';
    let recipeUrl = '';
    let recipeDescription = '';
    const ingredients = new FormArray([]);
    console.log(this.editMode);
    if (this.editMode) {
        // const recipe: Recipe = //this.recipeService.getRecipe(this.recipeId);
        this.store.select('recipes')
          .take(1)
          .subscribe((recipeState: fromRecipe.RecipeState) => {
            // const recipe = recipeState.recipes[this.recipeId];
            console.log(recipeState);
            const recipe = recipeState.recipes[this.recipeId];
            recipeName = recipe.name;
            recipeUrl = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe['ingredients']) {
              recipe.ingredients.forEach((ingredient: Ingredient) => {
                ingredients.push(new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9+[0-9]*$/)])
                }));
              });
            }
        });
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': ingredients
    });

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
        'name': new FormControl(null, Validators.required),
    'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  ngOnInit() {
      this.subscription = this.route.params
          .subscribe((params: Params) => {
            this.recipeId = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
          });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.editMode = false;
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmitRecipe() {
    const {value} = this.recipeForm;

    const recipeIngredients: Ingredient[] = [];
    if (value['ingredients']) {
      const {ingredients} = value;
      ingredients.forEach(ingredient => {
        recipeIngredients.push(new Ingredient(ingredient.name, ingredient.amount));
      });
    }

    const recipe = new Recipe(value.name, value.description, value.imagePath, recipeIngredients);
    if (this.editMode) {

      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.recipeId, recipe}));
    } else {

      this.store.dispatch(new RecipeActions.AddRecipe(recipe));
    }
    this.onCancel();
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
