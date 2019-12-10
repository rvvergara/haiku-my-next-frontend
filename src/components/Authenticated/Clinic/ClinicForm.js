import { connect } from 'react-redux';
import { createClinic } from '../../../store/thunks/clinic';

class ClinicForm extends React.Component {
  state = {
    name: '',
    address: '',
    postalCode: '',
  };

  handleChange = (key, val) => {
    this.setState(() => ({
      [key]: val,
    }));
  };

  handleSubmit = async e =>{
    e.preventDefault()
    await this.props.createClinic(this.state)
    console.log('Form Submitted');
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <input
              type="text"
              placeholder="name"
              onChange={e => this.handleChange('name', e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="address"
              onChange={e => this.handleChange('address', e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="postalCode"
              onChange={e => this.handleChange('postalCode', e.target.value)}
            />
          </div>

          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}



export default connect(null, { createClinic })(ClinicForm);
