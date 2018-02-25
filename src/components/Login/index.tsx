import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState, AuthForm, AuthFormErrors } from 'interfaces';
import * as actions from 'actions/auth';

import './style.css';

export interface Props {
    isLogin: boolean;
    onLogin(form: AuthForm): Promise<Function>;
}

export interface States {
    loading: boolean;
    errors: AuthFormErrors;
    form: AuthForm;
}

class Login extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loading : false,
            errors  : {},
            form    : {
                username: '',
                password: '',
            },
        };

        this.submit = this.submit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    submit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        this.setState({
            errors  : {},
            loading : true
        });

        this.props.onLogin(this.state.form)
            .catch((errors: AuthFormErrors) => {
                this.setState({
                    errors,
                    loading: false
                });
            })
            .then(()=>{
                this.setState({
                    loading: false
                });
            });
    }

    handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
        let target  = event.currentTarget;
        let name    = target.getAttribute('name');
        let val     = target.value;

        if (!name) {
            return;
        }

        this.setState({
            form: {
                ...this.state.form,
                [name]: val
            },
        });
    }

    _renderErrorBlock(name: string): JSX.Element|null {
        if (!this.state.errors[name]) {
            return null;
        }

        return <div className="help-block">{this.state.errors[name]}</div>;
    }

    _renderSubmitButton(): JSX.Element {
        if (this.state.loading) {
            return (
                <button type="button" className="btn btn-primary btn-block" disabled={this.state.loading}>
                <i className="fa fa-refresh fa-spin" />
                </button>
            );
        }

        return (
            <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={!this.state.form.username || !this.state.form.password}
            >
                Login
            </button>
        );
    }

    render() {
        return (
          <div className="login">
                <div className="login-container">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading text-center">
                            Login Panel
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.submit}>
                                <div className={'form-group ' + (this.state.errors.username ? 'has-error' : '')}>
                                    <label className="control-label">Username:</label>
                                    <input
                                        className="form-control"
                                        name="username"
                                        onChange={this.handleInput}
                                        autoFocus={true}
                                    />
                                    {this._renderErrorBlock('username')}
                                </div>
                                <div className={'form-group ' + (this.state.errors.password ? 'has-error' : '')}>
                                    <label className="control-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        onChange={this.handleInput}
                                    />
                                    {this._renderErrorBlock('password')}
                                </div>
                                <div className="form-group m-b-0">
                                    {this._renderSubmitButton()}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let connected = connect((state: ApplicationState) =>{
    return {
        isLogin: false
    };
}, (dispatch: Dispatch<Function>)=>{
    return {
        onLogin: (form: AuthForm) => {
            return actions.authLogin(dispatch, form);
        }
    }
});

export default connected(Login);