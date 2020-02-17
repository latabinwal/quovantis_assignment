import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from "./reducers";
import rootSaga from "./sagas/index";
import { history } from '../utils/history'

const routersMiddleware = routerMiddleware(history)

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routersMiddleware];

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['login', 'profile'] // only user login and profile will be persisted
  }
  
const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
	const store = createStore(
		persistedReducer, 
		applyMiddleware(...middleware));
  	sagaMiddleware.run(rootSaga);
  	const persistor = persistStore(store);
  	// persistor.purge();
  	return { store, persistor };
  }