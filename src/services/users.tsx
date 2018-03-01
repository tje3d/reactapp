import { Observable }  from 'rxjs/Observable';
import axios           from 'axios';
import * as interfaces from 'interfaces';

export function search(text: string) {
    return new Observable(observer => {
        axios({
            method       : 'get',
            url          : 'https://api.github.com/search/users?q=' + text,
            responseType : 'json',
            timeout      : 10000,
        })
        .then(response => {
            var data: interfaces.GithubSearchResponse = response.data;
            observer.next({
                list: data.items,
                total: data.total_count,
            });
            observer.complete();
        })
        .catch(() => {
            alert("Connection Failed");
            observer.next({
                list: [],
                total: 0,
            });
            observer.complete();
        });
    });
}

export function fetchUser(text: string) {
    return new Observable(observer => {
        axios({
            method       : 'get',
            url          : 'https://api.github.com/users/' + text,
            responseType : 'json',
            timeout      : 10000,
        })
        .then(response => {
            var data: interfaces.GithubUserFull = response.data;
            observer.next(data);
        })
        .catch(() => {
            alert('connection failed');
        });
    });
}