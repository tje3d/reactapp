import * as constants from 'consts';
import * as actions from 'actions/users';
import * as interfaces from 'interfaces';
import * as api from 'services/users';
// import { Observable } from 'rxjs/Observable';

export const Search = (action$: any) =>
    action$.ofType(constants.USERS_SEARCH)
        .map(({text, page}: interfaces.ActionUsersSearch) => ({text, page}))
        .switchMap(api.search)
        .map(actions.searchResult)

export const Fetch = (action$: any) =>
    action$.ofType(constants.USERS_FETCH)
        .switchMap((action: any) => api.fetchUser(action.username).map(actions.fetchResult))

export const Pagination = (action$: any, store: any) =>
    action$.ofType(constants.USERS_SEARCH_FULFILLED)
        .filter((input: any) => {
            let userList = store.getState().users.list;
            if (input.list.length < 5) { return false; }
            return userList.length % 10 !== 0;
        })
        .map(({text, page}: interfaces.ActionUsersSearch) => ({text, page: page + 1}))
        .switchMap(api.search)
        .map(actions.searchResult)