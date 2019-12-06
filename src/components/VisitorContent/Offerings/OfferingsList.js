import Offering from './Offering';
import offerings from '../../../content/offering';

const OfferingList = () => (
  <div className="offering__list__container">
    <h3 className="offering__list__title">
      What we offer
    </h3>
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
  </div>
);

export default OfferingList;
