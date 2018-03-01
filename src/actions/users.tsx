import * as constants   from 'consts';
import * as interfaces  from 'interfaces';

export const Search = (text: string) => ({
    type : constants.USERS_SEARCH,
    text
});

export const searchPending = () => ({
    type : constants.USERS_SEARCH_PENDING,
});

export function searchResult({total, list}): any {
    if (total == 0) {
        return searchResultClear();
    }

    return searchSuccess({total, list});
}

export function searchSuccess({total, list}): any {
    return {
        type: constants.USERS_SEARCH_FULFILLED,
        total: total,
        list: list
    }
}

export function searchResultClear(): interfaces.ActionUsersSearchResultClear {
    return {
        type: constants.USERS_SEARCH_RESULT_CLEAR
    }
}

export const fetchUser = (username: string) => ({
    type : constants.USERS_FETCH,
    username
});

export function fetchResult(user: interfaces.GithubUserFull): any {
    return {
        type: constants.USERS_FETCH_FULFILLED,
        user
    }
}