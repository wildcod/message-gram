import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {createStore,compose,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
// import reducer from '../src/redux/reducers/index'
// import thunk from 'redux-thunk'
import {store,persistor} from '../src/redux/reduxPersist'
import { PersistGate } from 'redux-persist/integration/react'

// const logger = store => {
//     return next => {
//         return action => {
//              console.log("[Middleware] Dispatching" , action);
//              const result = next(action);
//              console.log("[Middleware] next state" , store.getState())
             
//              return result;
//         }
//     }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer,composeEnhancers(applyMiddleware(logger,thunk)))

ReactDOM.render(<Provider store={store}>
                  
                     <App />
                   
                  </Provider>
                , document.getElementById('root'));
registerServiceWorker();
