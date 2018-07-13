import {
    createStore,
    applyMiddleware
} from "../../../.cache/typescript/2.9/node_modules/redux";
import RootReducer from './Reducers/RootReducer';
import {
    composeWithDevTools
} from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage: storage
   };

const initialState = { };
const middleWares = [thunk]; 

const pReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(pReducer, initialState,composeWithDevTools(applyMiddleware(...middleWares)));
export const persistor = persistStore(store);