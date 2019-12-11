const PractitionerCard = () => (
  <div className="container">
    <div className="profile-image">
      <img
        className="profile-image__avatar"
        src="https://tinyimg.io/i/LuSvnD3.png"
      />
    </div>
    <div className="container profile-info-container">
      <span>Neurology, Psychology</span>
      <h2>Gil I. Ascunce</h2>
      <h3>Novena Medical Center</h3>
      <div className="profile-info-container__info__card">
        <ul className="profile-list">
          <h4>Education</h4>
          <li>Georgetown University School Of Medicine</li>
        </ul>
      </div>
      <div className="profile-info-container__info__card">
        <h4>Specialialties</h4>
        <ul className="profile-list">
          <li>Gastroenterology</li>
          <li>Internal Medicine</li>
        </ul>
      </div>
    </div>
  </div>
);

export default PractitionerCard;
