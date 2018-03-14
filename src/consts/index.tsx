export const AUTH_LOGIN    = 'AUTH_LOGIN';
export type AUTH_LOGIN     = typeof AUTH_LOGIN;
export const AUTH_LOGOUT   = 'AUTH_LOGOUT';
export type AUTH_LOGOUT    = typeof AUTH_LOGOUT;
export type AUTH           = AUTH_LOGOUT | AUTH_LOGIN;

export const USERS_SEARCH                           = 'USERS_SEARCH';
export const USERS_SEARCH_FULFILLED                 = 'USERS_SEARCH_FULFILLED';
export const USERS_SEARCH_REJECTED                  = 'USERS_SEARCH_REJECTED';
export const USERS_SEARCH_RESULT_CLEAR              = 'USERS_SEARCH_RESULT_CLEAR';
export const USERS_FETCH                            = 'USERS_FETCH';
export const USERS_FETCH_FULFILLED                  = 'USERS_FETCH_FULFILLED';
export const USERS_FETCH_REJECTED                   = 'USERS_FETCH_REJECTED';
export const USER_FETCH                             = 'USER_FETCH';
export const USER_FETCH_FULFILLED                   = 'USER_FETCH_FULFILLED';
export const USER_REPOSITORIES_FETCH                = 'USER_REPOSITORIES_FETCH';
export const USER_REPOSITORIES_FETCH_FULFILLED      = 'USER_REPOSITORIES_FETCH_FULFILLED';
export type USERS_SEARCH                            = typeof USERS_SEARCH;
export type USERS_SEARCH_RESULT_CLEAR               = typeof USERS_SEARCH_RESULT_CLEAR;
export type USERS_FETCH                             = typeof USERS_FETCH;
export type USERS_SEARCH_FULFILLED                  = typeof USERS_SEARCH_FULFILLED;
export type USER_FETCH                              = typeof USER_FETCH;
export type USER_REPOSITORIES_FETCH                 = typeof USER_REPOSITORIES_FETCH;

export const CONNECTION_STATUS_STABLE  = 'CONNECTION_STATUS_STABLE';
export const CONNECTION_STATUS_CHANGED = 'CONNECTION_STATUS_CHANGED';