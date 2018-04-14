import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

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
    private recipeService: RecipeService,
    private router: Router) { }

  private initForm() {
    let recipeName = '';
    let recipeUrl = '';
    let recipeDescription = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
        const recipe: Recipe = this.recipeService.getRecipe(this.recipeId)
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
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': ingredients
    })

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
        'name': new FormControl(null, Validators.required),
    'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(i: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i)
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
        recipeIngredients.push(new Ingredient(ingredient.name, ingredient.amount))
      });
    }

    const recipe = new Recipe(value.name, value.description, value.imagePath, recipeIngredients);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
