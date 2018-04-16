import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as slActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  ingredient: Ingredient;
  @ViewChild('form') slForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
   this.subscription =  this.store.select('shoppingList')
    .subscribe((data) => {
      if (data.currentIndex > -1) {
        this.ingredient = data.currentIngredient;
        this.editMode = true;
        this.slForm.setValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onDelete() {
    this.store.dispatch(new slActions.DeleteIngredient());
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onSubmitIngredient(form: NgForm) {
    const { value } = form;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new slActions.UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new slActions.AddIngredient(ingredient));
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    this.store.dispatch(new slActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
