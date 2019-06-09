import React, { Component } from 'react';
import { observer } from 'mobx-react';

interface Props {
  score: number;
}

@observer
export default class Score extends Component<Props, {}> {
  render() {
    return (
      <span
        style={{
          display: 'inline-block',
          marginTop: '5px',
          padding: '5px',
          backgroundColor: 'green',
          color: 'white'
        }}>
        Score: {this.props.score}
      </span>
    );
  }
}
