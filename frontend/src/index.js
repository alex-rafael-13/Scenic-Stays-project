import React from 'react';

import './index.css'

import ReactDOM from 'react-dom';
import { Provider as ReduxProvider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

import configureStore from './store';

const store = configureStore()

if(process.env.NODE_ENV !== 'production'){
  window.store = store
}

//Root function component
const Root = () => {
  return(
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  )
  }


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);