import React from 'react';
import './loadingText.css';

const LoadingText = () => (
  <div className="h-[5rem] ">
    {/* <LoadingAnimation /> */}
    <div className="loading-text text-yellow-600  uppercase text-[2rem] mt-4">
      Order creation is in progress...
    </div>
  </div>
);

export default LoadingText;
