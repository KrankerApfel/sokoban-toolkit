export class Direction {
    static GAUCHE: Direction;
    static DROITE: Direction;
    static HAUT: Direction;
    static BAS: Direction;

    x: number;
    y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static init() {
        // Initialisation des directions
        Direction.GAUCHE = new Direction(-1, 0);
        Direction.DROITE = new Direction(1, 0);
        Direction.HAUT = new Direction(0, -1);
        Direction.BAS = new Direction(0, 1);
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    static getDirections(): Direction[] {
        return [Direction.GAUCHE, Direction.DROITE, Direction.HAUT, Direction.BAS];
    }
}

// Initialiser les directions statiques
Direction.init();
