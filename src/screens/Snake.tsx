import React, { Component } from 'react';
import SnakeStore from '../lib/SnakeStore';
import { Cell, Keys, Direction } from '../lib/Types';
import { observer } from 'mobx-react';
import { pathToFileURL } from 'url';

interface Props {
  store: SnakeStore;
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
    setInterval(() => {
      const alive = this.props.store.move();
      if (!alive) {
        console.log('DEAD');
      }
    }, 700);
  }

  getStyle(cell: Cell) {
    const style = {
      display: 'inline-block',
      border: '1px solid',
      overflow: 'hidden',
      fontSize: '9px'
    };
    if (this.props.store.snake.find(pt => pt.x === cell.x && pt.y === cell.y)) {
      return { ...style, background: 'blue' };
    } else if (this.props.store.food.x === cell.x && this.props.store.food.y === cell.y) {
      return { ...style, background: 'magenta' };
    } else return style;
  }

  getBoard() {
    return this.props.store.board.map(row =>
      row.map(cell => {
        const style = this.getStyle(cell);
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
              gridTemplateColumns: 'repeat(30, 1fr)',
              gridTemplateRows: 'repeat(30, 1fr)',
              gridGap: 0,
              background: 'lightGreen'
            }}>
            {this.getBoard()}
          </div>
        </div>
      </div>
    );
  }
}
