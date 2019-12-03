import Offering from './Offering';
import offerings from '../../../content/offering';

const OfferingList = () => (
  <div className="offering__list">
    {
      offerings.map((offer) => (
        <Offering
          key={offer.title}
          offer={offer}
        />
      ))
    }
  </div>
);

export default OfferingList;
