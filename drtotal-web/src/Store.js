import {createStore, applyMiddleware} from "redux";
import RootReducer from './Reducers/RootReducer'
const initialState = {};
const middleWares = [];
const store = createStore(RootReducer, {}, applyMiddleware(...middleWares))
export default store;