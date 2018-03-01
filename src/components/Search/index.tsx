import * as React                 from 'react';
import { Action }                 from 'redux';
import { connect, Dispatch }      from 'react-redux';
import { AuthState, GithubUser }  from 'interfaces';
import { ApplicationState }       from 'interfaces';
import * as actions               from 'actions/users';
import * as actionsAuth           from 'actions/auth';
import { History }                from "history";
import UserList                   from './UserList';
import * as constants             from 'consts';

import './style.css';

var attention = require('img/attention.svg');

interface Props {
    auth                    : AuthState;
    users                   : Array<GithubUser>;
    total                   : number;
    loading                 : boolean;
    history                 : History;
    onLogout()              : void;
    doLogout()              : void;
    doSearch(text: string)  : void;
    clearResult()           : void;
}

interface States {}

class Search extends React.Component<Props, States> {
    searchInputTimeout : NodeJS.Timer | null = null;
    searchTimeout      : number              = 300;

    constructor(props: Props) {
        super(props);

        this.searchOnInput = this.searchOnInput.bind(this);
        this.doLogout      = this.doLogout.bind(this);
    }

    searchOnInput(e: React.ChangeEvent<HTMLInputElement>) {
        var element = e.currentTarget;

        if (this.searchInputTimeout !== null) {
            clearTimeout(this.searchInputTimeout);
            this.searchInputTimeout = null;
        }

        this.searchInputTimeout = setTimeout(
            () => this.search(element.value),
            this.searchTimeout
        );
    }

    search(text: string) {
        if (this.props.loading) {
            return;
        }

        if (text == '') {
            this.props.clearResult();
            return;
        }

        this.props.doSearch(text);
    }

    userField(field: string) {
        if (!this.props.auth.isLogin || !this.props.auth.user) {
            return '';
        }

        return this.props.auth.user[field];
    }

    doLogout(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        this.props.history.replace("/");
        this.props.onLogout();
    }

    render() {
        let EmptyUsers: JSX.Element | null = null;
        if (this.props.users.length === 0) {
            EmptyUsers = (
                <div className="text-center">
                    <img src={attention} width="80" />
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="search">
                            <h4>
                                Welcome Back {this.userField('username')}!
                                <small className="text-muted"> token: {this.userField('token')}</small>
                                <a href="#" className="pull-right" onClick={this.doLogout}>
                                    <i className="fa fa-power-off" />
                                </a>
                            </h4>
                            <hr/>
                            <div className="form-group search-field-container">
                                <input
                                    className="form-control"
                                    placeholder="Search..."
                                    onChange={this.searchOnInput}
                                    autoFocus={true}
                                />
                                {this.props.loading ? (<i className="loading fa fa-refresh fa-spin" />) : null}
                            </div>
                            {EmptyUsers}
                            <UserList />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state: ApplicationState)=>{
    return {
        auth    : state.auth,
        users   : state.users.list,
        total   : state.users.total,
        loading : state.users.loading,
    };
}, (dispatch: Dispatch<Action>)=>{
    return {
        onLogout    : ()             => { dispatch(actionsAuth.authLogout()); },
        doSearch    : (text: string) => { dispatch({type: constants.USERS_SEARCH, text});  },
        clearResult : ()             => { dispatch(actions.searchResultClear()); },
    };
})(Search);