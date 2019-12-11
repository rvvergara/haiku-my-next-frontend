import { LIST_PRACTITIONERS} from './types';

export const listPractitioners = (practitioner) => ({
  type: LIST_PRACTITIONERS,
  practitioner,
});
