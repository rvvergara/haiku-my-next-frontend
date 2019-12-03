import { clinicConstants } from '../constants/clinicConstants';

export const loadingClinic = () => ({
    type: clinicConstants.LOADING_CLINIC,
});

export const getAdminProfileByUserIdAndClinicData = (token, user) => ({
    type: clinicConstants.GET_ADMIN_PROFILE,
    token,
    user
})

export const getAdminProfileByUserIdSuccess = (admin) => ({
    type: clinicConstants.GET_ADMIN_PROFILE_SUCCESS,
    payload: admin
})

export const getAdminProfileByUserIdError = (err) => ({
    type: clinicConstants.GET_ADMIN_PROFILE_ERROR,
    payload: err
})

export const getClinicSuccess = (clinic) => ({
    type: clinicConstants.GET_CLINIC_SUCCESS,
    payload: clinic
});

export const getClinicError = (err) => ({
    type: clinicConstants.GET_CLINIC_ERROR,
    payload: err
});

export const noClinicFound = () => ({
    type: clinicConstants.NO_CLINIC_FOUND
})