import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { persistor, store } from './Store';
import { CustomRouter } from './Routes/CustomRouter';
import { PersistGate } from 'redux-persist/lib/integration/react';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<h1> Loading .... </h1>} persistor={persistor}>
          <CustomRouter />
        </PersistGate>
      </Provider>
    )
  }
}
export default App;