import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = process.env.NODE_ENV === 'development'
    ? composeEnhancers(applyMiddleware(sagaMiddleware, logger))
    : compose(applyMiddleware(sagaMiddleware));

const initializeStore = (initialState = {}) => {
  let store;

  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      storage,
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      middlewares,
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      initialState,
      middlewares,
    );
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default initializeStore;
