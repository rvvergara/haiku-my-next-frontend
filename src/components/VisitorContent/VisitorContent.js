import Intro from './Intro';
import About from './About';
import OfferingList from './Offerings/OfferingsList';
import VisitorHeader from './VisitorHeader';

const VisitorContent = () => (
  <div className="visitor-content__body">
    <VisitorHeader />
    <Intro />
    <About />
    <OfferingList />
  </div>
);

export default VisitorContent;
