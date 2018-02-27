export const AUTH_LOGIN    = 'AUTH_LOGIN';
export type AUTH_LOGIN     = typeof AUTH_LOGIN;
export const AUTH_LOGOUT   = 'AUTH_LOGOUT';
export type AUTH_LOGOUT    = typeof AUTH_LOGOUT;
export type AUTH           = AUTH_LOGOUT | AUTH_LOGIN;

export const USERS_SEARCH                = 'USERS_SEARCH';
export const USERS_SEARCH_PENDING        = 'USERS_SEARCH_PENDING';
export const USERS_SEARCH_FULFILLED      = 'USERS_SEARCH_FULFILLED';
export const USERS_SEARCH_REJECTED       = 'USERS_SEARCH_REJECTED';
export const USERS_SEARCH_RESULT_CLEAR   = 'USERS_SEARCH_RESULT_CLEAR';
export const USERS_FETCH                 = 'USERS_FETCH';
export const USERS_FETCH_PENDING         = 'USERS_FETCH_PENDING';
export const USERS_FETCH_FULFILLED       = 'USERS_FETCH_FULFILLED';
export const USERS_FETCH_REJECTED        = 'USERS_FETCH_REJECTED';
export type USERS_SEARCH                 = typeof USERS_SEARCH;
export type USERS_SEARCH_RESULT_CLEAR    = typeof USERS_SEARCH_RESULT_CLEAR;
export type USERS_FETCH                  = typeof USERS_FETCH;