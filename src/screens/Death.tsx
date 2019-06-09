import React from 'react';

interface Props {
  onRestart: Function;
}

const Death = (props: Props) => {
  return (
    <div
      style={{
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
