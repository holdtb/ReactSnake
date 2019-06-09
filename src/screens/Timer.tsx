import React from 'react';
const { useEffect, useState, useRef } = React;

const useInterval = (callback: Function, delay: number | undefined) => {
  const savedCallback: any = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export const Timer = ({ pause }) => {
  const [hour, setHours] = useState(0);
  const [minute, setMinutes] = useState(0);
  const [second, setSeconds] = useState(0);

  const toTime = (time: React.ReactText) => ('0' + time).slice(-2);

  let resetRef = useRef(false);

  useEffect(() => {
    if (resetRef.current === true) {
      setSeconds(0);
    }
  }, []);

  useInterval(
    () => {
      if (pause) {
        //resetRef.current = true;
        return;
      }
      resetRef.current = false;
      setSeconds(second + 1);
    },
    pause ? undefined : 1000
  );

  useInterval(
    () => {
      if (pause) {
        //resetRef.current = true;
        return;
      }
      resetRef.current = false;
      setSeconds(0);
      setMinutes(minute + 1);
    },
    pause ? undefined : 1000 * 60
  );

  useInterval(
    () => {
      if (pause) {
        //resetRef.current = true;
        return;
      }
      setSeconds(0);
      setMinutes(0);
      setHours(hour + 1);
    },
    pause ? undefined : 1000 * 60 * 60
  );

  return (
    <div
      style={{
        width: '140px',
        backgroundColor: pause ? 'red' : '#33C4FF',
        display: 'flex',
        color: 'white'
      }}>
      <span style={timerSpanStyle}>TIME:</span> <span style={timerSpanStyle}>{toTime(hour)}:</span>
      <span style={timerSpanStyle}>{toTime(minute)}:</span>
      <span style={timerSpanStyle}>{toTime(second)}</span>
    </div>
  );
};

const timerSpanStyle = {
  padding: '4px'
};

export default Timer;
