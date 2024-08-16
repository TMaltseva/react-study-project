import React from 'react';
import { GetServerSideProps } from 'next';
import CardDetails from '../../components/CardDetails';
import { Person } from '../../services/api';

interface DetailsPageProps {
  details: Person | null;
}

const DetailsPage: React.FC<DetailsPageProps> = ({ details }) => {
  if (!details) {
    return <p>Details not found</p>;
  }

  return (
    <div className="right-section">
      <CardDetails details={details} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  const details = await response.json();

  return {
    props: {
      details: details || null,
    },
  };
};

export default DetailsPage;
