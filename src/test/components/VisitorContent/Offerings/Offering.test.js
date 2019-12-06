import { shallow } from 'enzyme';
import Offering from '../../../../components/VisitorContent/Offerings/Offering';
import offerings from '../../../../content/offering';

describe('Offering component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(
      <Offering offer={offerings[0]} />,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
