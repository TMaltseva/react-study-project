import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useFetchDetailsQuery } from '../services/api';
import CardDetails from './CardDetails';

const DetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useFetchDetailsQuery(id!);

  const handleCloseDetails = () => {
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading details</p>;
  }

  console.log('Fetched data:', data);

  return (
    <div className="right-section">
      <button onClick={handleCloseDetails}>Close</button>
      {data && <CardDetails details={data} />}
    </div>
  );
};

export default DetailsWrapper;
