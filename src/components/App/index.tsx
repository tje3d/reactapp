import * as React from 'react';
import { connect } from 'react-redux';
import { StateAuth, User } from 'interfaces';

import './style.css';

import Login from 'components/Login';
import Search from 'components/Search';

interface Props {
    user: User | boolean;
}

interface States {

}

class App extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      !this.props.user ? <Login /> : <Search />
    );
  }
}

export default connect((states: StateAuth)=>{
    return {
        user: states.user,
    };
}, ()=>{
  return {

  };
})(App);