import { shallow } from 'enzyme';
import PractitionerProfile from '../../../../components/Authenticated/Practitioner/PractitionerProfile';

describe('PatientProfile component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<PractitionerProfile />);
    expect(wrapper.exists()).toBe(true);
  });
});
