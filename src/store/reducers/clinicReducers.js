import { clinicConstants } from '../constants/clinicConstants';

const initialState = {
    loadingClinic: true,
    clinic: null,
    adminProfile: {},
    loadingClinicPractitioners: true,
    practitionerListForClinicPage: [],
    clinicPractitionerList: []
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
        case clinicConstants.GET_CLINIC_SUCCESS:
            return Object.assign({}, state, {
                clinic: action.payload,
                loadingClinic: false,
            })
        case clinicConstants.NO_CLINIC_FOUND:
            return Object.assign({}, state, {
                clinic: null,
                loadingClinic: false,
            })
        case clinicConstants.LOADING_CLINIC_PRACTITIONERS:
            return Object.assign({}, state, {
                loadingClinicPractitioners: true
            })
        case clinicConstants.GET_ALL_PRACTITIONERS_SUCCESS:
            return Object.assign({}, state, {
                practitionerListForClinicPage: action.payload,
                loadingClinicPractitioners: false,
            })
        case clinicConstants.GET_CLINIC_PRACTITIONERS_SUCCESS:
            return Object.assign({}, state, {
                clinicPractitionerList: action.payload,
                loadingClinicPractitioners: false,
            })
        default:
            return state;
    }
};
