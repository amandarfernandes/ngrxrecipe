import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription:Subscription;
  editMode=false;
  index:number;
  ingredient:Ingredient;
  @ViewChild('form') slForm:NgForm;
  constructor(private slService: ShoppingListService) {}

  ngOnInit() { 
    this.subscription = this.slService.ingredientEdit
            .subscribe((index:number)=>{
              this.editMode=true;
              this.index=index;
              this.ingredient = this.slService.getIngredient(index);
              this.slForm.setValue({name:this.ingredient.name,
              amount:this.ingredient.amount});
    })
  }

  onDelete() {
    this.slService.deleteIngredient(this.index);
    this.editMode=false;
    this.slForm.reset();
  }
  
  onClear() {
    this.editMode=false;
  this.slForm.reset();
  }
  onSubmitIngredient(form: NgForm) {
    const { value } = form;
    
    const ingredient = new Ingredient(value.name,value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.index,ingredient)
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.editMode=false;
    form.reset();
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
