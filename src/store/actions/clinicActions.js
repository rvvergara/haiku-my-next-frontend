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

export const getAllPractitioners = (token) => ({
    type: clinicConstants.GET_ALL_PRACTITIONERS,
    token
})

export const getAllPractitionersSuccess = (practitioners) => ({
    type: clinicConstants.GET_ALL_PRACTITIONERS_SUCCESS,
    payload: practitioners
})

export const getAllPractitionersError = (err) => ({
    type: clinicConstants.GET_ALL_PRACTITIONERS_ERROR,
    payload: err
})

export const getAllClinicPractitioners = (token, clinicId) => ({
    type: clinicConstants.GET_CLINIC_PRACTITIONERS,
    token,
    clinicId
})

export const getAllClinicPractitionersSuccess = (practitioners) => ({
    type: clinicConstants.GET_CLINIC_PRACTITIONERS_SUCCESS,
    payload: practitioners
})

export const getAllClinicPractitionersError = (err) => ({
    type: clinicConstants.GET_CLINIC_PRACTITIONERS_ERROR,
    payload: err
})