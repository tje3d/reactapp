import axios from 'axios';

import {
    Middleware,
    Dispatch,
    MiddlewareAPI,
} from 'redux';

import * as actions from 'actions/users';

import {
    GithubSearchResponse,
    GithubUserFull,
} from 'interfaces';
import * as constants from 'consts';

const searchMiddleware: Middleware = (store: MiddlewareAPI<any>) => (next: Dispatch <void>) => (action: any) => {
    switch (action.type) {
        case constants.USERS_SEARCH:
            axios({
                method       : 'get',
                url          : 'https://api.github.com/search/users?q=' + action.text,
                responseType : 'json',
                timeout      : 10000,
            })
            .then(response => {
                var data: GithubSearchResponse = response.data;
                store.dispatch(actions.searchResult(data.items, data.total_count));
            })
            .catch(() => {
                store.dispatch(actions.searchResultClear());
                alert('connection failed');
            });
            break;
        case constants.USERS_FETCH:
            axios({
                method       : 'get',
                url          : 'https://api.github.com/users/' + action.username,
                responseType : 'json',
                timeout      : 10000,
            })
            .then(response => {
                var data: GithubUserFull = response.data;
                store.dispatch(actions.fetchUserResult(data));
            })
            .catch(() => {
                store.dispatch(actions.searchResultClear());
                alert('connection failed');
            });
            break;
    }

    return next(action);
}

export default searchMiddleware;