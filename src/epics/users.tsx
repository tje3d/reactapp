import * as constants from 'consts';
import * as actions from 'actions/users';
import * as interfaces from 'interfaces';
import * as api from 'services/users';
import { Observable } from 'rxjs/Observable';
import * as operators from 'rxjs/operators';

export const Search = (action$: any) =>
    action$.ofType(constants.USERS_SEARCH)
        .switchMap(
            ({text, page}: interfaces.ActionUsersSearch) => {
                return Observable.concat(
                    api.search({text, page: page}),
                    api.search({text, page: page + 1}),
                    api.search({text, page: page + 2}),
                )
                .filter(({list}) => list.length != 0)
                .merge()
            }
        )
        .map(actions.searchResult)

export const Fetch = (action$: any) =>
    action$.ofType(constants.USERS_FETCH)
        .switchMap((action: any) => api.fetchUser(action.username).map(actions.fetchResult))