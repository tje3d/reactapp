import {
    Middleware,
    Dispatch,
    MiddlewareAPI
} from 'redux';

const loggerMiddleware: Middleware = ({
    getState
}: MiddlewareAPI < void > ) => (next: Dispatch < Function > ) => (action: any) => {
    console.log('will dispatch', action);

    const returnValue = next(action);
    console.log('state after dispatch', getState());

    return returnValue;
}

export default loggerMiddleware;