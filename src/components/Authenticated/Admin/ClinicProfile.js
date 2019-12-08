import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAdminProfile, createClinic, editClinic, getClinicOpeningHours, deleteClinicOpeningHours, addClinicOpeningHours, editClinicOpeningHour } from '../../../store/actions/clinicActions';
import { clinicConstants } from '../../../store/constants/clinicConstants'
import Select from 'react-select';
import moment from 'moment';

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

const setValue = (value, label = null) => {
    return {
        value,
        label: label || value
    }
}

const clinicCategories = [...clinicConstants.CLINIC_CATEGORIES.map(cat => setValue(cat))]
const clinicProviders = [...clinicConstants.CLINIC_PROVIDERS.map(prov => setValue(prov))]

const formatDay = (dayOfWeek) => {
    return moment().isoWeekday(dayOfWeek).format('ddd')
}

const formatTime = (time, format = true) => {
    if (format) {
        return moment(time, "HH:mm:ss").format("hh:mm a")
    }
    return moment(time, "HH:mm:ss")
}

const getDaysArray = () => {
    const days = []
    for (let i = 1; i < 8; i++) {
        days.push(setValue(i, formatDay(i)))
    }
    return days;
}

const ClinicForm = ({ clinic, profile, handleChange, handleSubmit, isSaveDisabled, savingClinic, handleSelectCategory, handleSelectProviders }) => {
    const { image, name, address, postalCode, category, providers, minFee, maxFee } = profile;
    return (
        <div>
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter clinic name"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={address}
                        name="address"
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter address"
                    />
                    <span className="asterisk" />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={postalCode}
                        name="postalCode"
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter postal code"
                    />
                    <span className="asterisk" />
                </div>
                <Select
                    value={category}
                    onChange={handleSelectCategory}
                    options={clinicCategories}
                    placeholder="Select category"
                />
                <Select
                    value={providers}
                    onChange={handleSelectProviders}
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
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter min fees"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        step="0.01"
                        value={maxFee > 0 ? maxFee : ''}
                        name="maxFee"
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter max fees"
                    />
                </div>
            </form>
            <button
                onClick={handleSubmit}
                disabled={isSaveDisabled}
            >
                {savingClinic ? 'Saving...' : (clinic ? 'Save Changes' : "Create Clinic")}
            </button>
        </div>
    )
}

const AddOpeningHoursControl = ({ showAddOpeningHours, toggleShowAddOpeningHours, addOpeningHours, selectedTimes, selectedDays, handleCheck, handleSetOpen, handleSetClose }) => {
    const daysArray = getDaysArray();
    const addDisabled = selectedDays.length < 1;
    return (
        showAddOpeningHours ? (
            <div>
                <label>Open</label>
                <TimePicker
                    style={{ width: 100 }}
                    showSecond={false}
                    defaultValue={formatTime(selectedTimes[0], false)}
                    className="xxx"
                    onChange={handleSetOpen}
                    use12Hours
                    minuteStep={15}
                    allowEmpty={false}
                />
                <label>Close</label>
                <TimePicker
                    style={{ width: 100 }}
                    showSecond={false}
                    defaultValue={formatTime(selectedTimes[1], false)}
                    className="xxx"
                    onChange={handleSetClose}
                    use12Hours
                    minuteStep={15}
                    allowEmpty={false}
                />
                {
                    daysArray.map(day => {
                        return (
                            <label key={day.value}>
                                <input type="checkbox" value={day.value} onClick={() => handleCheck(day.value)} />
                                {day.label}
                            </label>
                        )
                    })
                }
                <button onClick={() => addOpeningHours()} disabled={addDisabled}>Add</button>
                <button onClick={() => toggleShowAddOpeningHours()}>Cancel</button>
            </div>
        ) : (
                <button onClick={() => toggleShowAddOpeningHours()}>Add opening hours</button>
            )
    )
}

