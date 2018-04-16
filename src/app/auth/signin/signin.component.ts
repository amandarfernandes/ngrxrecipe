import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() { }

  onSignin(form: NgForm) {
    const {email, password} = form.value;
    this.store.dispatch(new AuthActions.StartSignin({email, password}));
  }

}
