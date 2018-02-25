import axios from 'axios';

import {
    Middleware,
    Dispatch,
    MiddlewareAPI,
} from 'redux';

import * as actions from 'actions/search';

import {
    GithubSearchResponse,
} from 'interfaces';
import * as constants from 'consts';

const searchMiddleware: Middleware = (store: MiddlewareAPI<void> ) => (next: Dispatch <void>) => (action: any) => {
    switch (action.type) {
        case constants.SEARCH_SEARCH:
            axios({
                method       : 'get',
                url          : 'https://api.github.com/search/users?q=' + action.text,
                responseType : 'json',
                timeout      : 10000,
            })
            .then(response => {
                var data: GithubSearchResponse = response.data;
                store.dispatch(actions.setresult(data.items, data.total_count));
            })
            .catch(() => {
                store.dispatch(actions.setresult([], 0));
                alert('connection failed');
            });
            break;
    }

    return next(action);
}

export default searchMiddleware;