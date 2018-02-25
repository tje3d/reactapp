import * as constants from 'consts';
import { ActionSearch, GithubUser, ActionSearchSetResult } from 'interfaces';

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