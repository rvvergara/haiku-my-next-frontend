import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';
import NoClinic from '../../components/Authenticated/Admin/NoClinic';
import { getAdminProfile } from '../../store/actions/clinicActions';

class Patients extends Component {

    componentDidMount() {
        const { clinic, getAdminProfile, token, data } = this.props;
        if (clinic) {

        } else {
            getAdminProfile(token, data.id)
        }
    }

    render() {
        const { data, clinic, loadingClinic } = this.props;
        return (
            <Layout title="Patients" userName={data.firstName}>
                <div>
                    {
                        loadingClinic ? (
                            <div>Loading...</div>
                        ) : (
                                clinic ? (
                                    <div>Patients</div>
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
    const { clinic, loadingClinic } = state.clinicReducers
    return {
        data,
        token,
        clinic,
        loadingClinic
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfile: (token, userId) => {
            return dispatch(getAdminProfile(token, userId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients)