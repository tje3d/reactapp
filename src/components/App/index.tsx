import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'interfaces';

import './style.css';

import Login from 'components/Login';
import Search from 'components/Search';

interface Props {
    isLogin: boolean;
}

interface States {}

class App extends React.Component<Props, States> {
    render() {
        return (
            !this.props.isLogin ? <Login /> : <Search />
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