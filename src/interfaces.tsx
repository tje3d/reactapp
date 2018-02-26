import * as constants from 'consts';

export interface User {
    username: string;
    token?: string;
}

export interface ApplicationState {
    auth: AuthState;
    search: SearchState;
}

export interface AuthState {
    isLogin: boolean;
    user?: User;
}

export interface SearchState {
    loading: boolean;
    list: Array<GithubUser>;
    total: number;
    user: GithubUserFull | null
}

export interface AuthForm {
    username: string;
    password: string;
}

export interface AuthFormErrors {
    username?: string;
    password?: string;
}

// Actions

export interface ActionLogin {
    type: constants.AUTH_LOGIN;
    form: AuthForm
}

export interface ActionLogout {
    type: constants.AUTH_LOGOUT;
}

export interface ActionSearch {
    type: constants.SEARCH_SEARCH;
    text: string;
}

export interface ActionSearchSetResult {
    type: constants.SEARCH_SETRESULT;
    result: Array<GithubUser>;
    total: number
}

export interface ActionSearchFetchUserInformation {
    type: constants.SEARCH_FETCHUSERINFO;
    username: string;
}

export interface ActionSearchSetFetchUserInformation {
    type: constants.SEARCH_SETFETCHUSERINFO;
    info: GithubUserFull | null;
}

export interface GithubSearchResponse {
    items: Array<any>;
    total_count: number;
}

export interface GithubUser {
    id: number;
    avatar_url: string;
    html_url: string;
    login: string;
    token: string;
}

export interface GithubUserFull {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id?: number;
    url: string;
    html_url: string;
    name: string;
    location: string;
    bio: string;
}

// Types
export type AuthActions = ActionLogin | ActionLogout;
export type SearchActions = ActionSearch | ActionSearchSetResult | ActionSearchFetchUserInformation | ActionSearchSetFetchUserInformation;