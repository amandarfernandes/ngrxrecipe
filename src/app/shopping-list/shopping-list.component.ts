import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducers';
import * as slActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
     this.shoppingListState = this.store.select('shoppingList');
  }

  onEditIngredient(i: number) {
    this.store.dispatch(new slActions.StartEdit(i));
  }
}
