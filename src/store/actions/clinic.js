import { LIST_CLINICS, ADD_CLINIC } from './types';

export const listClinics = (clinics) => ({
  type: LIST_CLINICS,
  clinics,
});

export const addClinic = (clinic) => ({
  type: ADD_CLINIC,
  clinic,
});
