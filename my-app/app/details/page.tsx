'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import DetailsWrapper from '../../components/DetailsWrapper';

const DetailsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  if (!id || typeof id !== 'string') {
    return <p>Invalid ID</p>;
  }

  return <DetailsWrapper id={id} onClose={() => router.push('/')} />;
};

export default DetailsPage;
