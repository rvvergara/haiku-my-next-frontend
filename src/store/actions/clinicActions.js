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