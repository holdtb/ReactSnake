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
    const store = this.state.store;
    return (
      <div id="snake">
        <Stats isPaused={store.isPaused} score={store.score} />
        <Snake store={store} />
      </div>
    );
  }
}

export default App;
