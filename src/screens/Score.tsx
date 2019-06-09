import React from 'react';

const Score = ({ score }) => (
  <span
    style={{
      display: 'inline-block',
      marginTop: '5px',
      padding: '5px',
      backgroundColor: 'green',
      color: 'white'
    }}>
    Score: {score}
  </span>
);

export default Score;
