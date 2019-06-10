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

    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

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
        }, 500 - ((this.score / 3) * 50));
    }

    private randomnumber(minimum: number, maximum: number): number {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    }

    private generateFood(): Cell {
        const x = this.randomnumber(0, this.width - 1);
        const y = this.randomnumber(0, this.height - 1);
        const res = { x, y };
        return res;
    }

    move(): void {
        if (this.isPaused) return;

        const snakeHead = this.snake[0];
        this.moveSnake(snakeHead);
        this.checkForFood(this.snake[0], snakeHead);
        this.checkForCrash();
    }

    private checkForCrash() {
        const snakeHead = this.snake[0];
        if (this.snake.find((cell, idx) => idx != 0 && cell.x === snakeHead.x && cell.y === snakeHead.y)) {
            this.dead = true;
            this.isPaused = true;
        }
    }

    private moveSnake(snakeHead: Cell) {
        const chopTail = (snake: Array<Cell>) => snake.slice(0, snake.length - 1);
        switch (this.direction) {
            case Direction.Right:
                if (snakeHead.x + 1 === this.width)
                    this.snake = [{ ...snakeHead, x: 0 }, ...chopTail(this.snake)];
                else
                    this.snake = [{ ...snakeHead, x: snakeHead.x + 1 }, ...chopTail(this.snake)];
                break;
            case Direction.Left:
                if (snakeHead.x === 0)
                    this.snake = [{ ...snakeHead, x: this.width - 1 }, ...chopTail(this.snake)];
                else
                    this.snake = [{ ...snakeHead, x: snakeHead.x - 1 }, ...chopTail(this.snake)];
                break;
            case Direction.Up:
                if (snakeHead.y === 0)
                    this.snake = [{ ...snakeHead, y: this.height - 1 }, ...chopTail(this.snake)];
                else
                    this.snake = [{ ...snakeHead, y: snakeHead.y - 1 }, ...chopTail(this.snake)];
                break;
            case Direction.Down:
                if (snakeHead.y + 1 === this.height)
                    this.snake = [{ ...snakeHead, y: 0 }, ...chopTail(this.snake)];
                else
                    this.snake = [{ ...snakeHead, y: snakeHead.y + 1 }, ...chopTail(this.snake)];
                break;
        }
    }

    private checkForFood(snakeHead: Cell, priorHead: Cell): void {
        if (snakeHead.x === this.food.x && snakeHead.y === this.food.y) {
            this.score++;
            this.snake = [...this.snake, priorHead];
            this.food = this.generateFood();
            this.setMoveLoop();
        }
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
