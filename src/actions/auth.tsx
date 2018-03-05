import * as interfaces from 'interfaces';
import * as constants from 'consts';
import { Action } from 'redux';

export function authLogin(form: interfaces.AuthForm): interfaces.ActionLogin {
    return {
        type: constants.AUTH_LOGIN,
        form
    };
}

export function authLogout(): Action {
    return {
        type: constants.AUTH_LOGOUT,
    };
}