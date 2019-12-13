
const PractitionerCard = () => (
  <div className="practitioner-card">
    <div className="profile-image">
      <img
        className="profile-image__avatar"
        src="https://images1-fabric.practo.com/dr-goh-min-yih-peter-1454317839-56af210f55ab0.jpg/thumbnail"
        alt="doctor-profile"
      />
    </div>

    <div className="profile-info-container">
      <span className="specialties">Neurology, Psychology</span>
      <h2 className="practitioner-name">Dr. Peter Goh Min Yih.</h2>
      <h3 className="clinic">Advanced Surgical Group</h3>
      <div className="profile-info-container__info__card">
        <h4 className="grotesque-font profile-info-container__info__card__title">Education</h4>
        <ul className="profile-list grotesque-font">
          <li className="grotesque profile-info-container__info__card__content">MBBS - NUS-Singapore, 1980</li>
          <li className="grotesque profile-info-container__info__card__content">FRCS - General Surgery - Royal College of Surgeons of Edinburgh (RCSE), U.K, 1984 </li>
          <li className="grotesque profile-info-container__info__card__content">M M Med (Gen Surg) - NUS-Singapore, 1985</li>
        </ul>
      </div>
      <div className="profile-info-container__info__card">
        <h4 className="grotesque-font profile-info-container__info__card__title">Specialialties</h4>
        <ul className="profile-list grotesque-font">
          <li className="grotesque-font profile-info-container__info__card__content">Gastroenterology</li>
          <li className="grotesque-font profile-info-container__info__card__content">Internal Medicine</li>
        </ul>
      </div>
    </div>
  </div>
);

export default PractitionerCard;
