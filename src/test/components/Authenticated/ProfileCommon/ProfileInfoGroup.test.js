import { shallow } from 'enzyme';
import ProfileInfoGroup from '../../../../components/Authenticated/ProfileCommon/ProfileInfoGroup';

describe('ProfileInfoGroup component', () => {
  test('should render correctly', () => {
    const wrapper = shallow(
      <ProfileInfoGroup
        infoKey="Name"
        val="John Doe"
      />,
    );
    expect(wrapper.exists()).toBe(true);
  });
});
