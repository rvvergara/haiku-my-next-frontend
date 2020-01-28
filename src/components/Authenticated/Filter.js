import { useState } from 'react';

const Filter = () => {
  const [specialty, setSpecialty] = useState('Any');
  const [insurance, setInsurance] = useState('Any');
  const [experience, setExperience] = useState('Any');
  return (
    <div className="filter">
      <h6>Filter Results</h6>
      <label htmlFor="specialty">Filter by Speciality</label>
      <select
        id='specialty'
        className="filter-select"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
      >
        <option value="any">
          Any
        </option>
        <option value="gastroenterology">
          Gastroenterology
        </option>
        <option value="metabolic-surgery">Metabolic surgery</option>
      </select>
      <label htmlFor="insurance">Insurance Accepted</label>
      <select
        id="insurance"
        className="filter-select"
        value={insurance}
        onChange={(e) => setInsurance(e.target.value)}
      >
        <option value="any">
          Any
        </option>
        <option value="prudential">Prudential</option>
        <option value="aia">AIA</option>
        <option value="aviva">AVIVA</option>
      </select>
      <label htmlFor="experience">Years of Experience</label>
      <select
        id="experience"
        className="filter-select"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      >
        <option value="any">
          Any
        </option>
        <option value="5-10">5-10 years</option>
        <option value="11-15">11-15 years</option>
        <option value="16-20">16-20 years</option>
        <option value="20+">20+ years</option>
      </select>

      <button type="submit" className="filter-button">
        Search
      </button>
    </div>
  );
};

export default Filter;
