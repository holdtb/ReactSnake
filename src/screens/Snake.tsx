import React, { Component } from 'react';
import SnakeStore from '../lib/SnakeStore';

interface State {
    store: SnakeStore;
}

export default class Snake extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            store: new SnakeStore(30, 30)
        };
    }

    getBoard() {
        return this.state.store.board.map(row => {
            return row.map(col => {
                return (
                    <div
                        key={col.x + ',' + col.y}
                        style={{
                            display: 'inline-block',
                            border: '1px solid',
                            overflow: 'hidden'
                        }}>
                    </div>
                );
            });
        });
    }

    render() {
        return (
            <div
                id='game'
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <div
                    id='boardContainer'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <div
                        id='board'
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
