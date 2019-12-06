import { shallow } from 'enzyme';
import OfferingList from '../../../../components/VisitorContent/Offerings/OfferingsList';

describe('OfferingList component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<OfferingList />);
    expect(wrapper.exists()).toBe(true);
  });
});
