import * as React from 'react';
import { Link } from 'react-router-dom';
import Loading from './loading';
import { connect } from 'react-redux';
import * as interfaces from 'interfaces';
import { match } from 'react-router';
import * as actions from "actions/users";

import "./style.css";

interface Props {
    loading: boolean;
    history: History;
    match: match<Params>;
    repos: Array<interfaces.GithubRepository>;
    user: interfaces.GithubUserFull;
}

interface Params {
    username: string;
}

class Repositories extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);

        props.fetchUserRepositories(props.match.params.username);
    }

    render() {
        if (this.props.loading) {
            return <Loading />
        }

        return (
            <div className="container repositories">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <ul className="list-group">
                            {this.props.repos.map((repo)=>{
                                return (
                                    <li key={repo.name} className="list-group-item">
                                        <a href={repo.html_url} target="_blank">
                                            {repo.name}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <Link to={"/user/" + this.props.match.params.username} className="btn btn-primary btn-block"><i className="fa fa-arrow-left"></i> Back</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(
    (state: interfaces.ApplicationState) => ({
        loading: state.user.repos.length != 0 ? false : state.user.loading,
        repos: state.user.repos,
        user: state.user.user,
    }),
    (dispatch: any) => ({
        fetchUserRepositories(username: string) {
            dispatch(actions.fetchRepos(username));
        }
    }),
)(Repositories);