import SnakeStore from "./SnakeStore";
import { Direction, Cell } from "./Types";


describe('Initialization', () => {
    it('Board has a grid with correct size', () => {
        const store = new SnakeStore(5, 5);

        expect(store.board.length).toBe(5);
        expect(store.board[0].length).toBe(5);
    });

    it('Has a score of zero', () => {
        const store = new SnakeStore(5, 5);

        expect(store.score).toBe(0);
    });

    it('Puts the snake in the middle of the board to start - Odd grid size', () => {
        const store = new SnakeStore(5, 5);
        const expected: Cell[] = [{ x: 2, y: 2 }];
        expect(store.snake.slice()).toEqual(expected);
    });

    it('Puts the snake in the middle of the board to start - Even grid size', () => {
        const store = new SnakeStore(6, 6);
        expect(store.snake.slice()).toEqual([{ x: 3, y: 3 }])
    });

    it('Game is paused then move is ignored', () => {
        const store = new SnakeStore(5, 5);
        store.isPaused = true;
        const startingPosition = store.snake.slice();
        store.move();
        expect(store.snake.slice()).toEqual(startingPosition);
    });
});

describe('Basic Movement', () => {
    let store: SnakeStore;
    beforeEach(() => {
        store = new SnakeStore(5, 5);
    });

    it('Faces to the RIGHT to start', () => {
        expect(store.direction).toBe(Direction.Right);
    });

    it('Movement RIGHT', () => {
        store.direction = Direction.Right;
        const startingPosition = store.snake[0];
        store.move();

        const endingPosition = store.snake[0];
        expect(endingPosition.x).toBe(startingPosition.x + 1);
        expect(endingPosition.y).toBe(startingPosition.y);
    });

    it('Movement LEFT', () => {
        store.direction = Direction.Left;
        const startingPosition = store.snake[0];
        store.move();

        const endingPosition = store.snake[0];
        expect(endingPosition.x).toBe(startingPosition.x - 1);
        expect(endingPosition.y).toBe(startingPosition.y);
    });

    it('Movement UP', () => {
        store.direction = Direction.Up;
        const startingPosition = store.snake[0];
        store.move();

        const endingPosition = store.snake[0];
        expect(endingPosition.x).toBe(startingPosition.x);
        expect(endingPosition.y).toBe(startingPosition.y - 1);
    });

    it('Movement DOWN', () => {
        store.direction = Direction.Down;
        const startingPosition = store.snake[0];
        store.move();

        const endingPosition = store.snake[0];
        expect(endingPosition.x).toBe(startingPosition.x);
        expect(endingPosition.y).toBe(startingPosition.y + 1);
    });
});

describe('Edge detection', () => {
    let store: SnakeStore;

    it('Detects UP hit into wall', () => {
        store = new SnakeStore(4, 4);
        store.snake = [{ x: 3, y: 0 }];
        store.direction = Direction.Up;
        const alive = store.move();
        expect(alive).toBeFalsy();
    });

    it('Detects DOWN hit into wall', () => {
        store = new SnakeStore(4, 4);
        store.snake = [{ x: 2, y: 3 }];
        store.direction = Direction.Down;

        const alive = store.move();
        expect(alive).toBeFalsy();
    });

    it('Detects LEFT hit into wall', () => {
        store = new SnakeStore(4, 4);
        store.snake = [{ x: 0, y: 1 }];
        store.direction = Direction.Left;

        const alive = store.move();
        expect(alive).toBeFalsy();
    });

    it('Detects RIGHT hit into wall', () => {
        store = new SnakeStore(4, 4);
        store.snake = [{ x: 3, y: 2 }];
        store.direction = Direction.Right;

        const alive = store.move();
        expect(alive).toBeFalsy();
    });
});