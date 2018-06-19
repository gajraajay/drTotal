import {
    createStore,
    applyMiddleware
} from "redux";
import RootReducer from './Reducers/RootReducer';
import {
    composeWithDevTools
} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
const initialState = {};
const middleWares = [thunk]; 
const store = createStore(RootReducer, initialState,composeWithDevTools(applyMiddleware(...middleWares)));

export default store;