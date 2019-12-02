import { shallow } from 'enzyme';
import IndexPage from '../pages/index';

describe('IndexPage', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<IndexPage />);
    expect(wrapper.exists()).toBe(true);
  });
});
