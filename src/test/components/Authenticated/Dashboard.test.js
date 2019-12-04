import { shallow } from 'enzyme';
import Dashboard from '../../../components/Authenticated/Dashboard';

describe('Dashboard component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<Dashboard />);

    expect(wrapper.exists()).toBe(true);
  });
});
