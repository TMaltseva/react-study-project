'use client';

import React from 'react';
import { useRouter } from 'next/router';
import DetailsWrapper from '../../components/DetailsWrapper';

const DetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return <p>Invalid ID</p>;
  }

  return <DetailsWrapper id={id} onClose={() => router.push('/')} />;
};

export default DetailsPage;
