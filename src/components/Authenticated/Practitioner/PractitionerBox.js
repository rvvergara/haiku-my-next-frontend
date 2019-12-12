

const PractitionerBox = ({ practitioner }) => {
  const { biography, education, specialities } = practitioner;

  return (
    <div>
      <h1>{biography}</h1>
      <p>{education[0]}</p>
      <p>{specialities}</p>
    </div>
  );
};

export default PractitionerBox;
