import { Actions, Effect} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as authActions from './auth.actions';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignin = this.actions$
            .ofType(authActions.START_SIGNIN)
            .map((action: authActions.StartSignin) => {
                return action.payload;
            })
            .switchMap((authData: {email: string, password: string}) => {
                return fromPromise(
                    firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
                );
            })
            .switchMap(() => {
                return fromPromise(
                    firebase.auth().currentUser.getIdToken()
                );
            })
            .mergeMap((token: string) => {
                this.router.navigate(['/']);
                return [
                  {
                      type: authActions.SIGNIN_SUCCESS
                  },
                  {
                      type: authActions.SET_TOKEN,
                      payload: token
                  }
              ];
            });

    @Effect()
    authSignup = this.actions$
        .ofType(authActions.START_SIGNUP)
        .map((action: authActions.StartSignup) => {
            return action.payload;
        })
        .switchMap((authData: {email: string, password: string}) => {
           return fromPromise(
               firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
            );
        })
        .switchMap(() => {
            return fromPromise(
                firebase.auth().currentUser.getIdToken()
            );
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: authActions.SIGNUP_SUCCESS
                },
                {
                    type: authActions.SET_TOKEN,
                    payload: token
                }
            ];
        });

        @Effect({dispatch: false})
        authLogout = this.actions$
            .ofType(authActions.LOGOUT_USER)
            .do(() => {
                this.router.navigate(['/']);
            });

    constructor(private actions$: Actions, private router: Router) {  }
}
