import * as constants from 'consts';
import * as interfaces from 'interfaces';

let initialState = {
    loading: false,
    list: [],
    total: 0,
    user: null
};

export default function Reducer(state: interfaces.StateUsers, action: any): interfaces.StateUsers {
    if (!state) {
        return initialState;
    }

    switch (action.type) {
        case constants.USERS_SEARCH_PENDING:
        case constants.USERS_SEARCH_REJECTED:
            return {
                ...state,
                loading: false
            }
        case constants.USERS_SEARCH_FULFILLED:
            return {
                ...state,
                total: action.payload.total,
                list: action.payload.items,
                loading: false,
            }
        case constants.USERS_SEARCH_RESULT_CLEAR:
            return {
                ...state,
                total: 0,
                list: [],
                loading: false,
            }
        case constants.USERS_FETCH_PENDING:
        case constants.USERS_FETCH_REJECTED:
            return {
                ...state,
                loading: true,
            }
        case constants.USERS_FETCH_FULFILLED:
            return {
                ...state,
                loading: false,
                user: action.payload,
            }
        default:
            return state;
    }
}