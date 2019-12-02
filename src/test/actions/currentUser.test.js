import { SET_CURRENT_USER, ASYNC_LOG_USER } from '../../store/actions/types';
import { setCurrentUser, asyncLogUser } from '../../store/actions/currentUser';

describe('setCurrentUser action generator', () => {
  test('should create the correct action', () => {
    const currentUser = {
      authenticated: true,
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
      },
    };

    const action = setCurrentUser(currentUser);

    expect(action.type).toBe(SET_CURRENT_USER);
    expect(action.currentUser).toBe(currentUser);
  });
});

describe('asyncLogUser action generator', () => {
  test('should return the correct action', () => {
    const params = {
      email: 'john@gmail.com',
      password: 'password',
    };

    const action = asyncLogUser(params);

    expect(action.type).toBe(ASYNC_LOG_USER);
    expect(action.params).toBe(params);
  });
});
