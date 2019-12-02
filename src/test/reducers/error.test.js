import { SET_ERROR } from '../../store/actions/types';
import errorReducer from '../../store/reducers/error';

describe('errorReducer', () => {
  describe('wrong action', () => {
    test('should return default state', () => {
      const action = { type: 'SOME_ACTION' };
      const state = errorReducer(null, action);
      expect(state).toBe(null);
    });
  });

  describe('correct action', () => {
    test('should return the new state', () => {
      const error = 'Something went wrong';
      const action = { type: SET_ERROR, error };
      const state = errorReducer(null, action);
      expect(state).toBe(error);
    });
  });
});
