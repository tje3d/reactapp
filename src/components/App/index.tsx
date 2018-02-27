import * as React                                   from 'react';
import { connect }                                  from 'react-redux';
import { ApplicationState }                         from 'interfaces';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './style.css';

import Login      from 'components/Login';
import Search     from 'components/Search';
import User       from 'components/User';
import GoToLogin  from 'components/GoToLogin';

interface Props {
    isLogin: boolean;
}

interface States {}

class App extends React.Component<Props, States> {
    render() {
        return (
            <Router>
                <div id="router">
                    <Route exact path="/" component={!this.props.isLogin ? Login : () => <Redirect to="/search" />} />
                    <Route path="/search" component={this.props.isLogin ? Search : GoToLogin} />
                    <Route path="/user/:username" component={this.props.isLogin ? User : GoToLogin} />
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