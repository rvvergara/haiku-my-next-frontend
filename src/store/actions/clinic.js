import { LIST_CLINICS, ADD_CLINIC, SET_CLINIC } from './types';

export const listClinics = (clinics) => ({
  type: LIST_CLINICS,
  clinics,
});

export const addClinic = (clinic) => ({
  type: ADD_CLINIC,
  clinic,
});

export const setClinic = (clinic) => ({
  type: SET_CLINIC,
  clinic,
});
