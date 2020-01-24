const PractitionerList = () => {
  return (
    <>
      <div className="practitionerBox-container">
        <div className="practitionerBox-image-container">
          <img
            className="practitionerBox-image"
            src={image || defaultPic}
            alt="doctor-profile"
          />
        </div>
        <div className="practitionerBox-info">
          <p className="practitioner-name">{`${firstName} ${lastName}`}</p>
          <p className="grotesque-font practitionerBox-specialties">
            {specialties.replace(/[\[\]"]+/g, '')}
          </p>
          <p className="practitionerBox-exp">
            {`${yearsOfExperience} ${t('yearsOfExp')}`}
          </p>
        </div>
        <div>
          <div className="quote">
            <IoMdPricetags className="quote-icon" />
            <p className="quote-value">$50</p>
          </div>
          <Link href="/practitioners/[id]" as={`/practitioners/${id}`}>
            <a className="practitionerBox-button" href="/practitioner/[id]">
              {t('view-doctor-profile')}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

PractitionerList.propTypes = {
  practitioners: PropTypes.instanceOf(Object).isRequired,
  fetchAllPractitioner: PropTypes.func.isRequired,
  listPractitioners: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  practitioners: state.practitioners,
});

export default connect(mapStateToProps, {
  fetchAllPractitioner,
  listPractitioners,
})(PractitionerList);
