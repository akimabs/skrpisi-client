import AsyncStorage from '@react-native-async-storage/async-storage';

import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {auth} from './reducers/auth';

const reducers = combineReducers({
  auth,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor};

export default store;
