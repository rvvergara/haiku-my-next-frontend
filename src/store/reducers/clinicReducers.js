import { clinicConstants } from '../constants/clinicConstants';

const initialState = {
    loadingClinic: true,
    savingClinic: false,
    clinic: null,
    adminProfile: {},
    loadingClinicPractitioners: true,
    loadingPractitionersForClinic: true,
    practitionerListForClinicPage: [],
    clinicPractitionerList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case clinicConstants.LOADING_CLINIC:
            return Object.assign({}, state, {
                loadingClinic: true
            })
        case clinicConstants.SAVING_CLINIC:
            return Object.assign({}, state, {
                savingClinic: true
            })
        case clinicConstants.LOADING_PRACTITIONERS_FOR_CLINIC:
            return Object.assign({}, state, {
                loadingPractitionersForClinic: true
            })
        case clinicConstants.GET_ADMIN_PROFILE:
            return Object.assign({}, state, {
                loadingClinic: false,
                adminProfile: action.payload,
                clinic: action.payload.clinic
            })
        case clinicConstants.ADD_CLINIC:
            return Object.assign({}, state, {
                savingClinic: false,
                clinic: action.payload
            })
        case clinicConstants.EDIT_CLINIC:
            return Object.assign({}, state, {
                savingClinic: false,
                clinic: {
                    ...state.clinic,
                    ...action.payload
                }
            })
        case clinicConstants.ADD_CLINIC:
            return Object.assign({}, state, {
                savingClinic: false,
                clinic: action.payload
            })
        default:
            return state;
    }
};
