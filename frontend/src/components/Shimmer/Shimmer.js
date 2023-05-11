import React from 'react';
import './loader.css';

function Shimmer() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-6 h-6 border-4 border-t-4 rounded-full animate-spin"></div>
    </div>
  );
}

export default Shimmer;