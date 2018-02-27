import * as constants   from 'consts';
import * as interfaces  from 'interfaces';
import axios            from 'axios';

export const Search = (text: string) => ({
    type    : constants.USERS_SEARCH,
    payload : new Promise((resolve, reject)=>{

        axios({
            method       : 'get',
            url          : 'https://api.github.com/search/users?q=' + text,
            responseType : 'json',
            timeout      : 10000,
        })
        .then(response => {
            var data: interfaces.GithubSearchResponse = response.data;
            resolve(data);
        })
        .catch(() => {
            alert("Connection Failed");

            reject({
                items: [],
                total_count: 0
            });
        });

    })
});

export function searchResultClear(): interfaces.ActionUsersSearchResultClear {
    return {
        type: constants.USERS_SEARCH_RESULT_CLEAR
    }
}

export const fetchUser = (text: string) => ({
    type    : constants.USERS_FETCH,
    payload : new Promise((resolve, reject)=>{
        
        axios({
            method       : 'get',
            url          : 'https://api.github.com/users/' + text,
            responseType : 'json',
            timeout      : 10000,
        })
        .then(response => {
            var data: interfaces.GithubUserFull = response.data;
            resolve(data);
        })
        .catch(() => {
            alert('connection failed');
            reject();
        });

    })
});