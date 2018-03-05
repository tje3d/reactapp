import * as React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export default function User(props: any) {
    return (
        <div className="user">
            <div className="container text-center">
                <img src={props.info.avatar_url} className="image" />
                <hr />
                <div className="col-lg-6 col-lg-offset-3">
                    <ul className="list-group text-left">
                        {Object.keys(props.info).map(key=>{
                            return <li className="list-group-item" key={key}>{key}: {props.info[key]}</li>
                        })}
                    </ul>
                    <hr />
                    <p>
                        <Link to="/search" className="btn btn-primary"><i className="fa fa-arrow-left"></i> Back</Link>
                    </p>
                    <br/>
                </div>
            </div>
        </div>
    );
}