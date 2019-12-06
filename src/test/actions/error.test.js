import { SET_ERROR } from '../../store/actions/types';
import setError from '../../store/actions/error';

describe('setError action generator', () => {
  test('should create the correct action', () => {
    const error = 'Something went wrong';
    const action = setError(error);

    expect(action.type).toBe(SET_ERROR);
    expect(action.error).toBe(error);
  });
});
