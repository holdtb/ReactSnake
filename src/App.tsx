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
      store: new SnakeStore(20, 20)
    };
    this.handleRestart = this.handleRestart.bind(this);
  }

  handleRestart() {
    this.setState({
      store: new SnakeStore(20, 20)
    });
  }

  render() {
    const store = this.state.store;
    return (
      <div id="snake">
        <Stats isPaused={store.isPaused} score={store.score} />
        <Snake store={store} onRestart={this.handleRestart} />
      </div>
    );
  }
}

export default App;
