import { shallow } from 'enzyme';
import PractitionerNavLinks from '../../../../components/Layouts/Sidebars/PractitionerNavLinks';

describe('PractitionerNavLinks', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<PractitionerNavLinks />);
    expect(wrapper.exists()).toBe(true);
  });
});
