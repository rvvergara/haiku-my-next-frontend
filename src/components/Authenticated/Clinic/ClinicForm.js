import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setClinic } from '../../../store/actions/clinic';
import setError from '../../../store/actions/error';
import { changeClinic, createClinic } from '../../../store/thunks/clinic';
import { updatePractitioner } from '../../../store/thunks/practitioner';
import { uploadPic } from '../../../store/thunks/upload';
import { setAuthorizationToken } from '../../../utils/api';

class ClinicForm extends React.Component {
  state = {
    name: this.props.clinic.name || '',
    address: this.props.clinic.address || '',
    postalCode: this.props.clinic.postalCode || '',
    associated:
      this.props.clinic !== {} && this.props.currentUserData.profile.clinicId
        ? true
        : false,
    imageText: '',
    imageFile: null,
    category: '',
    openingHours: '',
  };

  componentWillUnmount() {
    this.props.setError('');
    this.props.setClinic({});
  }

  handleChange = (key, val) => {
    this.setState(() => ({
      [key]: val,
    }));
  };

  handleAssociated = () => {
    this.setState(prevState => ({
      associated: !prevState.associated,
    }));
  };

  handleUploadPic = async () => {
    const { currentUserData } = this.props;
    const { imageFile } = this.state;
    const { id } = currentUserData;
    const formData = new FormData();
    formData.append('files', imageFile);
    formData.append('userId', id);
    const res = await this.props.uploadPic(formData);
    return res;
  };

  imgPreviewUrl = () => {
    const { imageFile } = this.state;
    const { clinic } = this.props;

    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    if (clinic && clinic.image) {
      return clinic.image;
    }
    return 'https://tinyimg.io/i/BmtLUPZ.jpg';
  };

  handleSubmit = async e => {
    e.preventDefault();
    setAuthorizationToken(localStorage.token);
    const {
      currentUserData,
      createClinic,
      updatePractitioner,
      changeClinic,
    } = this.props;
    const profileId = currentUserData.profile.id;
    const {
      name,
      address,
      postalCode,
      imageText,
      category,
      openingHours,
    } = this.state;

    let imageUrl;
    if (imageText) {
      imageUrl = await this.handleUploadPic();
    }

    const params = {
      name,
      address,
      postalCode,
      image: imageUrl,
      category,
      practitionerId:profileId,
      openingHours,
    };

    let clinic;
    try {
      if (Router.pathname === '/clinics/new') {
        clinic = await createClinic(params);
      } else {
        clinic = await this.props.changeClinic(this.props.clinic.id, params);
      }
    } catch (err) {
      return err;
    }

    if (clinic && this.state.associated) {
      await updatePractitioner(profileId, {
        clinicId: clinic.id,
        userId: currentUserData.id,
      });
    }
    if (clinic) {
      Router.push('/clinics');
    }
  };

  render() {
    const {
      name,
      address,
      postalCode,
      associated,
      imageText,
      category,
      openingHours
    } = this.state;

    return (
      <div className="container profile-form-container">
        <div className="form-error">
          {this.props.error && <strong>{this.props.error}</strong>}
        </div>
        <form className="user-form profile-form">
          <div className="form-group">
            <div className="image-preview">
              <img
                src={this.imgPreviewUrl()}
                alt="Patient"
                className="profile-avatar__img"
              />
            </div>
            <label className="auth-label" htmlFor="profile-pic">
              Profile Pic:{' '}
            </label>
            <input
              type="file"
              id="profile-pic"
              onChange={e => {
                this.handleChange('imageText', e.target.value);
                this.handleChange('imageFile', e.target.files[0]);
              }}
              value={imageText}
            />
          </div>
          <div className="form-group">
            <label htmlFor="clinic-name" className="auth-label">
              Name
            </label>
            <input
              id="clinic-name"
              className="user-form__input"
              type="text"
              onChange={e => this.handleChange('name', e.target.value)}
              value={name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinic-address" className="auth-label">
              Address
            </label>
            <input
              className="user-form__input"
              id="clinic-address"
              type="text"
              onChange={e => this.handleChange('address', e.target.value)}
              value={address}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinic-postal-code" className="auth-label">
              Postal Code
            </label>
            <input
              id="clinic-postal-code"
              className="user-form__input"
              type="number"
              onChange={e => this.handleChange('postalCode', e.target.value)}
              value={postalCode}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="auth-label">
              category
            </label>
            <input
              id="category"
              className="user-form__input"
              type="text"
              onChange={e => this.handleChange('category', e.target.value)}
              value={category}
            />
          </div>

          <div className="form-group">
            <label htmlFor="openingHours" className="auth-label">
              Opening Hours
            </label>
            <input
              id="openingHours"
              className="user-form__input"
              type="text"
              onChange={e => this.handleChange('openingHours', e.target.value)}
              value={openingHours}
            />
          </div>

          <div className="form-group">
            <label htmlFor="associated" className="auth-label">
              Do i work here?
            </label>
            <input
              id="associated"
              type="checkbox"
              checked={associated}
              onChange={this.handleAssociated}
              className="checkbox-round"
            />
          </div>

          <div className="form-group">
            <button className="user-form__button" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ClinicForm.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  createClinic: PropTypes.func.isRequired,
  updatePractitioner: PropTypes.func.isRequired,
  uploadPic: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  changeClinic: PropTypes.func.isRequired,
  setClinic: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
  clinic: state.displayedClinic,
  error: state.error,
});

export default connect(mapStateToProps, {
  createClinic,
  changeClinic,
  updatePractitioner,
  uploadPic,
  setClinic,
  setError,
})(ClinicForm);
