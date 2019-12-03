import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminProfileByUserId } from '../../store/actions/clinicActions';

import '../../components/clinic/clinic.scss'

class Clinic extends Component {
    componentDidMount() {
        const { token, data, getAdminProfileByUserId, getClinic } = this.props;
        const admin = getAdminProfileByUserId(token, data)
    }
    render() {
        const { data } = this.props;
        return (
            <div>
                {data.firstName}
                {data.lastName}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { token, data } = state.currentUser;
    return {
        data,
        token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfileByUserId: (token, user) => {
            return dispatch(getAdminProfileByUserId(token, user));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
