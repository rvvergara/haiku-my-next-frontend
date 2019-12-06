import { shallow } from 'enzyme';
import { Sidebar } from '../../../../components/Layouts/Sidebars/Sidebar';
import PractitionerNavLinks from '../../../../components/Layouts/Sidebars/PractitionerNavLinks';
import PatientNavLinks from '../../../../components/Layouts/Sidebars/PatientNavLinks';

describe('Sidebar component', () => {
  test('should render correctly when practitioner role', () => {
    const wrapper = shallow(
      <Sidebar userRole="practitioner" />,
  );
    expect(wrapper.contains(<PractitionerNavLinks />)).toBe(true);
  });

  test('should render correctly when patient role', () => {
    const wrapper = shallow(
      <Sidebar userRole="patient" />,
    );
    expect(wrapper.contains(<PatientNavLinks />)).toBe(true);
  });
});
