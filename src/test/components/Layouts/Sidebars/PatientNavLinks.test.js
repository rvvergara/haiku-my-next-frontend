import { shallow } from 'enzyme';
import PatientNavLinks from '../../../../components/Layouts/Sidebars/PatientNavLinks';

describe('PatientNavLinks', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<PatientNavLinks />);
    expect(wrapper.exists()).toBe(true);
  });
});
