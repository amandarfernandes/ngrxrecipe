import { Action } from '@ngrx/store';

export const START_SIGNUP = 'START_SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const START_SIGNIN = 'START_SIGNIN';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_TOKEN = 'SET_TOKEN';

export class StartSignup implements Action {
    readonly type = START_SIGNUP;
    constructor(public payload: {email: string, password: string}) {}
}
export class StartSignin implements Action {
    readonly type = START_SIGNIN;
    constructor(public payload: {email: string, password: string}) {}
}
export class SignupSuccess implements Action {
    readonly type = SIGNUP_SUCCESS;
}

export class SigninSuccess implements Action {
    readonly type = SIGNIN_SUCCESS;
}

export class LogoutUser implements Action {
    readonly type = LOGOUT_USER;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string) {}
}

export type AuthActions =
    StartSignup|
    StartSignin|
    SignupSuccess |
    SigninSuccess |
    LogoutUser |
    SetToken;


