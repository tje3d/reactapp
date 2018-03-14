import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import { ApplicationState, GithubUserFull } from 'interfaces';
import { History } from "history";
import { match } from 'react-router';
import * as actions from 'actions/users';

import Loading from './loading';
import Notfound from './notfound';
import Panel from './panel';

export interface Props {
    history: History;
    match: match<Params>;
    fetchUserInformations(username: string): void;
    info: GithubUserFull;
    loading: boolean;
}

interface Params {
    username: string;
}

class User extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);

        if (!props.info.login || props.info.login != props.match.params.username) {
            props.fetchUserInformations(props.match.params.username);
        }
    }

    render() {
        if (this.props.loading) {
            return <Loading />
        }

        if (!this.props.info) {
            return <Notfound />
        }

        return <Panel info={this.props.info} />;
    }
};

let connected = connect((state: ApplicationState) => {
    return {
        info: state.user.user ? state.user.user : {},
        loading: state.user.user ? false : state.user.loading,
    };
}, (dispatch: Dispatch<Action>) => {
    return {
        fetchUserInformations: (username: string) => { dispatch(actions.fetchUser(username)) }
    }
});

export default connected(User);