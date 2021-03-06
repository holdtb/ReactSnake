import React, { Component } from 'react';
import SnakeStore from '../lib/SnakeStore';
import { Cell, Keys, Direction } from '../lib/Types';
import { observer } from 'mobx-react';
import Death from './Death';
import { ReactComponent as Burger } from '../images/burger.svg';

interface Props {
  store: SnakeStore;
  onRestart: Function;
}

@observer
export default class Snake extends Component<Props, {}> {
  componentDidMount() {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      const store = this.props.store;
      switch (event.keyCode) {
        case Keys.Up:
          store.direction = Direction.Up;
          break;
        case Keys.Down:
          store.direction = Direction.Down;
          break;
        case Keys.Right:
          store.direction = Direction.Right;
          break;
        case Keys.Left:
          store.direction = Direction.Left;
          break;
        case Keys.Space:
          store.isPaused = !store.isPaused;
          break;
      }
    });
  }

  getStyle(cell: Cell): React.CSSProperties {
    const style = {
      display: 'inline-block',
      border: '1px solid',
      overflow: 'hidden',
      fontSize: '9px'
    };

    const head = this.props.store.snake[0];
    const isHead = head.x === cell.x && head.y === cell.y;
    if (isHead) return { ...style, background: 'yellow' };
    if (this.props.store.snake.find(pt => pt.x === cell.x && pt.y === cell.y)) {
      return { ...style, background: 'blue' };
    } else return style;
  }

  getBoard() {
    return this.props.store.board.map(row =>
      row.map(cell => {
        const style = this.getStyle(cell);
        if (this.props.store.food.x === cell.x && this.props.store.food.y === cell.y) {
          return (
            <div key={cell.x + ',' + cell.y} style={style}>
              <Burger />
            </div>
          );
        }
        return <div key={cell.x + ',' + cell.y} style={style} />;
      })
    );
  }

  render() {
    return (
      <div
        id="game"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <div
          id="boardContainer"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <div
            id="board"
            style={{
              width: 600,
              height: 600,
              display: 'grid',
              gridTemplateColumns: `repeat(${this.props.store.width}, 1fr)`,
              gridTemplateRows: `repeat(${this.props.store.height}, 1fr)`,
              gridGap: 0,
              background: 'lightGreen'
            }}>
            {this.getBoard()}
            {this.props.store.dead ? <Death onRestart={this.props.onRestart} /> : null}
          </div>
        </div>
      </div>
    );
  }
}
