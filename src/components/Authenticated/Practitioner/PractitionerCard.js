
const PractitionerCard = () => (
  <div className="flex practioner-card">
    <div className="profile-image">
      <img
        className="profile-image__avatar"
        src="https://img.webmd.com/lhd/provider_prod/97441b13-4055-4aee-84de-5d5670680a99.jpg?resize=150px:*"
        alt="doctor-profile"
      />
    </div>

    <div className="profile-info-container">
      <span className="specialties">Neurology, Psychology</span>
      <h2 className="practitioner-name">Gil I. Ascunce</h2>
      <h3 className="clinic">Novena Medical Center</h3>
      <div className="profile-info-container__info__card">
        <ul className="profile-list grotesque-font">
          <h4 className="grotesque-font">Education</h4>
          <li className="grotesque-font">Georgetown University School Of Medicine</li>
        </ul>
      </div>
      <div className="profile-info-container__info__card">
        <h4 className="grotesque-font">Specialialties</h4>
        <ul className="profile-list grotesque-font">
          <li className="grotesque-font">Gastroenterology</li>
          <li className="grotesque-font">Internal Medicine</li>
        </ul>
      </div>
    </div>
  </div>
);

export default PractitionerCard;






