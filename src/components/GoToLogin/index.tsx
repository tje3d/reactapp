import * as React from 'react';
import { Redirect } from 'react-router-dom';

export default class GoToLogin extends React.Component<{}, {}> {
    render() {
        return (
            <Redirect to="/" />
        )
    }
}