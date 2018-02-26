import * as constants from 'consts';
import { ActionSearch, GithubUser, GithubUserFull, ActionSearchSetResult, ActionSearchFetchUserInformation, ActionSearchSetFetchUserInformation } from 'interfaces';

export function search(text: string): ActionSearch {
    return {
        type: constants.SEARCH_SEARCH,
        text
    }
}

export function setresult(result: Array<GithubUser>, total: number): ActionSearchSetResult {
    return {
        type: constants.SEARCH_SETRESULT,
        result,
        total
    }
}

export function fetchUserInformation(username: string): ActionSearchFetchUserInformation {
    return {
        type: constants.SEARCH_FETCHUSERINFO,
        username
    }
}

export function setFetchUserInformation(info: GithubUserFull | null): ActionSearchSetFetchUserInformation {
    return {
        type: constants.SEARCH_SETFETCHUSERINFO,
        info
    }
}