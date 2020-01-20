const Filter = () => {
  return (
    <div className="filter">
      <h6>Filter Results</h6>
      <label htmlFor="">Filter by Speciality</label>

      <select className="filter-select">
        <option value="any">Any</option>
        <option value="volvo">Gastroenterology</option>
        <option value="saab">Metabolic surgery</option>
      </select>
      <label htmlFor="">Insurance Accepted</label>
      <select className="filter-select">
        <option value="any">Any</option>
        <option value="prudential">Prudential</option>
        <option value="aia">AIA</option>
        <option value="aviva">AVIVA</option>
      </select>
      <label htmlFor="">Years of Experience</label>
      <select className="filter-select">
        <option value="any">Any</option>
        <option value="5-10">5-10 years</option>
        <option value="11-15">11-15 years</option>
        <option value="16-20">16-20 years</option>
        <option value="20+">20+ years</option>
      </select>

      <button type="submit" className="filter-button">Search</button>
    </div>
  );
};

export default Filter;
