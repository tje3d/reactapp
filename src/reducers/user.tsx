import * as constants from 'consts';
import * as interfaces from 'interfaces';

let initialState = {
    user: null,
    repos: [],
    loading: false
};

export default function Reducer(state: interfaces.StateUser, action: any): interfaces.StateUser {
    if (!state) {
        return initialState;
    }

    console.log(action.type);

    switch (action.type) {
        case constants.USER_FETCH:
        case constants.USER_REPOSITORIES_FETCH:
            return {
                ...state,
                loading: true
            }
        case constants.USER_FETCH_FULFILLED:
            return {
                ...state,
                loading: false,
                user: action.user
            }
        case constants.USER_REPOSITORIES_FETCH_FULFILLED:
            return {
                ...state,
                loading: false,
                repos: action.repos,
            }
        default:
            return state;
    }
}