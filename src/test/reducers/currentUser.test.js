import { SET_CURRENT_USER } from '../../store/actions/types';
import currentUserReducer from '../../store/reducers/currentUser';

describe('currentUserReducer', () => {
  const initialState = {
    authenticated: false,
    data: {},
  };

  const authenticatedState = {
    authenticated: true,
    data: {
      firsName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
    },
  };

  describe('wrong action type', () => {
    test('should not change state', () => {
      const action = {
        type: 'WRONG_ACTION',
      };
      const state = currentUserReducer(initialState, action);
      expect(state).not.toBe(authenticatedState);
      expect(state).toBe(initialState);
    });
  });

  describe('correct action type', () => {
    test('should change state', () => {
      const action = {
        type: SET_CURRENT_USER,
        currentUser: authenticatedState,
      };
      const state = currentUserReducer(initialState, action);
      expect(state).toBe(authenticatedState);
    });
  });
});
