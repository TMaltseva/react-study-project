import React, { useState } from 'react';

const ThrowErrorButton: React.FC = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error('Test error from ThrowErrorButton');
  }

  return (
    <button className="throw-error-btn" onClick={() => setThrowError(true)}>
      Throw Error
    </button>
  );
};

export default ThrowErrorButton;
