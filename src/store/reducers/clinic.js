import { ADD_CLINIC, LIST_CLINICS, UPDATE_CLINIC } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LIST_CLINICS:
      return action.clinics;
    case ADD_CLINIC:
      return [...state, action.clinic];
    case UPDATE_CLINIC:
      {
        const clinicId = action.clinic.id;
        const indexForUpdate = state.findIndex(({ id }) => id === clinicId);
        const newClinicsList = [...state];
        newClinicsList[indexForUpdate] = action.clinic;
        return newClinicsList;
      }
    default:
      return state;
  }
};
