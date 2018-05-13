import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import store from './Store';
import {CustomRouter} from './Routes/CustomRouter';
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <CustomRouter/>
      </Provider>
    )
  }
}
export default App;