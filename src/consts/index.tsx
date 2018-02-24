export const AUTH_LOGIN = 'AUTH_LOGIN';
export type AUTH_LOGIN = typeof AUTH_LOGIN;

export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export type AUTH_LOGOUT = typeof AUTH_LOGOUT;

export type AUTH = AUTH_LOGOUT | AUTH_LOGIN;