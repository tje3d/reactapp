import * as constants from 'consts';
import * as actions from 'actions/users';
import * as interfaces from 'interfaces';
import * as api from 'services/users';
import { Observable } from 'rxjs/Observable';
import * as operators from 'rxjs/operators';

export const Search = (action$, state) =>
    action$.ofType(constants.USERS_SEARCH)
        .mergeMap(
            ({text, page}: interfaces.ActionUsersSearch) => {
                let obs: any = [];
                obs.push(api.search({text, page: page}));
                obs.push(api.search({text, page: page + 1}));

                return Observable.forkJoin(obs)
                    .switchMap(action => Observable.from(action))
            }
        )
        .map(actions.searchResult)

export const Fetch = (action$: any) =>
    action$.ofType(constants.USERS_FETCH)
        .switchMap((action: any) => api.fetchUser(action.username).map(actions.fetchResult))