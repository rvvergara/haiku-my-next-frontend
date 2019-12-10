import { LIST_CLINICS } from '../actions/types';

export const listClinics = (clinics) => ({
  type: LIST_CLINICS,
  clinics,
});
