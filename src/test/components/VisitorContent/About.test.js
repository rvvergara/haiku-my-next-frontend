import { shallow } from 'enzyme';
import About from '../../../components/VisitorContent/About';

describe('About component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.exists()).toBe(true);
  });
});
