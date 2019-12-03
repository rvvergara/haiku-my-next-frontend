import { shallow } from 'enzyme';
import IndexPage from '../../pages/index';

describe('Index page', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<IndexPage />);
    expect(wrapper.exists()).toBe(true);
  });
});
