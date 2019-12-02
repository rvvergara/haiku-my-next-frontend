import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
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
  const store = createStore(
    rootReducer,
    initialState,
    middlewares,
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default initializeStore;
