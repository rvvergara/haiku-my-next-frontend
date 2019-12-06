import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const middlewares = process.env.NODE_ENV === 'development'
    ? composeEnhancers(applyMiddleware(thunk, logger))
    : compose(applyMiddleware(thunk));

const initializeStore = (initialState = {}) => createStore(
    rootReducer,
    initialState,
    middlewares,
  );

export default initializeStore;
