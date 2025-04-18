export class Position {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    add(direction: Direction): Position {
        return new Position(this.x + direction.getX(), this.y + direction.getY());
    }

    sub(direction: Direction): Position {
        return new Position(this.x - direction.getX(), this.y - direction.getY());
    }

    equals(obj: Position): boolean {
        return this.x === obj.getX() && this.y === obj.getY();
    }
}
