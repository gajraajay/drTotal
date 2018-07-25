import { createStore, applyMiddleware } from "redux";
import RootReducer from './Reducers/RootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage: storage
};

export function injectReducers( ) {
  console.log( store );
  return store;
}

const initialState = {};
const middleWares = [ thunk ];

const pReducer = persistReducer( persistConfig, RootReducer );

export const store = createStore(pReducer, initialState, composeWithDevTools(applyMiddleware( ...middleWares )));
export const persistor = persistStore( store );
