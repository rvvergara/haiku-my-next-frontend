import Router from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createPractitioner,
  updatePractitioner
} from '../../../store/thunks/practitioner';
import { uploadPic } from '../../../store/thunks/upload';
import MultipleInput from '../ProfileCommon/MultipleInput';
import { setAuthorizationToken } from '../../../utils/api';
import setError from '../../../store/actions/error';
import { setAlert } from '../../../store/actions/alerts';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class PractitionerForm extends React.Component {
  state = {
    firstName: this.props.currentUserData.practitioner
      ? this.props.currentUserData.practitioner.firstName
      : '',
    lastName: this.props.currentUserData.practitioner
      ? this.props.currentUserData.practitioner.lastName
      : '',
    education: this.props.currentUserData.practitioner
      ? JSON.parse(this.props.currentUserData.practitioner.education)
      : [],
    specialties: this.props.currentUserData.practitioner
      ? JSON.parse(this.props.currentUserData.practitioner.specialties)
      : [],
    biography: this.props.currentUserData.practitioner
      ? this.props.currentUserData.practitioner.biography
      : '',
    yearsOfExperience: this.props.currentUserData.practitioner
      ? this.props.currentUserData.practitioner.yearsOfExperience
      : 0,
    imageText: '',
    referralCode: this.props.currentUserData.referralCode,
    imageFile: null
  };

  componentWillUnmount() {
    this.props.setError('');
  }

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val
    }));

  imgPreviewUrl = () => {
    const { imageFile } = this.state;
    const { practitioner } = this.props.currentUserData;

    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    if (practitioner && practitioner.image) {
      return practitioner.image;
    }
    return 'https://i.imgur.com/GJxJnJ1.png';
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { currentUserData } = this.props;
    const {
      firstName,
      lastName,
      education,
      specialties,
      biography,
      yearsOfExperience,
      imageFile,
    } = this.state;

    setAuthorizationToken(localStorage.token);
    const { id } = currentUserData;
    const practitionerId = currentUserData.practitioner
      ? currentUserData.practitioner.id
      : undefined;

    const params = {
      firstName,
      lastName,
      education: JSON.stringify(education),
      specialties: JSON.stringify(specialties),
      biography,
      yearsOfExperience,
      userId: id,
      files: imageFile
    };

    const formData = new FormData();

    for (let key in params) {
      formData.append(key, params[key]);
    }
    try {
      if (Router.pathname === '/profile/new') {
        await this.props.createPractitioner(formData);
        this.props.setAlert('Profile Created', 'success');
      }
      if (Router.pathname === '/profile/edit') {
        await this.props.updatePractitioner(practitionerId, formData);
        this.props.setAlert('Profile updated', 'success');
      }
      setTimeout(() => Router.push('/'), 1000);
      return true;
    } catch (error) {
      return error;
    }
  };

  render() {
    const {
      firstName,
      lastName,
      biography,
      education,
      specialties,
      yearsOfExperience,
      imageText,
      referralCode
    } = this.state;
    return (
      <div className='container profile-form-container'>
        <form className='user-form profile-form'>
          <div className='form-group'>
            <div className='image-preview'>
              <img
                src={this.imgPreviewUrl()}
                alt='Patient'
                className='practitionerForm-image'
              />
            </div>
            <label className='auth-label' htmlFor='profile-pic'>
              Profile Pic:{' '}
            </label>
            <input
              type='file'
              id='profile-pic'
              onChange={e => {
                this.handleChange('imageText', e.target.value);
                this.handleChange('imageFile', e.target.files[0]);
              }}
              value={imageText}
            />
          </div>

          <div className="form-group">
            <label className="auth-label" htmlFor="first-name">
              Referral Code:{' '}
            </label>

            <div>{referralCode}</div>
            <CopyToClipboard text={referralCode}>
              <p className="copy-clipboard">Copy to clipboard</p>
            </CopyToClipboard>
          </div>


          <div className='form-group'>
            <label className='auth-label' htmlFor='first-name'>
              First Name:{' '}
            </label>
            <input
              className='user-form__input number__input'
              type='text'
              id='first-name'
              onChange={e => this.handleChange('firstName', e.target.value)}
              value={firstName}
            />
          </div>
          <div className='form-group'>
            <label className='auth-label' htmlFor='last-name'>
              Last Name:{' '}
            </label>
            <input
              className='user-form__input number__input'
              type='text'
              id='last-name'
              onChange={e => this.handleChange('lastName', e.target.value)}
              value={lastName}
            />
          </div>
          <div className='form-group'>
            <label className='auth-label' htmlFor='education'>
              Education:{' '}
            </label>
            <MultipleInput
              selectedInputs={inputs => this.handleChange('education', inputs)}
              values={education}
              labelId='education'
            />
          </div>
          <div className='form-group'>
            <label className='auth-label' htmlFor='specialties'>
              Specialties:{' '}
            </label>
            <MultipleInput
              selectedInputs={inputs =>
                this.handleChange('specialties', inputs)
              }
              values={specialties}
              labelId='specialties'
            />
          </div>
          <div className='form-group'>
            <label className='auth-label' htmlFor='address'>
              Biography:{' '}
            </label>
            <textarea
              rows={5}
              className='user-form__input'
              type='text'
              id='biography'
              onChange={e => this.handleChange('biography', e.target.value)}
              value={biography}
            />
          </div>
          <div className='form-group'>
            <label className='auth-label' htmlFor='years-experience'>
              Years Experience:{' '}
            </label>
            <input
              className='user-form__input number__input'
              type='number'
              id='years-experience'
              onChange={e =>
                this.handleChange('yearsOfExperience', e.target.value)
              }
              value={yearsOfExperience}
            />
          </div>
          <div className='form-group profile-form-group'>
            <button
              className='PractitionerForm-button'
              type='submit'
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
  uploadPic: PropTypes.func.isRequired
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
  setAlert
})(PractitionerForm);
