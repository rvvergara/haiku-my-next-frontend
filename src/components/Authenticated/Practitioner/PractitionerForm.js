import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createPractitioner,
  updatePractitioner,
} from '../../../store/thunks/practitioner';
import { uploadPic } from '../../../store/thunks/upload';
import MultipleInput from '../ProfileCommon/MultipleInput';
import { setAuthorizationToken } from '../../../utils/api';
import setError from '../../../store/actions/error';

class PractitionerForm extends React.Component {
  state = {
    education: this.props.currentUserData.profile ? this.props.currentUserData.profile.education : [],
    specialties: this.props.currentUserData.profile ? this.props.currentUserData.profile.specialities : [],
    biography: this.props.currentUserData.profile ? this.props.currentUserData.profile.biography : '',
    yearsExp: this.props.currentUserData.profile ? this.props.currentUserData.profile.yearsExp : 0,
    imageText: '',
    imageFile: null
  }

  componentWillUnmount(){
    this.props.setError('');
  }

  handleChange = (key, val) => this.setState(() => ({
    [key]: val
  }));

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
    const { profile } = this.props.currentUserData;

    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    if (profile && profile.image) {
      return profile.image;
    }
    return 'https://tinyimg.io/i/BmtLUPZ.jpg';
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { currentUserData } = this.props;
    const { education, specialties, biography, yearsExp, imageText } = this.state;

    setAuthorizationToken(localStorage.token)
    const { id } = currentUserData;
    const practitionerId = currentUserData.profile
      ? currentUserData.profile.id
      : undefined;

    let imageUrl;

    if (imageText) {
      imageUrl = await this.handleUploadPic();
    }

    const params = {
      education,
      specialities: specialties,
      biography,
      yearsExp,
      userId: id,
      image: imageUrl,
    };
    try {
      if (Router.pathname === '/profile/new') {
        await this.props.createPractitioner(params);
      }
      if (Router.pathname === '/profile/edit') {
        await this.props.updatePractitioner(practitionerId, params);
      }
      setTimeout(() => Router.push('/'), 1000);
      return true;
    } catch (error) {
      return error;
    }
  };

  render() {
    const { biography, education, specialties, yearsExp, imageText } = this.state;
    return (
      <div className="container profile-form-container">
        <div className="form-error">
          {
            this.props.error && <strong>{this.props.error}</strong>
          }
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
            <label className="auth-label" htmlFor="contact-no">
              Education:{' '}
            </label>
            <MultipleInput
              selectedInputs={inputs => this.handleChange('education', inputs)}
              values={education}
              labelId="education"
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="specialties">
              Specialties:{' '}
            </label>
            <MultipleInput
              selectedInputs={inputs => this.handleChange('specialties', inputs)}
              values={specialties}
              labelId="specialties"
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="address">
              Biography:{' '}
            </label>
            <textarea
              rows={5}
              className="user-form__input"
              type="text"
              id="biography"
              onChange={e => this.handleChange('biography', e.target.value)}
              value={biography}
            />
          </div>
          <div className="form-group">
            <label className="auth-label" htmlFor="years-experience">
              Years Experience:{' '}
            </label>
            <input
              className="user-form__input number__input"
              type="number"
              id="years-experience"
              onChange={e => this.handleChange('yearsExp', e.target.value)}
              value={yearsExp}
            />
          </div>
          <div className="form-group profile-form-group">
            <button
              className="user-form__button profile-button"
              type="submit"
              onClick={this.handleSubmit}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    );
  }
}

PractitionerForm.propTypes = {
  createPractitioner: PropTypes.func.isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  updatePractitioner: PropTypes.func.isRequired,
  uploadPic: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUserData: state.currentUser.data,
  error: state.error
});

export default connect(mapStateToProps, {
  createPractitioner,
  setError,
  updatePractitioner,
  uploadPic,
})(PractitionerForm);
