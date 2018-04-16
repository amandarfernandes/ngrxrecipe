import { Action } from '@ngrx/store';
import * as authActions from './auth.actions';

export interface AuthState {
    token: string;
    authenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    authenticated: false
};

export function AuthReducer(state = initialState, action: authActions.AuthActions) {
    switch (action.type) {
        case authActions.SIGNUP_SUCCESS:
        case authActions.SIGNIN_SUCCESS:
            return {
                ...state,
                authenticated: true
            };
        case authActions.LOGOUT_USER:
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case authActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default: return state;
    }
}
