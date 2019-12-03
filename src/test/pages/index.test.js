import { shallow } from 'enzyme';
import { IndexPage } from '../../pages/index';
import VisitorContent from '../../components/VisitorContent/VisitorContent';
import Layout from '../../components/Layouts/Layout';

describe('Index page', () => {
  test('should render correctly for visitors', () => {
    const currentUser = {
      authenticated: false,
      data: {},
    };
    const wrapper = shallow(<IndexPage currentUser={currentUser} />);
    expect(wrapper.contains(<VisitorContent />)).toBe(true);
    expect(wrapper.exists()).toBe(true);
  });

  test('should render correctly for logged users', () => {
    const currentUser = {
      authenticated: true,
      data: {
        email: 'john@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
      },
    };
    const wrapper = shallow(
      <IndexPage currentUser={currentUser} />,
      );
    expect(wrapper.contains(
      <Layout title="Home">
        <h1>Igaku App</h1>
      </Layout>,
      )).toBe(true);
  });
});
