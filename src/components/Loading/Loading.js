import React from 'react';

const Loading = ({ loaded, children }) => {
  if (loaded) return <h1>Loading...</h1>;
  return children || <></>;
};

export default Loading;
