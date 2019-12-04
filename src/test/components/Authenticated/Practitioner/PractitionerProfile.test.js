import { shallow } from 'enzyme';
import { PractitionerProfile } from '../../../../components/Authenticated/Practitioner/PractitionerProfile';

describe('PatientProfile component', () => {
  test('should render correctly', () => {
    const currentUserData = {
      firstName: 'John',
      lastName: 'Doe',
    };
    const wrapper = shallow(
      <PractitionerProfile currentUserData={currentUserData} />,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
