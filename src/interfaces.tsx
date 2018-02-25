import * as constants from 'consts';

export interface User {
    username: string;
    token?: string;
}

export interface ApplicationState {
    user: User | boolean
};

export interface AuthForm {
    username: string;
    password: string;
}

export interface AuthFormErrors {
    username?: string;
    password?: string;
}

export interface ActionLogin {
    type: constants.AUTH_LOGIN;
    form: AuthForm
}

export interface ActionLogout {
    type: constants.AUTH_LOGOUT;
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

// Types
export type ActionsTypes = ActionLogin | ActionLogout;