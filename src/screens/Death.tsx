import React from 'react';

interface Props {
  onRestart: Function;
}

const Death = (props: Props) => {
  return (
    <div
      style={{
        position: 'absolute',
        opacity: 0.8,
        width: '600px',
        height: '600px',
        backgroundColor: 'lightGreen',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
      }}>
      You died.
      <button onClick={() => props.onRestart()}>Restart</button>
    </div>
  );
};

export default Death;
