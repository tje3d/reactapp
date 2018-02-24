import axios, { AxiosPromise } from 'axios';

export function search(text: string): AxiosPromise {
    return axios({
        method       : 'get',
        url          : 'https://api.github.com/search/users?q=' + text,
        responseType : 'json',
        timeout      : 10000,
    });
}