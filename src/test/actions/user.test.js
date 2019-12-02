import {
 SET_CURRENT_USER, ASYNC_LOG_USER, ASYNC_FETCH_CURRENT_USER_DATA, ASYNC_SIGNUP,
} from '../../store/actions/types';
import {
 setCurrentUser,
  asyncLogUser,
  asyncFetchCurrentUserData,
  asyncSignUp,
} from '../../store/actions/user';

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

describe('asyncFetchCurrentUserData action generator', () => {
  test('should create the correct action', () => {
    const id = 'someID';
    const action = asyncFetchCurrentUserData(id);
    expect(action.type).toBe(ASYNC_FETCH_CURRENT_USER_DATA);
    expect(action.id).toBe(id);
  });
});

describe('asyncSignup action generator', () => {
  test('should create the right action', () => {
    const params = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      password: 'password',
    };

    const action = asyncSignUp(params);
    expect(action.type).toBe(ASYNC_SIGNUP);
    expect(action.params).toBe(params);
  });
});
