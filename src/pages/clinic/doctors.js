import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';
import NoClinic from '../../components/Authenticated/Admin/NoClinic';
import { getAdminProfile, getAllPractitioners, getAllClinicPractitioners, addPractitionerToClinic, removePractitionerFromClinic } from '../../store/actions/clinicActions';
import Select from 'react-select';

const AddPractitionerRow = ({ currentPractitioner, selectPractitioner, practitionerList, toggleAddPractitioner, handleAddPractitioner }) => {
    return (
        <div>
            <Select
                value={currentPractitioner}
                onChange={selectPractitioner}
                options={practitionerList}
                placeholder="Select practitioner"
            />
            <button onClick={() => handleAddPractitioner(currentPractitioner)} disabled={!currentPractitioner}>Add</button>
            <button onClick={() => toggleAddPractitioner()}>Cancel</button>
        </div>
    )
}

const ClinicPractitionerCard = ({ practitioner, removePractitioner }) => {
    return (
        <div>
            <img src={practitioner.image || "../../static/profile.png"} width={50} height={50}/>
            <div>{`Dr. ${practitioner.user.firstName} ${practitioner.user.lastName}`}</div>
            <button onClick={() => removePractitioner(practitioner.id)}>Remove</button>
        </div>
    )
}

class Doctors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddPractitioner: false,
            selectedPractitioner: ''
        }

    }

    componentDidMount() {
        const { getAdminProfile, token, data, getAllPractitioners, getAllClinicPractitioners, clinic } = this.props;
        if (clinic) {
            getAllPractitioners(token)
            getAllClinicPractitioners(token, clinic.id)
        } else {
            getAdminProfile(token, data.id).then(res => {
                //clinic exists
                if (res && res.clinicId) {
                    getAllPractitioners(token)
                    getAllClinicPractitioners(token, res.clinicId)
                }
            })
        }
    }

    toggleAddPractitioner = () => {
        this.setState({
            showAddPractitioner: !this.state.showAddPractitioner,
            selectedPractitioner: ''
        })
    }

    addPractitioner = (practitioner) => {
        const { addPractitionerToClinic, clinic, token, practitionerListForClinicPage } = this.props
        const selectedPractitioner = practitionerListForClinicPage.find(prac => prac.id === practitioner.value)
        addPractitionerToClinic(token, clinic.id, selectedPractitioner).then(() => this.toggleAddPractitioner())
    }

    transformPractitionersForSelect = (practitionerList, clinicPractitionerList) => {
        if (practitionerList.length < 1) {
            return []
        }
        const practitionerNotInClinicList = practitionerList.filter(({ id }) => clinicPractitionerList.every(cp => cp.id !== id))
        if (practitionerNotInClinicList.length < 1) {
            return []
        }
        return [...practitionerNotInClinicList.map(prac => {
            return {
                value: prac.id,
                label: `Dr. ${prac.user.firstName} ${prac.user.lastName}`
            }
        })]
    }

    handleSelectPractitioner = option => {
        this.setState({
            selectedPractitioner: option
        })
    }

    handleRemovePractitioner = (practitionerId) => {
        const { removePractitionerFromClinic, token } = this.props;
        let selection = confirm("Are you sure you want to remove?")
        if (selection) {
            removePractitionerFromClinic(token, practitionerId)
        }
    }

    render() {
        const { showAddPractitioner, selectedPractitioner } = this.state;
        const {
            data,
            clinic,
            loadingClinic,
            loadingPractitionersForClinic,
            practitionerListForClinicPage,
            clinicPractitionerList,
            loadingClinicPractitioners
        } = this.props;

        const practitionerListForSelect = this.transformPractitionersForSelect(practitionerListForClinicPage, clinicPractitionerList);
        const pageloading = loadingClinic || loadingPractitionersForClinic;

        return (
            <Layout title="Doctors" userName={data.firstName}>
                <div>
                    {
                        pageloading ? (
                            <div>Loading...</div>
                        ) : (
                                clinic ? (
                                    <div>
                                        {
                                            loadingClinicPractitioners ? (
                                                <div>Loading...</div>
                                            ) : (
                                                    clinicPractitionerList.length > 0 ? (
                                                        clinicPractitionerList.map(clinicPrac => (
                                                            <ClinicPractitionerCard
                                                                key={clinicPrac.id}
                                                                practitioner={clinicPrac}
                                                                removePractitioner={this.handleRemovePractitioner}
                                                            />
                                                        ))
                                                    ) : (
                                                            <div>No doctors added yet.</div>
                                                        )
                                                )
                                        }
                                        {
                                            showAddPractitioner ? (
                                                <AddPractitionerRow
                                                    currentPractitioner={selectedPractitioner}
                                                    selectPractitioner={this.handleSelectPractitioner}
                                                    practitionerList={practitionerListForSelect}
                                                    toggleAddPractitioner={this.toggleAddPractitioner}
                                                    handleAddPractitioner={this.addPractitioner}
                                                />
                                            ) : (
                                                    <button
                                                        onClick={() => this.toggleAddPractitioner()}
                                                    >
                                                        Add Doctor
                                                    </button>
                                                )
                                        }
                                    </div>
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
    const {
        clinic,
        loadingClinic,
        loadingPractitionersForClinic,
        practitionerListForClinicPage,
        clinicPractitionerList,
        loadingClinicPractitioners
    } = state.clinicReducers
    return {
        data,
        token,
        clinic,
        loadingClinic,
        loadingPractitionersForClinic,
        practitionerListForClinicPage,
        clinicPractitionerList,
        loadingClinicPractitioners
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfile: (token, userId) => {
            return dispatch(getAdminProfile(token, userId));
        },
        getAllPractitioners: token => {
            return dispatch(getAllPractitioners(token))
        },
        getAllClinicPractitioners: (token, clinicId) => {
            return dispatch(getAllClinicPractitioners(token, clinicId))
        },
        addPractitionerToClinic: (token, clinicId, practitioner) => {
            return dispatch(addPractitionerToClinic(token, clinicId, practitioner))
        },
        removePractitionerFromClinic: (token, practitionerId) => {
            return dispatch(removePractitionerFromClinic(token, practitionerId))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctors)