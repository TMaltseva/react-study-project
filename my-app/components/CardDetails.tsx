'use client';

import React from 'react';

interface Details {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface CardDetailsProps {
  details: Details;
}

const CardDetails: React.FC<CardDetailsProps> = ({ details }) => {
  return (
    <div className="details">
      <h2>{details.name}</h2>
      <p>Height: {details.height}</p>
      <p>Mass: {details.mass}</p>
      <p>Hair Color: {details.hair_color}</p>
      <p>Skin Color: {details.skin_color}</p>
      <p>Eye Color: {details.eye_color}</p>
      <p>Birth Year: {details.birth_year}</p>
      <p>Gender: {details.gender}</p>
    </div>
  );
};

export default CardDetails;
