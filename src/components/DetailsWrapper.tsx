import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CardDetails from './CardDetails';

const DetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleCloseDetails = () => {
    navigate('/');
  };

  return (
    <div className="right-section">
      <button onClick={handleCloseDetails}>Close</button>
      {id && <CardDetails id={id} />}
    </div>
  );
};

export default DetailsWrapper;
