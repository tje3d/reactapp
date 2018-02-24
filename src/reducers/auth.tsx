import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as constants from 'consts';
import { StateAuth } from 'interfaces';
import { AuthAction } from 'types';

export function Reducer(state: StateAuth, action: AuthAction): StateAuth {
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
  let store = createStore<StateAuth>(persistedReducer, {
      user: false
  });

  let persistor = persistStore(store);
  return { store, persistor };
};