import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'interfaces';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './style.css';

import Login from 'components/Login';
import Search from 'components/Search';
import User from 'components/User';

interface Props {
    isLogin: boolean;
}

interface States {}

class App extends React.Component<Props, States> {
    render() {
        return (
            <Router>
                <div id="router">
                    <Route exact path="/" component={Login} />
                    <Route path="/search" component={Search} />
                    <Route path="/user/:username" component={User} />
                </div>
            </Router>
        );
    }
}

export default connect((states: ApplicationState)=>{
    return {
        isLogin: states.auth.isLogin,
    };
}, ()=>{
    return {

    };
})(App);