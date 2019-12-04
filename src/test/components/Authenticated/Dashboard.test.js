import { shallow } from 'enzyme';
import { Dashboard } from '../../../components/Authenticated/Dashboard';
import PractitionerProfile from '../../../components/Authenticated/Practitioner/PractitionerProfile';
import PatientProfile from '../../../components/Authenticated/Patient/PatientProfile';

describe('Dashboard component', () => {
  test('should render correctly if practitioner role', () => {
    const wrapper = shallow(<Dashboard userRole="practitioner" />);
    expect(wrapper.contains(<PractitionerProfile />)).toBe(true);
  });

  test('should render correctly if patient role', () => {
    const wrapper = shallow(<Dashboard userRole="patient" />);
    expect(wrapper.contains(<PatientProfile />)).toBe(true);
  });
});
