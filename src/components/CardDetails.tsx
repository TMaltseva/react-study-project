import { useEffect, useState } from 'react';
import { fetchDetails } from '../services/fetchDetails';

interface Details {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface CardDetailsProps {
  id: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({ id }) => {
  const [details, setDetails] = useState<Details | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailsData = async () => {
      try {
        const data = await fetchDetails(id);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!details) {
    return <p>No details available</p>;
  }

  return (
    <div className="details">
      <h2>{details.name}</h2>
      <p>Height: {details.height}</p>
      <p>Mass: {details.mass}</p>
      <p>Hair Color: {details.hair_color}</p>
      <p>Skin Color: {details.skin_color}</p>
      <p>Eye Color: {details.eye_color}</p>
      <p>Birth Year: {details.birth_year}</p>
      <p>Gender: {details.gender}</p>
    </div>
  );
};

export default CardDetails;
