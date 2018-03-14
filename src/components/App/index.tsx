import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'interfaces';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import Connection$ from 'observables/connection';
import WebSocketManager from 'WebSocketManager';

import './style.css';

import Auth from 'components/Auth';
import Search from 'components/Search';
import User from 'components/User';
import GoToLogin from 'components/GoToLogin';
import Repositores from 'components/Repositories';

interface Props {
    isLogin: boolean;
}

interface States { }

class App extends React.Component<Props, States> {
    componentDidMount() {
        Connection$.subscribe(input => {
            console.log(input);
        });
    }

    render() {
        return (
            <Router>
                <div id="router">
                    <Route exact path="/" component={!this.props.isLogin ? Auth : () => <Redirect to="/search" />} />
                    <Route exact path="/search" component={this.props.isLogin ? Search : GoToLogin} />
                    <Route exact path="/user/:username/repos" component={this.props.isLogin ? Repositores : GoToLogin} />
                    <Route exact path="/user/:username" component={this.props.isLogin ? User : GoToLogin} />
                </div>
            </Router>
        );
    }
}

export default connect((states: ApplicationState) => {
    return {
        isLogin: states.auth.isLogin,
    };
}, () => {
    return {

    };
})(App);