import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import users from './users';
// import LoggerMiddleware from 'middlewares/logger';
import MiddlewareUsers from 'middlewares/users';

let reducers = combineReducers({
    auth,
    users
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
    let store = createStore(
        persistedReducer,
        {
            auth: {
                isLogin: false
            }
        },
        applyMiddleware(
            // LoggerMiddleware,
            MiddlewareUsers
        )
    );

    let persistor = persistStore(store);
    return { store, persistor };
};