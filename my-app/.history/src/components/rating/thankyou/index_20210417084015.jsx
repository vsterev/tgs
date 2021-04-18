import React from 'react';
import { useLocation } from 'react-router-dom';

const ThanksPage = () => {
  const location = useLocation();

  return <div>Dear {location.state.name || ''} Thank you for you votting!</div>;
};
export default ThanksPage;
