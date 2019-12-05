import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminProfile, createClinic, editClinic } from '../../../store/actions/clinicActions';
import { clinicConstants } from '../../../store/constants/clinicConstants'
import Select from 'react-select';

const setValue = (value) => {
    return {
        value,
        label: value
    }
}

const clinicCategories = [...clinicConstants.CLINIC_CATEGORIES.map(cat => setValue(cat))]
const clinicProviders = [...clinicConstants.CLINIC_PROVIDERS.map(prov => setValue(prov))]

class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            postalCode: '',
            category: '',
            providers: [],
            minFee: 0,
            maxFee: 0
        }
    }

    componentDidMount() {
        const { token, data, getAdminProfile } = this.props;
        getAdminProfile(token, data.id).then(res => {
            this.setClinicDetailsToState(res.clinic)
        })
    }

    setClinicDetailsToState = (clinic) => {
        this.setState({
            name: clinic ? clinic.name : '',
            address: clinic ? clinic.address : '',
            postalCode: clinic ? clinic.postalCode : '',
            category: clinic ? clinic.category : '',
            providers: clinic ? clinic.providers : [],
            minFee: clinic ? parseFloat(clinic.minFee).toFixed(2) : 0,
            maxFee: clinic ? parseFloat(clinic.maxFee).toFixed(2) : 0
        })
    }

    handleChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = () => {
        const { name, address, postalCode, category, providers, minFee, maxFee } = this.state;
        const { token, data, createClinic, clinic, editClinic } = this.props;
        const body = {
            image: null,
            name,
            address,
            postalCode,
            category,
            providers,
            minFee,
            maxFee
        }
        if (!clinic) {
            createClinic(token, data.id, body).then(res => this.setClinicDetailsToState(res))
        } else {
            editClinic(token, clinic.id, body).then(res => this.setClinicDetailsToState(res))
        }
    }

    handleSelectCategory = option => {
        this.setState({
            category: option.value
        });
    };

    handleSelectProviders = options => {
        const mappedOptions = options && options.length > 0 ? [...options.map(opt => opt.value)] : []
        this.setState({
            providers: mappedOptions
        })
    }

    render() {
        const { clinic, loadingClinic, savingClinic } = this.props;
        const { name, address, postalCode, category, providers, minFee, maxFee } = this.state;

        const currentCategory = category ? setValue(category) : '';
        const currentProviders = providers && providers.length > 0 ? [...providers.map(prov => setValue(prov))] : '';

        const isSavedDisabled = savingClinic || !name || !address || !postalCode;
        return (
            loadingClinic ? (
                <div>Loading...</div>
            ) : (
                    <div>
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={name}
                                    name="name"
                                    onChange={(e) => this.handleChange(e)}
                                    placeholder="Enter clinic name"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={address}
                                    name="address"
                                    onChange={(e) => this.handleChange(e)}
                                    placeholder="Enter address"
                                />
                                <span className="asterisk" />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={(e) => this.handleChange(e)}
                                    placeholder="Enter postal code"
                                />
                                <span className="asterisk" />
                            </div>
                            <Select
                                value={currentCategory}
                                onChange={this.handleSelectCategory}
                                options={clinicCategories}
                                placeholder="Select category"
                            />
                            <Select
                                value={currentProviders}
                                onChange={this.handleSelectProviders}
                                options={clinicProviders}
                                placeholder="Select providers"
                                isMulti
                            />
                            <div className="form-group">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={minFee > 0 ? minFee : ''}
                                    name="minFee"
                                    onChange={(e) => this.handleChange(e)}
                                    placeholder="Enter min fees"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={maxFee > 0 ? maxFee : ''}
                                    name="maxFee"
                                    onChange={(e) => this.handleChange(e)}
                                    placeholder="Enter max fees"
                                />
                            </div>
                        </form>
                        <button
                            onClick={this.handleSubmit}
                            disabled={isSavedDisabled}
                        >
                            {savingClinic ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )
        )
    }
}

function mapStateToProps(state) {
    const { token, data } = state.currentUser;
    const { clinic, loadingClinic, adminProfile, savingClinic } = state.clinicReducers;
    const error = state.error;
    return {
        data,
        token,
        clinic,
        adminProfile,
        loadingClinic,
        savingClinic,
        error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProfile: (token, userId) => {
            return dispatch(getAdminProfile(token, userId));
        },
        createClinic: (token, userId, body) => {
            return dispatch(createClinic(token, userId, body))
        },
        editClinic: (token, clinicId, body) => {
            return dispatch(editClinic(token, clinicId, body))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
