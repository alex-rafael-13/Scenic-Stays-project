import React from 'react';

import './index.css'

import ReactDOM from 'react-dom';
import { Provider as ReduxProvider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider, Modal } from './context/Modal';
import App from './App';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as SessionActions from './store/session'
import * as SpotActions from './store/spots'

import configureStore from './store';

const store = configureStore()

if(process.env.NODE_ENV !== 'production'){
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = SessionActions
  window.spotActions = SpotActions
}

//Root function component
const Root = () => {
  return(
    <ModalProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </ReduxProvider>
    </ModalProvider>
  )
  }


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
