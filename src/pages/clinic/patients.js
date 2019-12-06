import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';
import NoClinic from '../../components/Authenticated/Admin/NoClinic';
import { getAdminProfile, aggregatePatientsByClinicBookings, getClinicPatientsData } from '../../store/actions/clinicActions';

const PatientCard = ({ patient }) => {
    const numberOfTimes = patient.count > 1 ? 'times' : 'time';
    return (
        <div>
            <div>{patient.patientId}</div>
            <div>{patient.user.firstName}</div>
            <div>{`${patient.count} ${numberOfTimes} visited`}</div>
        </div>
    )
}

class Patients extends Component {

    componentDidMount() {
        const { clinic, getAdminProfile, token, data, aggregatePatientsByClinicBookings, getClinicPatientsData } = this.props;
        if (clinic) {
            aggregatePatientsByClinicBookings(token, clinic.id).then(res => {
                if (res.length > 0) {
                    const patientIds = [...res.map(patient => patient.patientId)]
                    getClinicPatientsData(token, patientIds)
                }
            })
        } else {
            getAdminProfile(token, data.id).then(res => {
                //get aggregate of patients, then get patient profiles
                if (res && res.clinicId) {
                    aggregatePatientsByClinicBookings(token, res.clinicId).then(res => {
                        if (res.length > 0) {
                            const patientIds = [...res.map(patient => patient.patientId)]
                            getClinicPatientsData(token, patientIds)
                        }
                    })
                }
            })
        }
    }

    appendClinicPatientDataToIds = (clinicPatientsIds, clinicPatientsData) => {
        let mergedArray = []
        if (clinicPatientsIds.length > 0 && clinicPatientsData.length > 0) {
            clinicPatientsIds.map((pId, i) => {
                mergedArray.push({
                    ...clinicPatientsIds[i],
                    ...clinicPatientsData.find(pData => (
                        pData.id === clinicPatientsIds[i].patientId
                    ))
                })
            })

        }
        return mergedArray
    }

    render() {
        const { data, clinic, loadingClinic, loadingClinicPatients, clinicPatientsIds, clinicPatientsData } = this.props;
        const patientDataList = this.appendClinicPatientDataToIds(clinicPatientsIds, clinicPatientsData)
        
        return (
            <Layout title="Patients" userName={data.firstName}>
                <div>
                    {
                        loadingClinic ? (
                            <div>Loading...</div>
                        ) : (
                                clinic ? (
                                    loadingClinicPatients ? (
                                        <div>Loading...</div>
                                    ) : (
                                            <div>
                                                {
                                                    patientDataList.length > 0 ?
                                                        (
                                                            patientDataList.map((patient, i) => (
                                                                <PatientCard
                                                                    patient={patient}
                                                                    key={i}
                                                                />
                                                            ))
                                                        ) : (
                                                            <div>No patients yet.</div>
                                                        )
                                                }
                                            </div>
                                        )
                                ) : (
                                        <NoClinic />
                                    )
                            )
                    }
                </div>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    const { token, data } = state.currentUser;
    const { clinic, loadingClinic, loadingClinicPatients, clinicPatientsIds, clinicPatientsData } = state.clinicReducers
    return {
        data,
        token,
        clinic,
        loadingClinic,
        loadingClinicPatients,
        clinicPatientsIds,
        clinicPatientsData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfile: (token, userId) => {
            return dispatch(getAdminProfile(token, userId));
        },
        aggregatePatientsByClinicBookings: (token, clinicId) => {
            return dispatch(aggregatePatientsByClinicBookings(token, clinicId))
        },
        getClinicPatientsData: (token, ids) => {
            return dispatch(getClinicPatientsData(token, ids))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients)