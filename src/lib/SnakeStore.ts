import { Cell, Direction } from './Types';
import { observable } from 'mobx';

export default class SnakeStore {
    board: Array<Array<Cell>> = [];
    @observable snake: Array<Cell> = [];
    @observable direction: Direction = Direction.Right;
    @observable isPaused: boolean = false;
    @observable score: number = 0;
    @observable food: Cell;
    intervalId?: NodeJS.Timeout;
    @observable dead: boolean = false;

    constructor(width: number, height: number) {
        this.board = this.getEmptyBoard(width, height);
        this.snake = this.initializeSnake(width, height);
        this.food = this.generateFood();

        this.setMoveLoop();
    }

    private setMoveLoop() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }
        this.intervalId = setInterval(() => {
            this.move();
        }, 500 - (this.score * 50));
    }

    private randomnumber(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    private generateFood(): Cell {
        const x = this.randomnumber(0, this.board.length - 1);
        const y = this.randomnumber(0, this.board[0].length - 1);
        const res = { x, y };
        return res;
    }

    move(): void {
        if (this.isPaused) return;

        const snakeHead = this.snake[0];
        switch (this.direction) {
            case Direction.Right:
                this.snake = [{ ...snakeHead, x: snakeHead.x + 1 }, ...this.snake.slice(0, this.snake.length - 1)];
                break;
            case Direction.Left:
                this.snake = [{ ...snakeHead, x: snakeHead.x - 1 }, ...this.snake.slice(0, this.snake.length - 1)];
                break;
            case Direction.Up:
                this.snake = [{ ...snakeHead, y: snakeHead.y - 1 }, ...this.snake.slice(0, this.snake.length - 1)];
                break;
            case Direction.Down:
                this.snake = [{ ...snakeHead, y: snakeHead.y + 1 }, ...this.snake.slice(0, this.snake.length - 1)];
                break;
        }

        this.checkForFood(this.snake[0], snakeHead);

        this.dead = this.checkForOutOfBounds(this.snake[0]);
    }

    private checkForFood(snakeHead: Cell, priorHead: Cell): void {
        if (snakeHead.x === this.food.x && snakeHead.y === this.food.y) {
            this.score++;
            this.snake = [...this.snake, priorHead];
            this.food = this.generateFood();
            this.setMoveLoop();
        }
    }

    private checkForOutOfBounds(snakeHead: Cell): boolean {
        if (snakeHead.x > this.board[0].length - 1) return true;
        if (snakeHead.x < 0) return true;
        if (snakeHead.y > this.board.length - 1) return true;
        if (snakeHead.y < 0) return true;
        return false;
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
