import Intro from './Intro';
import About from './About';
import OfferingList from './Offerings/OfferingsList';

const VisitorContent = () => (
  <div className="visitor-content__body">
    <Intro />
    <About />
    <OfferingList />
  </div>
);

export default VisitorContent;
