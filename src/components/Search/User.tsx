import * as React from 'react';
import { Link } from 'react-router-dom';
import * as interfaces from 'interfaces';

interface Props {
    user: interfaces.GithubUser;
}

export default function UserList(props: Props) {
    return (
        <li key={props.user.id} className="list-group-item">
            <img src={props.user.avatar_url} className="img img-circle" width="24" height="24" />
            <Link to={'/user/' + props.user.login} className="name">{props.user.login}</Link>
            <span className="label label-default pull-right">Score: {props.user.score}</span>
        </li>
    )
}