import { clinicConstants } from '../constants/clinicConstants';

const initialState = {
    loadingClinic: true,
    clinic: null,
    clinicError: false,
    adminProfile: {},
    adminProfileError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
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
        case clinicConstants.GET_CLINIC_SUCCESS:
            return Object.assign({}, state, {
                clinic: action.payload,
                loadingClinic: false,
            })
        case clinicConstants.GET_CLINIC_ERROR:
            return Object.assign({}, state, {
                clinic: null,
                clinicError: action.payload,
                loadingClinic: false,
            })
        case clinicConstants.NO_CLINIC_FOUND:
            return Object.assign({}, state, {
                clinic: null,
                loadingClinic: false,
            })
        default:
            return state;
    }
};
