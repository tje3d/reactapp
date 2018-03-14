import * as constants from 'consts';
import * as interfaces from 'interfaces';

let initialState = {
    loading: false,
    list: [],
    page: 0,
    total: 0,
};

export default function Reducer(state: interfaces.StateUsers, action: any): interfaces.StateUsers {
    if (!state) {
        return initialState;
    }

    switch (action.type) {
        case constants.USERS_SEARCH:
            return {
                ...state,
                // loading: true
            }
        case constants.USERS_SEARCH_REJECTED:
            return {
                ...state,
                loading: false
            }
        case constants.USERS_SEARCH_FULFILLED:
            return {
                ...state,
                total: action.total,
                list: state.list.concat(action.list),
                page: action.page,
                loading: false,
            }
        case constants.USERS_SEARCH_RESULT_CLEAR:
            return {
                ...state,
                total: 0,
                list: [],
                page: 0,
                loading: false,
            }
        default:
            return state;
    }
}