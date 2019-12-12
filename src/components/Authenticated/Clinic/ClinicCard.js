import React from 'react';
import Link from 'next/link';

const ClinicCard = ({ clinic }) => {
  const { name, address, postalCode } = clinic;

  return (
    <div className="practitioner-card">
      <div className="profile-image">
        <img
          className="profile-image__avatar"
          src="https://www.asgsurgical.com/img/0062/915.png"
          alt="clinic-profile"
        />
      </div>

      <div className="profile-info-container fixed-width">
        <h2 className="practitioner-name clinic-name">{name}</h2>
        <div className="profile-info-container__info__card">
          <ul className="profile-list grotesque-font">
            <li className="grotesque-font profile-info-container__info__card__content">
              {address}
            </li>
            <li className="grotesque-font profile-info-container__info__card__content">
              {postalCode}
            </li>
          </ul>
        </div>
        <div className="clinic-button-container">
          <Link href="/clinics/[id]" as={`/clinics/${clinic.id}`}>
          <a className="clinic-button" href="/clinics/[id]">See more info</a>
        </Link>
        </div>
      </div>

    </div>
  );
};

export default ClinicCard;
