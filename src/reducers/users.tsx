import * as constants from 'consts';
import * as interfaces from 'interfaces';

let initialState = {
    loading: false,
    list: [],
    total: 0,
    user: null
};

export default function Reducer(state: interfaces.StateUsers, action: interfaces.ActionUsers): interfaces.StateUsers {
    if (!state) {
        return initialState;
    }

    switch (action.type) {
        case constants.USERS_SEARCH:
            return {
                ...state,
                loading: true
            }
        case constants.USERS_SEARCH_RESULT:
            return {
                ...state,
                total: action.total,
                list: action.result,
                loading: false,
            }
        case constants.USERS_SEARCH_RESULT_CLEAR:
            return {
                ...state,
                total: 0,
                list: [],
                loading: false,
            }
        case constants.USERS_FETCH:
            return {
                ...state,
                loading: true,
            }
        case constants.USERS_FETCH_RESULT:
            return {
                ...state,
                loading: false,
                user: action.info,
            }
        default:
            return state;
    }
}