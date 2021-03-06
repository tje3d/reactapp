import * as constants from 'consts';
import * as interfaces from 'interfaces';

export const Search = (text: string, page: number) => ({
    type: constants.USERS_SEARCH,
    page,
    text
});

export function searchResult(action: interfaces.ActionUsersSearchSuccess): interfaces.ActionUsersSearchResultClear | interfaces.ActionUsersSearchSuccess {
    console.log("SEARCH RESULT", action);

    if (action.total == 0) {
        return searchResultClear();
    }

    return searchSuccess(action);
}

export function searchSuccess({ total, list, text, page }: interfaces.ActionUsersSearchSuccess): interfaces.ActionUsersSearchSuccess {
    return {
        type: constants.USERS_SEARCH_FULFILLED,
        total,
        list,
        page,
        text
    }
}

export function searchResultClear(): interfaces.ActionUsersSearchResultClear {
    return {
        type: constants.USERS_SEARCH_RESULT_CLEAR
    }
}

export const fetchUser = (username: string) => ({
    type: constants.USER_FETCH,
    username
});

export function fetchResult(user: interfaces.GithubUserFull): any {
    return {
        type: constants.USER_FETCH_FULFILLED,
        user
    }
}

export const fetchRepos = (username: string) => ({
    type: constants.USER_REPOSITORIES_FETCH,
    username
});

export function fetchReposResult(repos: Array<interfaces.GithubRepository>): any {
    return {
        type: constants.USER_REPOSITORIES_FETCH_FULFILLED,
        repos
    }
}