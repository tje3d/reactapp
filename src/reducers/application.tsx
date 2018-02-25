import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as constants from 'consts';
import { ApplicationState, ActionsTypes } from 'interfaces';

export function Reducer(state: ApplicationState, action: ActionsTypes): ApplicationState {
    switch (action.type) {
        case constants.AUTH_LOGIN:
            return { ...state, user: {
                username: action.form.username,
                token: Math.random().toString(),
            } };
        case constants.AUTH_LOGOUT:
            return { ...state, user: false };
        default:
            return state;
    }
}

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, Reducer);

export default () => {
  let store = createStore<ApplicationState>(persistedReducer, {
      user: false
  });

  let persistor = persistStore(store);
  return { store, persistor };
};