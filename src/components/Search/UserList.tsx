import * as React from 'react';
import * as interfaces from 'interfaces';
import User from './User';

interface Props {
    users: Array<interfaces.GithubUser>;
    total: number;
}

export default function UserList(props: Props) {
    if (props.users.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="form-group" key="1">
                <span className="label label-success">Total result: {props.total}</span>
                &nbsp;
                <span className="label label-info">Users length: {props.users.length}</span>
            </div>
            <div className="form-group" key="2">
                <ul className="list-group">
                    {props.users.map((user: interfaces.GithubUser) => <User user={user} key={user.id} />)}
                </ul>
            </div>
        </div>
    );
}