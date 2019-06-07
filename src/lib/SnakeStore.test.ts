import SnakeStore from "./SnakeStore";
import { Direction } from "./Types";

describe('Initialization', () => {
    it('Board has a grid with correct size', () => {
        const store = new SnakeStore(5, 5);

        expect(store.board.length).toBe(5);
        expect(store.board[0].length).toBe(5);
    });

    it('Puts the snake in the middle of the board to start - Odd grid size', () => {
        const store = new SnakeStore(5, 5);
        expect(store.snake).toEqual([{x: 2, y: 2}]);
    });

    it('Puts the snake in the middle of the board to start - Even grid size', () => {
        const store = new SnakeStore(6, 6);
        expect(store.snake).toEqual([{x: 3, y: 3}])
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
        expect(endingPosition.y).toBe(startingPosition.y + 1);
    });

    it('Movement DOWN', () => {
        store.direction = Direction.Down;
        const startingPosition = store.snake[0];
        store.move();

        const endingPosition = store.snake[0];
        expect(endingPosition.x).toBe(startingPosition.x);
        expect(endingPosition.y).toBe(startingPosition.y - 1);
    });
});