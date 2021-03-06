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

    it('UP hit into wall wraps to bottom side', () => {
        store = new SnakeStore(4, 4);
        store.snake = [{ x: 3, y: 0 }];
        store.direction = Direction.Up;
        store.move();
        expect(store.dead).toBeFalsy();
        expect(store.snake.slice()).toEqual([{ x: 3, y: 3 }]);
    });

    it('DOWN hit into wall wraps to top side', () => {
        store = new SnakeStore(4, 4);
        store.snake = [{ x: 2, y: 3 }];
        store.direction = Direction.Down;

        store.move();
        expect(store.dead).toBeFalsy();
        expect(store.snake.slice()).toEqual([{ x: 2, y: 0 }]);
    });

    it('LEFT hit into wall wraps to right side', () => {
        store = new SnakeStore(4, 4);
        store.snake = [{ x: 0, y: 1 }];
        store.direction = Direction.Left;

        store.move();
        expect(store.dead).toBeFalsy();
        expect(store.snake.slice()).toEqual([{ x: 3, y: 1 }]);
    });

    it('RIGHT hit into wall wraps to left side', () => {
        store = new SnakeStore(4, 4);
        store.snake = [{ x: 3, y: 2 }];
        store.direction = Direction.Right;

        store.move();
        expect(store.dead).toBeFalsy();
        expect(store.snake.slice()).toEqual([{ x: 0, y: 2 }]);
    });
});

describe('Snake hitting snake', () => {
    it('UP hit into self causes death', () => {
        const store = new SnakeStore(4, 4);
        store.snake = [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }];
        store.direction = Direction.Up;
        store.move();
        expect(store.dead).toBeTruthy();
    });
});

describe('Food', () => {
    let store: SnakeStore;
    beforeEach(() => {
        store = new SnakeStore(4, 4);
        store.food = { x: 1, y: 1 };
        store.snake = [{ x: 2, y: 1 }];
        store.direction = Direction.Left;
    });

    it('Places food at random location', () => {
        expect(store.food).toBeTruthy();
    });

    it('Increments score when eating food', () => {
        store.move();

        expect(store.score).toBe(1);
    });

    it('Adds cell to snake when eating', () => {
        store.move();

        //snake was at 2, 1 so after moving left, he will be at 1, 1
        let expectedSnake: Cell[] = [{ x: 1, y: 1 }, { x: 2, y: 1 }];
        expect(store.snake.slice()).toEqual(expectedSnake);

        store.move();
        expectedSnake = [{ x: 0, y: 1 }, { x: 1, y: 1 }];
        expect(store.snake.slice()).toEqual(expectedSnake);
    });

    it('Generates new food when eating food', () => {
        const startingFood = { x: 1, y: 1 }
        store.food = startingFood;

        store.move();

        expect({ ...store.food }).not.toEqual(startingFood);
    });
});