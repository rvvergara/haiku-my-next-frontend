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


export const getAllClinicPractitioners = () => {

}