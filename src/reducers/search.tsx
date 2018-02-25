import * as constants from 'consts';
import { SearchActions, SearchState } from 'interfaces';

let initialState = {
    loading: false,
    list: [],
    total: 0,
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
                loading: false,
                total: action.total,
                list: action.result
            }
        default:
            return state;
    }
}