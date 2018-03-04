import * as constants from 'consts';
import * as actions from 'actions/users';
import * as interfaces from 'interfaces';
import * as api from 'services/users';
import { Observable } from 'rxjs/Observable';

export const Search = (action$: any) =>
    action$.ofType(constants.USERS_SEARCH)
        .switchMap(
            (action: interfaces.ActionUsersSearch) => {
                return Observable
                    .merge(
                        Observable.of({ type: constants.USERS_SEARCH_PENDING }),
                        api.search(action.text, action.page).map(actions.searchResult),
                )
            }
        );

export const Fetch = (action$: any) =>
    action$.ofType(constants.USERS_FETCH)
        .switchMap(
            (action: interfaces.ActionUsersFetch) => {
                return Observable.merge(
                    Observable.of({ type: constants.USERS_FETCH_PENDING }),
                    api.fetchUser(action.username).map(actions.fetchResult),
                )
            }
        );

export const Pagination = (action$: any, store: any) =>
    action$.ofType(constants.USERS_SEARCH_FULFILLED)
        .mergeMap(
            (action: interfaces.ActionUsersSearchSuccess) => {
                return Observable
                    .merge(
                        Observable.of({ type: constants.USERS_SEARCH_PENDING }),
                        api.search(action.text, action.page + 1).map(actions.searchResult),
                )
                    .skipWhile((input: any) => {
                        let userList = store.getState().users.list;

                        if (action.list.length < 5) {
                            return true;
                        }

                        return userList.length % 10 === 0;
                    })
            }
        );