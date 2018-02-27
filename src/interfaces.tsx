import * as constants from 'consts';
import { Action } from 'redux';

export interface User {
    username: string;
    token?: string;
}

export interface ApplicationState {
    auth: AuthState;
    users: StateUsers;
}

export interface AuthState {
    isLogin: boolean;
    user?: User;
}

export interface StateUsers {
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

export interface ActionLogin extends Action {
    type: constants.AUTH_LOGIN;
    form: AuthForm
}

export interface ActionLogout extends Action {
    type: constants.AUTH_LOGOUT;
}

export interface ActionUsersSearch extends Action {
    type: constants.USERS_SEARCH;
    text: string;
}

export interface ActionUsersSearchResultClear extends Action {
    type: constants.USERS_SEARCH_RESULT_CLEAR;
}

export interface ActionUsersFetch extends Action {
    type: constants.USERS_FETCH;
    username: string;
}

export interface GithubSearchResponse {
    items: Array<GithubUser>;
    total_count: number;
}

export interface GithubUser {
    id: number;
    avatar_url: string;
    html_url: string;
    login: string;
    token: string;
    score: number;
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
export type ActionUsers = ActionUsersSearch | ActionUsersSearchResultClear | ActionUsersFetch;