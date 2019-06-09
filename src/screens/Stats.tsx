import React, { Component } from 'react';
import Timer from './Timer';
import { observer } from 'mobx-react';
import Score from './Score';

interface Props {
  isPaused: boolean;
  score: number;
}

@observer
class Stats extends Component<Props, {}> {
  render() {
    return (
      <div style={{ margin: '20px' }}>
        <Timer pause={this.props.isPaused} />
        <Score score={this.props.score} />
      </div>
    );
  }
}

export default Stats;
