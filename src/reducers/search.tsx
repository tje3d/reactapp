import * as constants from 'consts';
import { SearchActions, SearchState } from 'interfaces';

let initialState = {
    loading: false,
    list: [],
    total: 0,
    user: null
};

export default function Reducer(state: SearchState, action: SearchActions): SearchState {
    if (!state) {
        return initialState;
    }

    switch (action.type) {
        case constants.SEARCH_SEARCH:
            return {
                ...state,
                loading: true
            }
        case constants.SEARCH_SETRESULT:
            return {
                ...state,
                total: action.total,
                list: action.result,
                loading: false,
            }
        case constants.SEARCH_FETCHUSERINFO:
            return {
                ...state,
                loading: true,
            }
        case constants.SEARCH_SETFETCHUSERINFO:
            return {
                ...state,
                loading: false,
                user: action.info,
            }
        default:
            return state;
    }
}