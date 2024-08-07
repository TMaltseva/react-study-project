import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist</p>
      <Link href="/">Go Search</Link>
    </div>
  );
};

export default NotFound;
