import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
