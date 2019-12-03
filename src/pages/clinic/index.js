import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminProfileByUserIdAndClinicData } from '../../store/actions/clinicActions';

import '../../components/clinic/clinic.scss';

class Clinic extends Component {
    componentDidMount() {
        const { token, data, getAdminProfileByUserIdAndClinicData } = this.props;
        getAdminProfileByUserIdAndClinicData(token, data)
    }
    render() {
        const { data, clinic, loadingClinic } = this.props;
        console.log(this.props)
        return (
            loadingClinic ? (
                <div>Loading...</div>
            ) : (
                    <div>
                        {clinic && clinic.id}
                        {clinic && clinic.name}
                    </div>
                )
        )
    }
}

function mapStateToProps(state) {
    const { token, data } = state.currentUser;
    const { clinic, loadingClinic } = state.clinicReducers;
    return {
        data,
        token,
        clinic,
        loadingClinic
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfileByUserIdAndClinicData: (token, user) => {
            return dispatch(getAdminProfileByUserIdAndClinicData(token, user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
