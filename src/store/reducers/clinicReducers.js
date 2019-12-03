import { clinicConstants } from '../constants/clinicConstants';

const initialState = {
    loadingClinic: true,
    clinic: null,
    clinicError: false,
    adminProfile: {},
    adminProfileError: false
};

export default (state = initialState, action) => {
    switch (action.payload) {
        case clinicConstants.LOADING_CLINIC:
            return Object.assign({}, state, {
                loadingClinic: true
            })
        case clinicConstants.GET_ADMIN_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                adminProfile: action.payload
            })
        case clinicConstants.GET_ADMIN_PROFILE_ERROR:
            return Object.assign({}, state, {
                adminProfileError: action.payload
            })
        default:
            return state;
    }
};
