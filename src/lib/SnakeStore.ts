export default class SnakeStore {
    board: Array<Array<Cell>> = [];
    snake: Array<Cell> = [];
    direction: Direction = Direction.Right;

    constructor(width: number, height: number) {
        this.initializeBoard(width, height);
        this.snake = this.initializeSnake(width, height);
    }

    public move(): void {
        const snakeHead = this.snake[0];
        switch (this.direction) {
            case Direction.Right:
                this.snake[0] = { ...snakeHead, x: snakeHead.x + 1 };
                break;
            case Direction.Left:
                this.snake[0] = { ...snakeHead, x: snakeHead.x - 1 };
                break;
            case Direction.Up:
                this.snake[0] = { ...snakeHead, y: snakeHead.y + 1 };
                break;
            case Direction.Down:
                this.snake[0] = { ...snakeHead, y: snakeHead.y - 1 };
                break;
        }
    }

    private initializeSnake(width: number, height: number): Cell[] {
        const snake: Cell[] = [];
        const y = Math.floor(height / 2);
        const x = Math.floor(width / 2);
        snake.push({ x, y });
        return snake;
    }

    private initializeBoard(width: number, height: number) {
        for (let i = 0; i < width; i++) {
            const row: Array<Cell> = [];
            for (let j = 0; j < height; j++) {
                row.push({ x: i, y: j });
            }
            this.board.push(row);
        }
    }
}

type Cell = {
    x: number;
    y: number;
};

export enum Direction {
    Up,
    Down,
    Left,
    Right
}
