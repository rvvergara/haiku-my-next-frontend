import { SET_ERROR } from './types';

const setError = (error) => ({
  type: SET_ERROR,
  error,
});

export { setError as default };
