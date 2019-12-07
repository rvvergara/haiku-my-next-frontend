import { clinicConstants } from '../constants/clinicConstants';

function editBookingStatus(practitionerBookingList, practitionerId, bookingId, status) {
    return practitionerBookingList.map((prac, i) => {
        if (prac.id !== practitionerId) {
            return prac
        } else {
            if (status === clinicConstants.BOOKING_STATUS.REJECTED) {
                return Object.assign({}, prac, {
                    bookings: prac.bookings.filter(booking => booking.id !== bookingId)
                })
            } else {
                const editedBookings = prac.bookings.map(booking => {
                    if (booking.id !== bookingId) {
                        return booking
                    } else {
                        return Object.assign({}, booking, {
                            status
                        })
                    }
                })
                return Object.assign({}, prac, {
                    bookings: editedBookings
                })
            }
        }
    })
}

const initialState = {
    loadingClinic: true,
    savingClinic: false,
    clinic: null,
    adminProfile: {},
    loadingClinicPractitioners: true,
    loadingPractitionersForClinic: true,
    practitionerListForClinicPage: [],
    clinicPractitionerList: [],
    loadingClinicPatients: true,
    clinicPatients: [],
    loadingClinicPractitionersWithBookings: true,
    loadingClinicPractitionerBookings: false,
    clinicPractitionersWithBookings: []
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
        case clinicConstants.LOADING_CLINIC_PRACTITIONERS:
            return Object.assign({}, state, {
                loadingClinicPractitioners: true
            })
        case clinicConstants.LOADING_CLINIC_PATIENTS:
            return Object.assign({}, state, {
                loadingClinicPatients: true
            })
        case clinicConstants.LOADING_CLINIC_PRACTITIONERS_WITH_BOOKINGS:
            return Object.assign({}, state, {
                loadingClinicPractitionersWithBookings: true
            })
        case clinicConstants.LOADING_CLINIC_PRACTITIONERS_BOOKINGS:
            return Object.assign({}, state, {
                loadingClinicPractitionerBookings: true
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
        case clinicConstants.GET_ALL_PRACTITIONERS:
            return Object.assign({}, state, {
                loadingPractitionersForClinic: false,
                practitionerListForClinicPage: action.payload
            })
        case clinicConstants.GET_CLINIC_PRACTITIONERS:
            return Object.assign({}, state, {
                loadingClinicPractitioners: false,
                clinicPractitionerList: action.payload
            })
        case clinicConstants.ADD_PRACTITIONER:
            return Object.assign({}, state, {
                loadingClinicPractitioners: false,
                clinicPractitionerList: [...state.clinicPractitionerList, action.payload]
            })
        case clinicConstants.DELETE_PRACTITIONER:
            return Object.assign({}, state, {
                loadingClinicPractitioners: false,
                clinicPractitionerList: state.clinicPractitionerList.filter(({ id }) => id !== action.payload)
            })
        case clinicConstants.GET_CLINIC_PATIENTS:
            return Object.assign({}, state, {
                loadingClinicPatients: false,
                clinicPatients: action.payload
            })
        case clinicConstants.GET_CLINIC_PRACTITIONERS_WITH_BOOKINGS:
            return Object.assign({}, state, {
                loadingClinicPractitionersWithBookings: false,
                clinicPractitionersWithBookings: action.payload
            })
        case clinicConstants.EDIT_CLINIC_BOOKING_STATUS:
            return Object.assign({}, state, {
                loadingClinicPractitionerBookings: false,
                clinicPractitionersWithBookings: editBookingStatus(state.clinicPractitionersWithBookings, action.practitionerId, action.bookingId, action.status)
            })
        default:
            return state;
    }
};
