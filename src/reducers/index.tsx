import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import search from './search';
// import LoggerMiddleware from 'middlewares/logger';
import SearchMiddleware from 'middlewares/search';

let reducers = combineReducers({
    auth,
    search
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
            SearchMiddleware
        )
    );

    let persistor = persistStore(store);
    return { store, persistor };
};