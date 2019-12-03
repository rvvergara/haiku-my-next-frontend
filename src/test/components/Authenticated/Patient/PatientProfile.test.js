import { shallow } from 'enzyme';
import PatientProfile from '../../../../components/Authenticated/Patient/PatientProfile';

describe('PatientProfile component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<PatientProfile />);
    expect(wrapper.exists()).toBe(true);
  });
});
