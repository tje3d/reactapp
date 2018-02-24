import { AuthForm, AuthFormErrors } from 'interfaces';
import * as constants from 'consts';
import { Dispatch } from 'react-redux';

export function authLogin(dispatch: Dispatch<Function>, form: AuthForm): Promise<Function> {

    return new Promise((resolve, reject) => {
        let errors: AuthFormErrors = {};

        if (form.username == '') {
            errors.username = 'Username field is required';
        }

        if (form.password == '') {
            errors.password = 'Password field is required';
        }

        if (Object.keys(errors).length > 0 && form.password != '123') {
            errors.password = 'Wrong password';
        }

        if (Object.keys(errors).length > 0) {
            return reject(errors);
        }

        dispatch({
            type: constants.AUTH_LOGIN,
            form
        });

        resolve();
    });
}

export function authLogout(dispatch: Dispatch<Function>): void {
    dispatch({
        type: constants.AUTH_LOGOUT,
    });
}