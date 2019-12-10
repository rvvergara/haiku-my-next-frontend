import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';
import NoClinic from '../../components/Authenticated/Admin/NoClinic';
import { getAdminProfile, getClinicPractitionersWithBookings, updateBookingStatus } from '../../store/actions/clinicActions';
import { clinicConstants } from '../../store/constants/clinicConstants';
import moment from "moment";

const PractitionerBookings = ({ bookings, practitionerId, handleChangeBookingStatus }) => {
    return (
        bookings.length > 0 ? (
            bookings.map(booking => {
                const { firstName, lastName } = booking.patient.user;
                const { image } = booking.patient
                return (
                    <div key={booking.id}>
                        <img src={image || "../../static/profile.png"}  width={50} height={50}/>
                        {`${firstName} ${lastName}`}
                        {booking.status}
                        {moment(booking.startTime).format('DD-MMM-YYYY h:mm a')}
                        {
                            booking.status === clinicConstants.BOOKING_STATUS.PENDING ? (
                                <div>
                                    <button
                                        value={clinicConstants.BOOKING_STATUS.ACCEPTED}
                                        onClick={(e) => handleChangeBookingStatus(e, practitionerId, booking.id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        value={clinicConstants.BOOKING_STATUS.REJECTED}
                                        onClick={(e) => handleChangeBookingStatus(e, practitionerId, booking.id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            ) : ''
                        }
                    </div>
                )
            })
        ) : (
                <div>No bookings yet</div>
            )
    )
}

class Bookings extends Component {

    componentDidMount() {
        const { clinic, getClinicPractitionersWithBookings, getAdminProfile, token, data } = this.props;
        if (clinic) {
            getClinicPractitionersWithBookings(token, clinic.id)
        } else {
            getAdminProfile(token, data.id).then(res => {
                if (res && res.clinicId) {
                    getClinicPractitionersWithBookings(token, res.clinicId)
                }
            })
        }
    }

    handleChangeBookingStatus = (e, practitionerId, bookingId) => {
        const { token, updateBookingStatus } = this.props
        const { value } = e.target;
        const statusText = value === clinicConstants.BOOKING_STATUS.REJECTED ? 'reject' : 'accept'
        let selection = confirm(`Are you sure you want to ${statusText} booking?`)
        if (selection) {
            updateBookingStatus(token, practitionerId, bookingId, value)
        }
    }

    render() {
        const { data, clinic, loadingClinic, loadingClinicPractitionersWithBookings, clinicPractitionersWithBookings } = this.props;
        return (
            <Layout title="Bookings" userName={data.firstName}>
                <div>
                    {
                        loadingClinic ? (
                            <div>Loading...</div>
                        ) : (
                                clinic ? (
                                    loadingClinicPractitionersWithBookings ? (
                                        <div>Loading...</div>
                                    ) : (
                                            clinicPractitionersWithBookings.length > 0 ? (
                                                clinicPractitionersWithBookings.map(cp => {
                                                    const { firstName, lastName } = cp.user;
                                                    return (
                                                        <div key={cp.id}>
                                                            <img src={cp.image || "../../static/profile.png"}  width={50} height={50}/>
                                                            <div>{`Dr ${firstName} ${lastName}`}</div>
                                                            <PractitionerBookings
                                                                bookings={cp.bookings}
                                                                practitionerId={cp.id}
                                                                handleChangeBookingStatus={this.handleChangeBookingStatus}
                                                            />
                                                        </div>
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
    const { clinic, loadingClinic, loadingClinicPractitionersWithBookings, clinicPractitionersWithBookings, loadingClinicPractitionerBookings } = state.clinicReducers
    return {
        data,
        token,
        clinic,
        loadingClinic,
        loadingClinicPractitionersWithBookings,
        clinicPractitionersWithBookings,
        loadingClinicPractitionerBookings
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfile: (token, userId) => {
            return dispatch(getAdminProfile(token, userId));
        },
        getClinicPractitionersWithBookings: (token, clinicId) => {
            return dispatch(getClinicPractitionersWithBookings(token, clinicId))
        },
        updateBookingStatus: (token, practitionerId, bookingId, status) => {
            return dispatch(updateBookingStatus(token, practitionerId, bookingId, status))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings)