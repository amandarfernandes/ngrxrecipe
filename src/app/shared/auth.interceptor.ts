import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
 import { Injectable } from '@angular/core';
// import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

 @Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
            .take(1)
            .switchMap((authState: fromAuth.AuthState) => {
                const reqCopy = req.clone({params: req.params.set('auth', authState.token)});
                return next.handle(reqCopy);
            });
    }
}
