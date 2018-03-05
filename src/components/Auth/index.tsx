import * as React from 'react';
import {
    connect,
    Dispatch
} from 'react-redux';
import { Action } from 'redux';
import {
    ApplicationState,
    AuthForm,
} from 'interfaces';
import * as actions from 'actions/auth';
import { History } from "history";

import Login from 'components/Login';

export interface Props {
    onLogin(form: AuthForm): Promise<Function>;
    history: History;
}

function Auth(props: Props) {
    return (
        <Login onLogin={props.onLogin} />
    )
}

let connected = connect((state: ApplicationState) => {
    return {};
}, (dispatch: Dispatch<Action>) => {
    return {
        onLogin: (form: AuthForm) => { dispatch(actions.authLogin(form)) }
    }
});

export default connected(Auth);