import PropTypes from 'prop-types';

const Offering = ({ offer }) => (
  <div className="offering">
    <div className="offering__avatar">
      <img
        src={offer.image}
        alt={offer.title}
        className="offering__avatar__image"
      />
    </div>
    <div className="offering__content">
      <h3 className="offering__title">
        { offer.title }
      </h3>
      <p className="offering__text">
        { offer.text }
      </p>
    </div>
  </div>
);

Offering.propTypes = {
  offer: PropTypes.instanceOf(Object).isRequired,
};

export default Offering;
