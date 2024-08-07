'use client';

import React from 'react';
import { useFetchDetailsQuery } from '../services/api';
import CardDetails from './CardDetails';

interface DetailsWrapperProps {
  id: string;
  onClose: () => void;
}

const DetailsWrapper: React.FC<DetailsWrapperProps> = ({ id, onClose }) => {
  const { data, isLoading, error } = useFetchDetailsQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading details</p>;
  }

  return (
    <div className="right-section">
      <button onClick={onClose}>Close</button>
      {data && <CardDetails details={data} />}
    </div>
  );
};

export default DetailsWrapper;
