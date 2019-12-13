import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { createClinic } from '../../../store/thunks/clinic';
import { uploadPic } from '../../../store/thunks/upload';
import { updatePractitioner } from '../../../store/thunks/practitioner';
import { setAuthorizationToken } from '../../../utils/api';
import setError from '../../../store/actions/error';

class ClinicForm extends React.Component {
  state = {
    name: '',
    address: '',
    postalCode: '',
    associated:false,
    currentUser: this.props.currentUserData.profile.id,
    imageText: '',
    imageFile: null
  };

  componentWillUnmount(){
    this.props.setError('');
  }

  handleChange = (key, val) => {
    this.setState(() => ({
      [key]: val,
    }));
  };

  handleAssociated = () => {
    this.setState((prevState) => ({
      associated:!prevState.associated
    }))
  }

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
    setAuthorizationToken(localStorage.token);
    e.preventDefault();
    const { currentUserData } = this.props;
    const profileId = this.props.currentUserData.profile.id
    const {name, address, postalCode, imageText } = this.state;

    let imageUrl;
    if(imageText){
      imageUrl = await this.handleUploadPic();
    }

    const params = { name, address, postalCode, image: imageUrl };
    const clinic = await this.props.createClinic(params);
    if(clinic && this.state.associated){
      await this.props.updatePractitioner(profileId, {clinicId: clinic.id, userId: currentUserData.id})
    }
    if(clinic){
      Router.push('/clinics');
    }
  };

  render() {
    const {
      name,
      address,
      postalCode,
      associated,
      imageText
    } = this.state;
    return (
      <div className="container profile-form-container">
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
              type="text"
              onChange={e => this.handleChange('postalCode', e.target.value)}
              value={postalCode}
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
}

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
  clinic: state.displayedClinic
});

export default connect(mapStateToProps, { 
  createClinic, 
  updatePractitioner,
  uploadPic,
  setError
})(ClinicForm);
