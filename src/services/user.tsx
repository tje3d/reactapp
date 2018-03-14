import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import * as interfaces from 'interfaces';

export function fetchUser(username: string) {
    return new Observable(observer => {
        axios({
            method: 'get',
            url: 'https://api.github.com/users/' + username,
            responseType: 'json',
            timeout: 10000,
        }).then(response => {
            var data: interfaces.GithubUserFull = response.data;
            observer.next(data);
            observer.complete();
        }).catch(() => {
            alert('connection failed');
            observer.complete();
        });
    });
}

export function fetchRepos(username: string) {
    return new Observable(observer => {
        axios({
            method: 'get',
            url: 'https://api.github.com/users/' + username + '/repos',
            responseType: 'json',
            timeout: 10000,
        }).then(response => {
            var data: Array<interfaces.GithubRepository> = response.data;
            observer.next(data);
            observer.complete();
        }).catch(() => {
            alert('connection failed');
            observer.complete();
        });
    });
}