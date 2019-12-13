import Link from 'next/link';

const PractitionerBox = ({ practitioner }) => {
  const { biography, specialities,id } = practitioner;

  return (
    <div className="practitionerBox-container">
      <p>Dr. Peter Goh Min Yih.</p>
      <p>{specialities}</p>
      <p>{biography.substring(0,100)}</p>
      <Link href="/practitioners/[id]" as={`/practitioners/${id}`}>
          <a className="clinic-button" href="/practitioner/[id]">Read More...</a>
        </Link>
    </div>
  );
};

export default PractitionerBox;
