import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchDetailsQuery } from '../services/api';
import CardDetails from './CardDetails';

const DetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchDetailsQuery(id!);

  const handleCloseDetails = () => {
    navigate('/');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="right-section">
      <button onClick={handleCloseDetails}>Close</button>
      {data && <CardDetails details={data} />}
    </div>
  );
};

export default DetailsWrapper;
