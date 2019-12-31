const PatientCard = ({ patient }) => (
  <div>
    <img src={patient.image} width='100' />
    <p>{`${patient.firstName} ${patient.lastName}`}</p>
  </div>
);

export default PatientCard;
