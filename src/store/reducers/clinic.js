import { LIST_CLINICS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LIST_CLINICS:
      return action.clinics;
    default:
      return state;
  }
};
