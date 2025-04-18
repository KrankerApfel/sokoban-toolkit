import { Player } from "./Player";

export class Sokoban {
  private board: string[];
  private player: Player;

  constructor(
    private gameScreen: HTMLCanvasElement,
    private textArea: HTMLTextAreaElement,
    private playerSprite: HTMLImageElement,
    private engine: { drawBoard: () => void }
  ) {
    const defaultLevel = [
      "_", "_", "_", "#", "#", "#", "_", "_", "_", "_",
      "_", "_", "_", "#", ".", "#", "_", "_", "_", "_",
      "_", "_", "_", "#", "_", "#", "#", "#", "#", "#",
      "#", "#", "#", "#", "$", "_", "$", "_", ".", "#",
      "#", ".", "_", "_", "$", "@", "#", "#", "#", "#",
      "#", "#", "#", "#", "#", "$", "#", "_", "_", "_",
      "_", "_", "_", "_", "#", "_", "#", "_", "_", "_",
      "_", "_", "_", "_", "#", "_", "#", "_", "_", "_",
      "_", "_", "_", "_", "#", ".", "#", "_", "_", "_",
      "_", "_", "_", "_", "#", "#", "#", "_", "_", "_"
    ];
    
    this.board = [...defaultLevel];
    this.player = new Player(this.board);
  }

  public checkWinCondition(): boolean {
    return !this.board.includes('$');
  }

  public focusEnter() {
    this.gameScreen.focus();
    this.gameScreen.style.border = '2px solid red';
  }

  public focusExit() {
    this.gameScreen.style.border = '1px solid black';
  }

  public keyEvent(key: number, isPressed: boolean) {
    if (!isPressed) return;

    const dirMap: Record<number, [number, number]> = {
      37: [-1, 0], // left
      38: [0, -1], // up
      39: [1, 0],  // right
      40: [0, 1],  // down
    };

    if (dirMap[key]) {
      const [dx, dy] = dirMap[key];
      this.player.setSprite(key);
      this.playerSprite.src = this.player.getSprite().src;
      this.moveTo(dx, dy);
    }
  }

  private moveTo(dx: number, dy: number) {
    const source = this.player.getFuturPosition(0, 0);
    const target = this.player.getFuturPosition(dx, dy);
    const next = this.player.getFuturPosition(dx * 2, dy * 2);

    const cell = this.board[target];
    const nextCell = this.board[next];

    // Si la cellule ciblée n'est ni vide, ni une cible, ni une caisse, on ne bouge pas
    if (!['_', '.', '$', '*'].includes(cell)) return;

    // Tentative de poussée de caisse
    if (cell === '$' || cell === '*') {
      // Si derrière la caisse c'est un mur, une autre caisse, ou une caisse sur une cible : on bloque
      if (['#', '$', '*'].includes(nextCell)) return;

      // On pousse la caisse vers la cellule suivante
      this.board[next] = nextCell === '.' ? '*' : '$';
      this.board[target] = cell === '$' ? '_' : '.';
    }

    // Déplacement du joueur
    this.board[source] = this.player.under;
    this.player.under = cell === '*' ? '.' : '_';
    this.board[target] = '@';

    this.player.setX(this.player.x + dx);
    this.player.setY(this.player.y + dy);

    this.engine.drawBoard();

    console.log(this.board);
  }

  public get boardState(): string[] {
    return this.board;
  }
}
