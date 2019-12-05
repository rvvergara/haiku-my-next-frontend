import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';
import NoClinic from '../../components/Authenticated/Admin/NoClinic';

class Bookings extends Component {
    render() {
        const { data, clinic } = this.props;
        return (
            <Layout title="Bookings" userName={data.firstName}>
                <div>
                    {
                        clinic ? (
                            <div>Bookings</div>
                        ) : (
                                <NoClinic />
                            )
                    }
                </div>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    const { token, data } = state.currentUser;
    const { clinic } = state.clinicReducers
    return {
        data,
        token,
        clinic
    };
}

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)