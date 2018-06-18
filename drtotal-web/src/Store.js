import {
    createStore,
    applyMiddleware
} from "redux";
import RootReducer from './Reducers/RootReducer';
import {
    composeWithDevTools
} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
const firstState={};
const initialState = {"init":true};
const middleWares = [thunk]; 
const store = createStore(RootReducer,  composeWithDevTools(applyMiddleware(...middleWares)));

export default store;