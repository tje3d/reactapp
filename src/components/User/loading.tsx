import * as React from 'react';

export default function loading(props: any) {
    return (
        <div className="user">
            <div className="container text-center">
                <i className="fa fa-refresh fa-spin loading"></i>
            </div>
        </div>
    )
}