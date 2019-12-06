import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';
import NoClinic from '../../components/Authenticated/Admin/NoClinic';
import { getAdminProfile, getAllClinicPractitioners } from '../../store/actions/clinicActions';

class Bookings extends Component {

    componentDidMount() {
        const { clinic, getAllClinicPractitioners, getAdminProfile, token, data } = this.props;
        if (clinic) {
            getAllClinicPractitioners(token, clinic.id)
        } else {
            getAdminProfile(token, data.id).then(res => {
                if (res && res.clinicId) {
                    getAllClinicPractitioners(token, res.clinicId)
                }
            })
        }
    }


    render() {
        const { data, clinic, loadingClinic, clinicPractitionerList, loadingClinicPractitioners } = this.props;
        return (
            <Layout title="Bookings" userName={data.firstName}>
                <div>
                    {
                        loadingClinic ? (
                            <div>Loading...</div>
                        ) : (
                                clinic ? (
                                    loadingClinicPractitioners ? (
                                        <div>Loading...</div>
                                    ) : (
                                            clinicPractitionerList.length > 0 ? (
                                                clinicPractitionerList.map(cp => {
                                                    return (
                                                        <div>{cp.user.firstName}</div>
                                                    )
                                                })
                                            ) : (
                                                    <div>No doctors added yet.</div>
                                                )
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
    const { clinic, loadingClinic, clinicPractitionerList, loadingClinicPractitioners } = state.clinicReducers
    return {
        data,
        token,
        clinic,
        loadingClinic,
        clinicPractitionerList,
        loadingClinicPractitioners
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfile: (token, userId) => {
            return dispatch(getAdminProfile(token, userId));
        },
        getAllClinicPractitioners: (token, clinicId) => {
            return dispatch(getAllClinicPractitioners(token, clinicId))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)