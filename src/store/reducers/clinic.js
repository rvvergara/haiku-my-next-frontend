import { LIST_CLINICS, ADD_CLINIC } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LIST_CLINICS:
      return action.clinics;
    case ADD_CLINIC:
      return [...state, action.clinic];
    default:
      return state;
  }
};
