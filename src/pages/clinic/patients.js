import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';
import NoClinic from '../../components/Authenticated/Admin/NoClinic';
import { getAdminProfile, aggregatePatientsByClinicBookings } from '../../store/actions/clinicActions';

const PatientCard = ({ patient }) => {
    const numberOfTimes = patient.count > 1 ? 'times' : 'time';
    const { firstName, lastName } = patient.patient.user;
    return (
        <div>
            <div>{`${firstName} ${lastName}`}</div>
            <div>{`Visited ${patient.count} ${numberOfTimes}`}</div>
        </div>
    )
}

class Patients extends Component {

    componentDidMount() {
        const { clinic, getAdminProfile, token, data, aggregatePatientsByClinicBookings } = this.props;
        if (clinic) {
            aggregatePatientsByClinicBookings(token, clinic.id)
        } else {
            getAdminProfile(token, data.id).then(res => {
                //get aggregate of patients
                if (res && res.clinicId) {
                    aggregatePatientsByClinicBookings(token, res.clinicId)
                }
            })
        }
    }

    render() {
        const { data, clinic, loadingClinic, loadingClinicPatients, clinicPatients } = this.props;

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
                                                    clinicPatients.length > 0 ?
                                                        (
                                                            clinicPatients.map((patient, i) => (
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
    const { clinic, loadingClinic, loadingClinicPatients, clinicPatients } = state.clinicReducers
    return {
        data,
        token,
        clinic,
        loadingClinic,
        loadingClinicPatients,
        clinicPatients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfile: (token, userId) => {
            return dispatch(getAdminProfile(token, userId));
        },
        aggregatePatientsByClinicBookings: (token, clinicId) => {
            return dispatch(aggregatePatientsByClinicBookings(token, clinicId))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients)