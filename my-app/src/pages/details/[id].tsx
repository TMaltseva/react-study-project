import React from 'react';
import { useRouter } from 'next/router';
import { useFetchDetailsQuery } from '../../services/api';
import CardDetails from '../../components/CardDetails';

const DetailsWrapper: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useFetchDetailsQuery(id as string);

  const handleCloseDetails = () => {
    router.push({
      pathname: '/',
      query: router.query,
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading details</p>;
  }

  return (
    <div className="right-section">
      <button onClick={handleCloseDetails}>Close</button>
      {data && <CardDetails details={data} />}
    </div>
  );
};

export default DetailsWrapper;
