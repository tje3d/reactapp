import * as React from 'react';
import { Link } from 'react-router-dom';

import { connect, Dispatch } from 'react-redux';
import { GithubUser, ApplicationState } from 'interfaces';

interface Props {
    users: Array<GithubUser>;
    total: number;
}

class UserList extends React.Component<Props, any> {
    render() {
        if (this.props.users.length === 0) {
            return null;
        }

        let output: Array<JSX.Element> = [];

        output.push(
            <div className="form-group" key="1">
                <span className="label label-default">Total result: {this.props.total}</span>
            </div>
        );

        output.push(
            <div className="form-group" key="2">
                <ul className="list-group">
                    {this.props.users.map((user: any) => 
                        <li key={user.id} className="list-group-item">
                            <img src={user.avatar_url} className="img img-circle" width="24" height="24" />
                            <Link to={'user/' + user.login} className="name">{user.login}</Link>
                            <span className="label label-default pull-right">Score: {user.score}</span>
                        </li>
                    )}
                </ul>
            </div>
        );

        return output;
    }
}

export default connect((state: ApplicationState)=>{
    return {
        users: state.search.list,
        total: state.search.total,
    };
}, (dispatch: Dispatch<void>)=>{
    return {};
})(UserList);