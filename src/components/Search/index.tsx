import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AuthState, GithubUser } from 'interfaces';
import { ApplicationState, ActionSearch } from 'interfaces';
import * as actions from 'actions/search';
import * as actionsAuth from 'actions/auth';

import './style.css';

var attention = require('img/attention.svg');

import UserList from './UserList';

interface Props {
    auth: AuthState;
    users: Array<GithubUser>;
    total: number;
    loading: boolean;
    onLogout(): void;
    doSearch(text: string): void;
}

class Search extends React.Component<Props, {}> {
    searchInputTimeout: any = null;
    searchTimeout: number = 300;

    constructor(props: Props) {
        super(props);

        this.searchOnInput = this.searchOnInput.bind(this);
    }

    searchOnInput(e: React.ChangeEvent<HTMLInputElement>) {
        var element = e.currentTarget;

        if (this.searchInputTimeout !== null) {
            clearTimeout(this.searchInputTimeout);
            this.searchInputTimeout = null;
        }

        this.searchInputTimeout = setTimeout(
            () => {
                if (element.value !== '') {
                    this.search(element.value);
                    return;
                }
            },
            this.searchTimeout
        );
    }

    search(text: string) {
        this.setState({
            loading : true,
        });

        this.props.doSearch(text);
    }

    userField(field: string) {
        if (!this.props.auth.isLogin || !this.props.auth.user) {
            return '';
        }

        return this.props.auth.user[field];
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
                                <a href="#" className="pull-right" onClick={this.props.onLogout}>
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
        auth: state.auth,
        users: state.search.list,
        total: state.search.total,
        loading: state.search.loading,
    };
}, (dispatch: Dispatch<void>)=>{
    return {
        onLogout: ()=>{ actionsAuth.authLogout(dispatch); },
        doSearch: (text: string)=>{ dispatch<ActionSearch>(actions.search(text)); }
    };
})(Search);