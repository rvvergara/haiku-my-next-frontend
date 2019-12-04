import { shallow } from 'enzyme';
import Sidebar from '../../../../components/Layouts/Sidebars/Sidebar';

describe('Sidebar component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<Sidebar />);

    expect(wrapper.exists()).toBe(true);
  });
});
