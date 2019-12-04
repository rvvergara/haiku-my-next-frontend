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
        default:
            return state;
    }
};