class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            name: '',
            address: '',
            postalCode: '',
            category: '',
            providers: [],
            minFee: 0,
            maxFee: 0,
            showAddOpeningHour: false,
            selectedDays: [],
            selectedOpen: clinicConstants.DEFAULT_CLINIC_OPENING_TIMES[0],
            selectedClose: clinicConstants.DEFAULT_CLINIC_OPENING_TIMES[1],
            currentEditingOpeningHour: null
        }
    }

    componentDidMount() {
        const { clinic, token, data, getAdminProfile, getClinicOpeningHours } = this.props;
        if (clinic) {
            this.setClinicDetailsToState(clinic)
            getClinicOpeningHours(token, clinic.id)
        } else {
            getAdminProfile(token, data.id).then(res => {
                if (res && res.clinic) {
                    this.setClinicDetailsToState(res.clinic)
                    getClinicOpeningHours(token, res.clinic.id)
                }
            })
        }
    }

    setClinicDetailsToState = (clinic) => {
        this.setState({
            image: clinic ? clinic.image : null,
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

    toggleShowAddOpeningHours = () => {
        this.setState({
            showAddOpeningHour: !this.state.showAddOpeningHour
        })
    }

    deleteOpeningHours = (id) => {
        const { token, deleteClinicOpeningHours } = this.props;
        let selection = confirm(`Are you sure you want to delete?`)
        if (selection) {
            deleteClinicOpeningHours(token, id)
        }
    }

    handleCheck = (dayOfWeek) => {
        const { selectedDays } = this.state;
        if (selectedDays.includes(dayOfWeek)) {
            this.setState({
                selectedDays: selectedDays.filter(day => day !== dayOfWeek)
            })
        } else {
            this.setState({
                selectedDays: [...selectedDays, dayOfWeek]
            })
        }
    }

    addClinicOpeningHours = () => {
        const { selectedDays, selectedOpen, selectedClose } = this.state;
        const { token, clinic, addClinicOpeningHours } = this.props;
        addClinicOpeningHours(token, clinic.id, selectedDays, [selectedOpen, selectedClose])
        this.toggleShowAddOpeningHours()
    }

    toggleEditOpeningHours = (openingHour = null) => {
        this.setState({
            currentEditingOpeningHour: openingHour
        })
    }

    formatTimeForTimePicker = (time) => {
        return moment(time, "HH:mm:ss").format("hh:mm")
    }

    handleSetOpen = (time) => {
        this.setState({ selectedOpen: this.formatTimeForTimePicker(time) })
    }

    handleSetClose = (time) => {
        this.setState({ selectedClose: this.formatTimeForTimePicker(time) })
    }

    handleSetCurrentOpen = (time) => {
        this.setState({
            currentEditingOpeningHour: {
                ...this.state.currentEditingOpeningHour,
                open: this.formatTimeForTimePicker(time)
            }
        })
    }

    handleSetCurrentClose = (time) => {
        this.setState({
            currentEditingOpeningHour: {
                ...this.state.currentEditingOpeningHour,
                close: this.formatTimeForTimePicker(time)
            }
        })
    }

    handleEditOpeningHour = () => {
        const { token, editClinicOpeningHour } = this.props;
        const { currentEditingOpeningHour } = this.state;
        const { open, close } = currentEditingOpeningHour;
        
        editClinicOpeningHour(token, currentEditingOpeningHour.id, [open, close])
        this.toggleEditOpeningHours()
    }

    render() {
        const { clinic, loadingClinic, savingClinic, loadingClinicOpeningHours, clinicOpeningHoursList } = this.props;
        const { image, name, address, postalCode, category, providers, minFee, maxFee, showAddOpeningHour, selectedDays, selectedOpen, selectedClose, currentEditingOpeningHour } = this.state;

        const currentCategory = category ? setValue(category) : '';
        const currentProviders = providers && providers.length > 0 ? [...providers.map(prov => setValue(prov))] : '';

        const isSaveDisabled = savingClinic || !name || !address || !postalCode;

        const clinicProfile = {
            image,
            name,
            address,
            postalCode,
            category: currentCategory,
            providers: currentProviders,
            minFee,
            maxFee
        }

        return (
            loadingClinic ? (
                <div>Loading...</div>
            ) : (
                    <div>
                        <h3>Clinic</h3>
                        <ClinicForm
                            clinic={clinic}
                            profile={clinicProfile}
                            handleChange={this.handleChange}
                            isSaveDisabled={isSaveDisabled}
                            savingClinic={savingClinic}
                            handleSubmit={this.handleSubmit}
                            handleSelectCategory={this.handleSelectCategory}
                            handleSelectProviders={this.handleSelectProviders}
                        />
                        {
                            clinic ? (
                                <div>
                                    <h3>Opening Hours</h3>
                                    {
                                        loadingClinicOpeningHours ? (
                                            <div>Loading...</div>
                                        ) : (
                                                clinicOpeningHoursList.length > 0 ? (
                                                    clinicOpeningHoursList.map(opening => (
                                                        currentEditingOpeningHour && currentEditingOpeningHour.id === opening.id ? (
                                                            <div key={opening.id}>
                                                                <div>
                                                                    {formatDay(opening.dayOfWeek)}
                                                                </div>
                                                                <label>Open</label>
                                                                <TimePicker
                                                                    style={{ width: 100 }}
                                                                    showSecond={false}
                                                                    defaultValue={formatTime(opening.open, false)}
                                                                    className="xxx"
                                                                    onChange={this.handleSetCurrentOpen}
                                                                    use12Hours
                                                                    minuteStep={15}
                                                                    allowEmpty={false}
                                                                />
                                                                <label>Close</label>
                                                                <TimePicker
                                                                    style={{ width: 100 }}
                                                                    showSecond={false}
                                                                    defaultValue={formatTime(opening.close, false)}
                                                                    className="xxx"
                                                                    onChange={this.handleSetCurrentClose}
                                                                    use12Hours
                                                                    minuteStep={15}
                                                                    allowEmpty={false}
                                                                />
                                                                <button onClick={() => this.handleEditOpeningHour()}>Save</button>
                                                                <button onClick={() => this.toggleEditOpeningHours()}>Cancel</button>
                                                            </div>
                                                        ) : (
                                                                <div key={opening.id}>
                                                                    {formatDay(opening.dayOfWeek)}
                                                                    {formatTime(opening.open)} - {formatTime(opening.close)}
                                                                    {
                                                                        currentEditingOpeningHour ? '' : (
                                                                            <div>
                                                                                <button onClick={() => this.toggleEditOpeningHours(opening)}>Edit</button>
                                                                                <button onClick={() => this.deleteOpeningHours(opening.id)}>Remove</button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                    ))
                                                ) : (
                                                        <div>No opening hours yet.</div>
                                                    )
                                            )
                                    }
                                    <AddOpeningHoursControl
                                        showAddOpeningHours={showAddOpeningHour}
                                        toggleShowAddOpeningHours={this.toggleShowAddOpeningHours}
                                        addOpeningHours={this.addClinicOpeningHours}
                                        selectedDays={selectedDays}
                                        selectedTimes={[selectedOpen, selectedClose]}
                                        handleCheck={this.handleCheck}
                                        handleSetOpen={this.handleSetOpen}
                                        handleSetClose={this.handleSetClose}
                                    />
                                </div>
                            ) : ''
                        }
                    </div>
                )
        )
    }
}

function mapStateToProps(state) {
    const { token, data } = state.currentUser;
    const { clinic, loadingClinic, adminProfile, savingClinic, loadingClinicOpeningHours, clinicOpeningHoursList } = state.clinicReducers;
    const error = state.error;
    return {
        data,
        token,
        clinic,
        adminProfile,
        loadingClinic,
        savingClinic,
        error,
        loadingClinicOpeningHours,
        clinicOpeningHoursList
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
        },
        getClinicOpeningHours: (token, clinicId) => {
            return dispatch(getClinicOpeningHours(token, clinicId))
        },
        deleteClinicOpeningHours: (token, openingHourId) => {
            return dispatch(deleteClinicOpeningHours(token, openingHourId))
        },
        addClinicOpeningHours: (token, clinicId, selectedDays, selectedTimes) => {
            return dispatch(addClinicOpeningHours(token, clinicId, selectedDays, selectedTimes))
        },
        editClinicOpeningHour: (token, openingHourId, selectedTimes) => {
            return dispatch(editClinicOpeningHour(token, openingHourId, selectedTimes))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
