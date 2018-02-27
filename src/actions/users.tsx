import * as constants from 'consts';
import * as interfaces from 'interfaces';
export function search(text: string): interfaces.ActionUsersSearch {
    return {
        type: constants.USERS_SEARCH,
        text
    }
}
export function searchResult(result: Array < interfaces.GithubUser > , total: number): interfaces.ActionUsersSearchResult {
    return {
        type: constants.USERS_SEARCH_RESULT,
        result,
        total
    }
}
export function searchResultClear(): interfaces.ActionUsersSearchResultClear {
    return {
        type: constants.USERS_SEARCH_RESULT_CLEAR
    }
}
export function fetchUser(username: string): interfaces.ActionUsersFetch {
    return {
        type: constants.USERS_FETCH,
        username
    }
}
export function fetchUserResult(info: interfaces.GithubUserFull | null): interfaces.ActionUsersFetchResult {
    return {
        type: constants.USERS_FETCH_RESULT,
        info
    }
}