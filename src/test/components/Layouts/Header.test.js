import { shallow } from 'enzyme';
import { Header } from '../../../components/Layouts/Header';

describe('Header component', () => {
  test('should render correctly', () => {
    const logout = jest.fn();
    const wrapper = shallow(<Header logout={logout} />);

    expect(wrapper.exists()).toBe(true);
  });
});
