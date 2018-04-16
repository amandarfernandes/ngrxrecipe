import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import 'rxjs/operators/take';
import 'rxjs/operators/map';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private store: Store<fromApp.AppState>) {}

    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth')
            .take(1)
            .map((authState: fromAuth.AuthState) => authState.authenticated)
    }
}