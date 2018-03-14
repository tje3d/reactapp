import * as constants from 'consts';
import * as actions from 'actions/users';
import * as interfaces from 'interfaces';
import * as api from 'services/users';
import { Observable } from 'rxjs/Observable';
import * as operators from 'rxjs/operators';

export const Search = (action$, state) =>
    action$.ofType(constants.USERS_SEARCH)
        .switchMap(
            ({ text, page }) =>
                Observable.forkJoin([
                    api.search({ text, page: page }),
                    api.search({ text, page: page + 1 })
                ])
                .switchMap(action => Observable.from(action))
                .map(actions.searchResult)
        )