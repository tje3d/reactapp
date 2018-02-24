import * as React from 'react';

import { GithubUser } from 'interfaces';

interface Props {
    users: Array<GithubUser>;
    total: number;
}

export default class UserList extends React.Component<Props, any> {
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
                            <a href={user.html_url} target="_blank" className="name">{user.login}</a>
                            <span className="label label-default pull-right">Score: {user.score}</span>
                        </li>
                    )}
                </ul>
            </div>
        );

        return output;
    }
}