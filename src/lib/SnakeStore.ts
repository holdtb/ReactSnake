import { Cell, Direction } from './Types';
import { observable } from 'mobx';

export default class SnakeStore {
    board: Array<Array<Cell>> = [];
    @observable snake: Array<Cell> = [];
    @observable direction: Direction = Direction.Right;
    @observable isPaused: boolean = false;
    @observable score: number = 0;
    @observable food: Cell;

    constructor(width: number, height: number) {
        this.board = this.getEmptyBoard(width, height);
        this.snake = this.initializeSnake(width, height);
        this.food = this.generateFood();
    }

    private generateFood(): Cell {
        const x = Math.floor((Math.random() * this.board.length) + 1);
        const y = Math.floor((Math.random() * this.board[0].length) + 1);
        const res = { x, y };
        return res;
    }

    public move(): boolean {
        if (this.isPaused) return true;

        let snakeHead = this.snake[0];
        switch (this.direction) {
            case Direction.Right:
                this.snake[0] = { ...snakeHead, x: snakeHead.x + 1 };
                break;
            case Direction.Left:
                this.snake[0] = { ...snakeHead, x: snakeHead.x - 1 };
                break;
            case Direction.Up:
                this.snake[0] = { ...snakeHead, y: snakeHead.y - 1 };
                break;
            case Direction.Down:
                this.snake[0] = { ...snakeHead, y: snakeHead.y + 1 };
                break;
        }

        this.checkForFood(this.snake[0]);

        return this.checkForOutOfBounds(this.snake[0]);
    }

    private checkForFood(snakeHead: Cell) {
        if (snakeHead.x === this.food.x && snakeHead.y === this.food.y) {
            console.log('Food eaten...');
            this.score++;
            this.food = this.generateFood();
        }
    }

    private checkForOutOfBounds(snakeHead: Cell) {
        if (snakeHead.x > this.board[0].length - 1) return false;
        if (snakeHead.x < 0) return false;
        if (snakeHead.y > this.board.length - 1) return false;
        if (snakeHead.y < 0) return false;
        return true;
    }

    private initializeSnake(width: number, height: number): Cell[] {
        const snake: Cell[] = [];
        const y = Math.floor(height / 2);
        const x = Math.floor(width / 2);
        snake.push({ x, y });
        return snake;
    }

    private getEmptyBoard(width: number, height: number) {
        const board: Array<Array<Cell>> = [];
        for (let i = 0; i < height; i++) {
            const row: Array<Cell> = [];
            for (let j = 0; j < width; j++) {
                row.push({ x: j, y: i });
            }
            board.push(row);
        }
        return board;
    }
}
