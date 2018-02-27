import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import { ApplicationState, GithubUserFull } from 'interfaces';
import { History } from "history";
import { match } from 'react-router';
import { Link } from 'react-router-dom';

import * as actions from 'actions/users';

import './style.css';

export interface Props {
    history: History;
    match: match<Params>;
    fetchUserInformations(username: string): void;
    info: GithubUserFull;
    loading: boolean;
}

export interface Params {
    username: string;
}

export interface States {}

class User extends React.Component<Props, States> {
    componentDidMount() {
        this.props.fetchUserInformations(this.props.match.params.username);
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="user">
                    <div className="container text-center">
                        <i className="fa fa-refresh fa-spin loading"></i>
                    </div>
                </div>
            )
        }

        if (!this.props.info) {
            return (
                <div>
                    User not found!
                </div>
            )
        }

        return (
            <div className="user">
                <div className="container text-center">
                    <img src={this.props.info.avatar_url} className="image" />
                    <hr />
                    <div className="col-lg-6 col-lg-offset-3">
                        <ul className="list-group text-left">
                            <li className="list-group-item">ID: {this.props.info.id}</li>
                            <li className="list-group-item">Name: {this.props.info.name}</li>
                            <li className="list-group-item">Username: {this.props.info.login}</li>
                            <li className="list-group-item">Avatar: {this.props.info.avatar_url}</li>
                            <li className="list-group-item">Bio: {this.props.info.bio}</li>
                        </ul>
                        <hr />
                        <Link to="/search" className="btn btn-primary"><i className="fa fa-arrow-left"></i> Back</Link>
                    </div>
                </div>
            </div>
        );
    }
}

let connected = connect((state: ApplicationState) =>{
    return {
        info: state.users.user ? state.users.user : {},
        loading: state.users.loading,
    };
}, (dispatch: Dispatch<Action>)=>{
    return {
        fetchUserInformations: (username: string) => { dispatch(actions.fetchUser(username)) }
    }
});

export default connected(User);