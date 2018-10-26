import { persistStore, persistReducer } from 'redux-persist'
import {createStore,compose,applyMiddleware} from 'redux'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import reducer from './reducers/index'

const logger = store => {
    return next => {
        return action => {
             console.log("[Middleware] Dispatching" , action);
             const result = next(action);
             console.log("[Middleware] next state" , store.getState())
             
             return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer,composeEnhancers(applyMiddleware(logger,thunk)))
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducer)
 

  let store = createStore(reducer,composeEnhancers(applyMiddleware(logger,thunk)))
  let persistor = persistStore(store)
export { store, persistor }