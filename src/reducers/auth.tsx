import * as constants             from 'consts';
import { AuthActions, AuthState } from 'interfaces';

let initialState = {
    isLogin: false
};

export default function Reducer(state: AuthState, action: AuthActions): AuthState {
    if (!state) {
        return initialState;
    }

    switch (action.type) {
        case constants.AUTH_LOGIN:
            return {
                ...state,
                isLogin: true,
                user: {
                    username: action.form.username,
                    token: Math.random().toString(),
                }
            };
        case constants.AUTH_LOGOUT:
            let forgedStorage = { ...state };
            delete forgedStorage.user;

            return {
                ...forgedStorage,
                isLogin: false
            };
        default:
            return state;
    }
}