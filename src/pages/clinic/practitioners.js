import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllPractitioners, getAllClinicPractitioners } from '../../store/actions/clinicActions'

import '../../components/clinic/clinic.scss';


const AddPractitionerRow = ({ selectedPractitioner, practitionerList, toggleAddPractitioner, handleAddPractitioner }) => {
    return (
        <div>
            <button onClick={() => handleAddPractitioner()}>Add</button>
            <button onClick={() => toggleAddPractitioner()}>Cancel</button>
        </div>
    )
}

const ClinicPractitionerCard = ({ practitioner }) => {
    return (
        <div>
            {practitioner.userId}
        </div>
    )
}

class Practitioners extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddPractitioner: false
        }

    }

    componentDidMount() {
        const { getAllPractitioners, token, getAllClinicPractitioners, clinic } = this.props;
        getAllPractitioners(token)
        getAllClinicPractitioners(token, clinic.id)
    }

    toggleAddPractitioner = () => {
        this.setState({
            showAddPractitioner: !this.state.showAddPractitioner
        })
    }

    addPractitioner = () => {
        console.log('add')
    }


    render() {
        const { showAddPractitioner } = this.state
        const { clinic, practitionerListForClinicPage, loadingClinicPractitioners, clinicPractitionerList } = this.props;

        return (
            <div>
                {
                    clinicPractitionerList && clinicPractitionerList.length > 0 ?
                        (
                            clinicPractitionerList.map(cp => {
                                console.log(cp, 'CLINICPR')
                                return (
                                    <ClinicPractitionerCard practitioner={cp} key={cp.id} />
                                )
                            }
                            )
                        ) : (
                            <div>No practitioners for this clinic yet.</div>
                        )
                }
                {
                    showAddPractitioner ?
                        <AddPractitionerRow
                            toggleAddPractitioner={this.toggleAddPractitioner}
                            handleAddPractitioner={this.addPractitioner}
                        />
                        :
                        <button onClick={() => this.toggleAddPractitioner()}>Add practitioner</button>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { token } = state.currentUser;
    const { clinic, practitionerListForClinicPage, loadingClinicPractitioners, clinicPractitionerList } = state.clinicReducers
    return {
        clinic,
        token,
        practitionerListForClinicPage,
        loadingClinicPractitioners,
        clinicPractitionerList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAllPractitioners: token => {
            return dispatch(getAllPractitioners(token))
        },
        getAllClinicPractitioners: (token, clinicId) => {
            return dispatch(getAllClinicPractitioners(token, clinicId))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Practitioners)