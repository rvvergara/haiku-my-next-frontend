import { shallow } from 'enzyme';
import { PatientProfile } from '../../../../components/Authenticated/Patient/PatientProfile';

describe('PatientProfile component', () => {
  test('should render correctly', () => {
    const currentUserData = {
      firstName: 'John',
      lastName: 'Doe',
    };
    const wrapper = shallow(
      <PatientProfile currentUserData={currentUserData} />
);
    expect(wrapper.exists()).toBe(true);
  });
});
