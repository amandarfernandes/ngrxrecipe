import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  menuItem:string="recipes"

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCX_Ly67p5Mpy5SNC2xJ8GjiDefJlxZKC8",
      authDomain: "ng-recipebook-mandycodestoo.firebaseapp.com"
    });
  }
  
}
