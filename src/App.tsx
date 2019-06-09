import React, { Component } from 'react';
import Snake from './screens/Snake';
import Stats from './screens/Stats';
import SnakeStore from './lib/SnakeStore';
import { observer } from 'mobx-react';

interface State {
  store: SnakeStore;
}

@observer
class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      store: new SnakeStore(30, 30)
    };
  }

  render() {
    return (
      <div id="snake">
        <Stats isPaused={this.state.store.isPaused} score={0} />
        <Snake store={this.state.store} />
      </div>
    );
  }
}

export default App;
