import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layouts/Layout';
import NoClinic from '../../components/Authenticated/Admin/NoClinic';
import { getAdminProfile, getAllPractitioners } from '../../store/actions/clinicActions';
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

class Doctors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddPractitioner: false,
            selectedPractitioner: ''
        }

    }

    componentDidMount() {
        const { getAdminProfile, token, data, getAllPractitioners } = this.props;
        getAdminProfile(token, data.id).then(res => {
            //clinic exists
            if (res && res.clinicId) {
                getAllPractitioners(token)
            }
        })
    }

    toggleAddPractitioner = () => {
        this.setState({
            showAddPractitioner: !this.state.showAddPractitioner
        })
    }

    addPractitioner = () => {
        console.log('add')
    }

    transformPractitionersForSelect = (practitionerList) => {
        console.log(practitionerList)
    }

    render() {
        const { showAddPractitioner } = this.state;
        const { data, clinic, loadingClinic } = this.props;
        this.transformPractitionersForSelect()
        return (
            <Layout title="Doctors" userName={data.firstName}>
                <div>
                    {
                        loadingClinic ? (
                            <div>Loading...</div>
                        ) : (
                                clinic ? (
                                    <div>Doctors</div>
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
        clinic,
        loadingClinic,
        data,
        token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfile: (token, userId) => {
            return dispatch(getAdminProfile(token, userId));
        },
        getAllPractitioners: token => {
            return dispatch(getAllPractitioners(token))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctors)