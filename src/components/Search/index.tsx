import * as React from 'react';
import { Action } from 'redux';
import {
    connect,
    Dispatch,
} from 'react-redux';
import {
    AuthState,
    GithubUser
} from 'interfaces';
import { ApplicationState } from 'interfaces';
import * as actions from 'actions/users';
import * as actionsAuth from 'actions/auth';
import { History } from "history";
import UserList from './UserList';
import { Observable } from 'rxjs';
// import * as ReactDOM from 'react-dom';

import './style.css';

var attention = require('img/attention.svg');

interface Props {
    auth: AuthState;
    users: Array<GithubUser>;
    total: number;
    loading: boolean;
    history: History;
    onLogout(): void;
    doLogout(): void;
    doSearch(text: string, page: number): void;
    clearResult(): void;
    searchOnInput: any;
    page: number;
}

interface States {
    text: string;
    paged: boolean;
}

class Search extends React.Component<Props, States> {
    inputDebounce: number = 300;

    constructor(props: Props) {
        super(props);

        this.state = {
            text: "",
            paged: this.props.total !== this.props.users.length
        };

        this.doLogout = this.doLogout.bind(this);
    }

    componentWillReceiveProps(props: Props) {
        this.setState({
            paged: props.total !== props.users.length,
        });
    }

    componentDidMount() {
        let input$ = Observable.fromEvent(this.refs.input as HTMLElement, 'input')
            .map((input: any) => input.currentTarget.value)
            .debounceTime(this.inputDebounce)
            .filter((value: any) => value != '')
            .skipWhile((value: any) => {
                return this.props.loading;
            });

        input$.subscribe((text: any) => {
            this.setState({ text });
            this.props.clearResult();
            this.props.doSearch(text, 1);
        });
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
        let Nextpage: JSX.Element | null = null;

        if (this.props.users.length === 0) {
            EmptyUsers = (
                <div className="text-center">
                    <img src={attention} width="80" />
                </div>
            );
        }

        if (this.state.paged) {
            Nextpage = (
                <div className="form-group">
                    <button className="btn btn-primary btn-block" onClick={() => this.props.doSearch(this.state.text, this.props.page + 2)}>
                        Next Page
                    </button>
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
                            <hr />
                            <div className="form-group search-field-container">
                                <input
                                    className="form-control"
                                    placeholder="Search..."
                                    ref="input"
                                    autoFocus={true}
                                />
                                {this.props.loading ? (<i className="loading fa fa-refresh fa-spin" />) : null}
                            </div>
                            {EmptyUsers}
                            <UserList />
                            {Nextpage}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state: ApplicationState) => {
    return {
        auth: state.auth,
        users: state.users.list,
        total: state.users.total,
        loading: state.users.loading,
        page: state.users.page,
    };
}, (dispatch: Dispatch<Action>) => {
    return {
        onLogout: () => { dispatch(actionsAuth.authLogout()); },
        doSearch: (text: string, page: number) => { dispatch(actions.Search(text, page)); },
        clearResult: () => { dispatch(actions.searchResultClear()); },
    };
})(Search);