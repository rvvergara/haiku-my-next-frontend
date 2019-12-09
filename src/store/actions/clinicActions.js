import { clinicConstants } from '../constants/clinicConstants';
import { sendAuthorizedRequest } from '../../utils/api';
import setError from '../actions/error'

export const getAdminProfile = (token, userId) => {
    return async dispatch => {
        dispatch({
            type: clinicConstants.LOADING_CLINIC
        });
        try {
            const res = await sendAuthorizedRequest('get', `v1/admin/${userId}/user`, token);
            dispatch({
                type: clinicConstants.GET_ADMIN_PROFILE,
                payload: res.data.admin
            });
            return res.data.admin;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const createClinic = (token, userId, body) => {
    return async dispatch => {
        dispatch({
            type: clinicConstants.SAVING_CLINIC
        });
        try {
            const clinic = await sendAuthorizedRequest('post', `v1/clinics`, token, body);
            const res = await sendAuthorizedRequest('put', `v1/admin/${userId}/user`, token, { clinicId: clinic.data.clinic.id });
            dispatch({
                type: clinicConstants.ADD_CLINIC,
                payload: clinic.data.clinic
            });
            return clinic.data.clinic;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const editClinic = (token, clinicId, body) => {
    return async dispatch => {
        dispatch({
            type: clinicConstants.SAVING_CLINIC
        });
        try {
            const clinic = await sendAuthorizedRequest('put', `v1/clinic/${clinicId}`, token, body);
            dispatch({
                type: clinicConstants.EDIT_CLINIC,
                payload: body
            });
            return body;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const getAllPractitioners = (token) => {
    return async dispatch => {
        dispatch({
            type: clinicConstants.LOADING_PRACTITIONERS_FOR_CLINIC
        });
        try {
            const practitionerList = await sendAuthorizedRequest('get', `v1/practitioners`, token);
            dispatch({
                type: clinicConstants.GET_ALL_PRACTITIONERS,
                payload: practitionerList.data.practitioners
            });
            return practitionerList.data.practitioners;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const getAllClinicPractitioners = (token, clinicId) => {
    return async dispatch => {
        dispatch({
            type: clinicConstants.LOADING_CLINIC_PRACTITIONERS
        });
        try {
            const practitionerList = await sendAuthorizedRequest('get', `v1/practitioners/${clinicId}/clinic`, token);
            dispatch({
                type: clinicConstants.GET_CLINIC_PRACTITIONERS,
                payload: practitionerList.data.practitioners
            });
            return practitionerList.data.practitioners;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const addPractitionerToClinic = (token, clinicId, practitioner) => {
    return async dispatch => {
        try {
            const res = await sendAuthorizedRequest('put', `v1/practitioner/${practitioner.id}`, token, { clinicId });
            dispatch({
                type: clinicConstants.ADD_PRACTITIONER,
                payload: practitioner
            });
            return practitioner;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const removePractitionerFromClinic = (token, practitionerId) => {
    return async dispatch => {
        try {
            const practitioner = await sendAuthorizedRequest('put', `v1/practitioner/${practitionerId}`, token, { clinicId: null });
            dispatch({
                type: clinicConstants.DELETE_PRACTITIONER,
                payload: practitionerId
            });
            return practitionerId;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const aggregatePatientsByClinicBookings = (token, clinicId) => {
    return async dispatch => {
        dispatch({
            type: clinicConstants.LOADING_CLINIC_PATIENTS
        });
        try {
            const patients = await sendAuthorizedRequest('get', `v1/bookings/${clinicId}/patients/aggregate`, token);
            const { bookings } = patients.data
            dispatch({
                type: clinicConstants.GET_CLINIC_PATIENTS,
                payload: bookings
            });
            return bookings;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const getClinicPractitionersWithBookings = (token, clinicId) => {
    return async dispatch => {
        dispatch({
            type: clinicConstants.LOADING_CLINIC_PRACTITIONERS_WITH_BOOKINGS
        });
        try {
            const practitioners = await sendAuthorizedRequest('get', `v1/practitioners/${clinicId}/clinic/bookings`, token);
            dispatch({
                type: clinicConstants.GET_CLINIC_PRACTITIONERS_WITH_BOOKINGS,
                payload: practitioners.data.practitioners
            });
            return practitioners.data.practitioners;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const updateBookingStatus = (token, practitionerId, bookingId, status) => {
    return async dispatch => {
        dispatch({
            type: clinicConstants.LOADING_CLINIC_PRACTITIONERS_BOOKINGS
        });
        try {
            const booking = await sendAuthorizedRequest('put', `v1/booking/${bookingId}`, token, { status });
            dispatch({
                type: clinicConstants.EDIT_CLINIC_BOOKING_STATUS,
                bookingId,
                status,
                practitionerId
            });
            return true;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const getClinicOpeningHours = (token, clinicId) => {
    return async dispatch => {
        dispatch({
            type: clinicConstants.LOADING_CLINIC_OPENING_HOURS
        });
        try {
            const openinghours = await sendAuthorizedRequest('get', `v1/openinghours/${clinicId}/clinic`, token);
            const { openingHours } = openinghours.data
            dispatch({
                type: clinicConstants.GET_CLINIC_OPENING_HOURS,
                payload: openingHours
            });
            return openingHours;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const deleteClinicOpeningHours = (token, openingHourId) => {
    return async dispatch => {
        try {
            const openingHour = await sendAuthorizedRequest('delete', `v1/openinghours/${openingHourId}`, token);
            dispatch({
                type: clinicConstants.DELETE_CLINIC_OPENING_HOUR,
                payload: openingHourId
            });
            return openingHourId;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const addClinicOpeningHours = (token, clinicId, selectedDays, selectedTimes) => {
    const body = []
    selectedDays.map(day => {
        body.push({
            "open": selectedTimes[0],
            "close": selectedTimes[1],
            "dayOfWeek": day,
            clinicId
        })
    })
    return async dispatch => {
        try {
            const openingHours = await sendAuthorizedRequest('post', `v1/openinghours/bulk`, token, body);
            dispatch({
                type: clinicConstants.ADD_CLINIC_OPENING_HOURS,
                payload: openingHours.data.openingHours
            });
            return openingHours.data.openingHours;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}

export const editClinicOpeningHour = (token, openingHourId, selectedTimes) => {
    const body = {
        open: selectedTimes[0],
        close: selectedTimes[1],
    }
    return async dispatch => {
        try {
            const openingHour = await sendAuthorizedRequest('put', `v1/openinghours/${openingHourId}`, token, body);
            dispatch({
                type: clinicConstants.EDIT_CLINIC_OPENING_HOUR,
                payload: openingHourId,
                selectedTimes
            });
            return openingHourId;
        }
        catch (error) {
            console.log(error);
            dispatch(setError(error));
        }
    };
}