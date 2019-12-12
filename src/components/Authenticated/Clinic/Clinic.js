import React from 'react';

const Clinic = ({ clinic }) => {
  const { name, address, postalCode } = clinic;

  return (
    <div className="clinic">
      <p>{name}</p>
      <p>{address}</p>
      <p>{postalCode}</p>
      <button>Book</button>
    </div>
  );
};

export default Clinic;
