import { shallow } from 'enzyme';
import Header from '../../../components/Layouts/Header';

describe('Header component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.exists()).toBe(true);
  });
});
