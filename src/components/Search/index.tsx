import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { User, GithubUser, GithubSearchResponse } from 'interfaces';
import { StateAuth } from 'interfaces';
import * as actions from 'actions/search';
import * as actionsAuth from 'actions/auth';

import './style.css';

var attention = require('img/attention.svg');

import UserList from './UserList';

interface Props {
    user: User | boolean;
    onLogout(): void;
}

interface States {
    loading: boolean;
    users: Array<GithubUser>;
    total: number;
}

class Search extends React.Component<Props, States> {
    searchInputTimeout: any = null;
    searchTimeout: number = 300;

    constructor(props: Props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
            total: 0
        };

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

                this.setState({
                    users : [],
                    total : 0,
                });
            },
            this.searchTimeout
        );
    }

    search(text: string) {
        this.setState({
            loading : true,
        });

        actions.search(text)
            .then(response => {
                var data: GithubSearchResponse = response.data;

                this.setState({
                    users   : data.items,
                    total   : data.total_count,
                    loading : false,
                });
            }).catch(() => {
                alert('connection failed');

                this.setState({
                    loading : false,
                });
            });
    }

    userField(field: string) {
        if (typeof(this.props.user) == 'boolean') {
            return '';
        }

        return this.props.user[field];
    }

    render() {
        let EmptyUsers: JSX.Element | null = null;
        if (this.state.users.length === 0) {
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
                                {this.state.loading ? (<i className="loading fa fa-refresh fa-spin" />) : null}
                            </div>
                            {EmptyUsers}
                            <UserList users={this.state.users} total={this.state.total} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state: StateAuth)=>{
    return {
        user: state.user === false ? [] : state.user,
    };
}, (dispatch: Dispatch<Function>)=>{
    return {
        onLogout: ()=>{
            actionsAuth.authLogout(dispatch);
        }
    };
})(Search);