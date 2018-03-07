import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './auth';
import users from './users';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import * as EpicUsers from 'epics/users';
import 'rxjs';

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
            createEpicMiddleware(
                combineEpics(
                    EpicUsers.Search,
                    EpicUsers.Fetch,
                )
            ),
        )
    );

    let persistor = persistStore(store);
    return { store, persistor };
};