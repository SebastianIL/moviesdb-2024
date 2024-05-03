// GenrePill.tsx

import React from 'react';
import {IPill } from './types'

const Pill: React.FC<IPill> = ({ genre }) => {
  const genreColors: Record<string, string> = {
    Action: 'bg-red-500',
    Drama: 'bg-blue-500',
    Comedy: 'bg-green-500',
  };

  const genreColor = genreColors[genre] || 'bg-gray-500';

  return (
    <span className={`px-2 py-1 rounded ${genreColor} text-white text-xs`}>
      {genre}
    </span>
  );
};

export default Pill;
