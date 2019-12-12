import { LIST_PRACTITIONERS,SET_PRACTITIONER } from './types';

export const listPractitioners = (practitioners) => ({
  type: LIST_PRACTITIONERS,
  practitioners,
});

export const setPractitioner = (practitioner) => ({
  type: SET_PRACTITIONER,
  practitioner,
});