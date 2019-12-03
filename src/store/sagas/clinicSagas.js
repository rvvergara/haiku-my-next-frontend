import { put, takeLatest, call } from 'redux-saga/effects';
import { clinicConstants } from '../constants/clinicConstants';
import * as clinicActions from '../actions/clinicActions';
import { sendAuthorizedRequest } from '../../utils/api';

export function* asyncGetClinicData(action) {
    try {
        const admin = yield* _getAdminProfileByUserId(action.token, action.user)
        if (admin.admin.clinicId) {
            return yield* _getClinicDetails(action.token, admin.admin.clinicId)
        } else {
            return yield put(clinicActions.noClinicFound())
        }
    } catch (err) {
        console.log(err)
    }
}

function* _getAdminProfileByUserId(token, user) {
    const path = `v1/admin/${user.id}/user`;
    try {
        const response = yield call(sendAuthorizedRequest, 'get', path, token);
        const admin = yield response.data;

        yield put(clinicActions.getAdminProfileByUserIdSuccess(admin))
        return admin
    } catch (err) {
        yield put(clinicActions.getAdminProfileByUserIdError(err));
    }
}

function* _getClinicDetails(token, clinicId) {
    const path = `v1/clinic/${clinicId}`;
    try {
        const response = yield call(sendAuthorizedRequest, 'get', path, token);
        const clinic = yield response.data;

        yield put(clinicActions.getClinicSuccess(clinic.clinic))
        return clinic.clinic
    } catch (err) {
        return yield put(clinicActions.getClinicError(err));
    }
}


export const clinicSagas = [
    takeLatest(clinicConstants.GET_ADMIN_PROFILE, asyncGetClinicData)
]