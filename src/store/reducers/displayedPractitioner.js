import { SET_PRACTITIONER} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SET_PRACTITIONER:
      return action.practitioner;
    default:
      return state;
  }
};
