import * as constants from 'consts';
import * as actions from 'actions/users';
import * as interfaces from 'interfaces';
import * as api from 'services/user';
import { Observable } from 'rxjs/Observable';
import * as operators from 'rxjs/operators';

export const Fetch = (action$: any) =>
    action$.ofType(constants.USER_FETCH)
        .switchMap((action: any) => api.fetchUser(action.username))
        .map(actions.fetchResult)

export const FetchRepos = (action$: any) =>
    action$.ofType(constants.USER_REPOSITORIES_FETCH)
        .switchMap((action: any) => api.fetchRepos(action.username))
        .map(actions.fetchReposResult)