import { Observable } from 'rxjs/Observable';
import axios from 'axios';
import * as interfaces from 'interfaces';

export function search(input: any) {
    console.log("API SEARCH: ", input);
    
    let text = input.text;
    let page = input.page;
    return new Observable(observer => {
        axios({
            method: 'get',
            url: `https://api.github.com/search/users?q=${text}&page=${page}&per_page=5`,
            responseType: 'json',
            timeout: 10000,
        }).then(response => {
            var data: interfaces.GithubSearchResponse = response.data;

            observer.next({
                list: data.items,
                total: data.total_count,
                page,
                text
            });
            observer.complete();
        }).catch(() => {
            alert("Connection Failed");
            observer.next({
                list: [],
                total: 0,
                page: 0,
                text: '',
            });
            observer.complete();
        });
    });
}