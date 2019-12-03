import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { clinicConstants } from '../constants/clinicConstants';
import * as clinicActions from '../actions/clinicActions';
import { sendAuthorizedRequest } from '../../utils/api';

export function* asyncFetchCurrentAdminProfileByUserId(params) {
    const path = `v1/admin/${params.user.id}/user`;
    try {
        const response = yield call(sendAuthorizedRequest, 'get', path, params.token);
        const admin = yield response.data;
        
        const clinic = yield call(asyncFetchClinicDetails, params.token, null)
        
        return yield put(clinicActions.getAdminProfileByUserIdSuccess(admin))
    } catch (err) {
        return yield put(clinicActions.getAdminProfileByUserIdError(err));
    }
}

function* asyncFetchClinicDetails(token, id) {
    console.log(token, id)
    const path = `v1/clinic/${id}`;
    try {
        const response = yield call(sendAuthorizedRequest, 'get', path, token);
        const clinic = yield response.data;
        return yield put(clinicActions.getClinicSuccess(clinic))
    } catch (err) {
        return yield put(clinicActions.getClinicError(err));
    }
}


export const clinicSagas = [
    takeLatest(clinicConstants.GET_ADMIN_PROFILE, asyncFetchCurrentAdminProfileByUserId)
]