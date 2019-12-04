import { shallow } from 'enzyme';
import VisitorContent from '../../../components/VisitorContent/VisitorContent';

describe('VisitorContent component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<VisitorContent />);
    expect(wrapper.exists()).toBe(true);
  });
});
