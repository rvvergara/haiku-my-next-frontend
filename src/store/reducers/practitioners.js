import { LIST_PRACTITIONERS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LIST_PRACTITIONERS:
      return action.practitioners;
    default:
      return state;
  }
};
