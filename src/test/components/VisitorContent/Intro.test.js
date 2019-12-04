import { shallow } from 'enzyme';
import Intro from '../../../components/VisitorContent/Intro';

describe('Intro component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<Intro />);
    expect(wrapper.exists()).toBe(true);
  });
});
