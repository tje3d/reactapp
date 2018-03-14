import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './auth';
import users from './users';
import user from './user';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import * as EpicUsers from 'epics/users';
import * as EpicUser from 'epics/user';
import 'rxjs';

let reducers = combineReducers({
    auth,
    users,
    user
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
                    EpicUser.Fetch,
                    EpicUser.FetchRepos,
                )
            ),
        )
    );

    let persistor = persistStore(store);
    return { store, persistor };
};