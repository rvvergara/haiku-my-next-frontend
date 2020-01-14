const Filter = () => {
  return (
    <div className="filter">
      <h1>Filter Results</h1>
      <label htmlFor="">Filter by Speciality</label>
      <select>
        <option value="volvo">Gastroenterology</option>
        <option value="saab">Metabolic surgery</option>
      </select>
      <label htmlFor="">Filter by Insurance Provider</label>
      <select>
        <option value="prudential">Prudential</option>
        <option value="aia">AIA</option>
        <option value="aviva">AVIVA</option>
      </select>
      <submit>Search</submit>
    </div>
  );
};

export default Filter;
