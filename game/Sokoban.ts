import { Player } from "./Player";
import { Engine } from "./Engine";

export class Sokoban {
  private player: Player;
  private playerSprite: HTMLImageElement;
  private engine: Engine;
  private game: {
    board: string[],
    checkWinCondition: () => boolean,
    focusEnter: () => void,
    focusExit: () => void,
    keyEvent: (key: number, isPressed: boolean) => void
  };

  constructor(
    private gameScreen: HTMLCanvasElement,
    private textArea: HTMLTextAreaElement,
  ) {
    const defaultLevel = [
      "_", "_", "_", "#", "#", "#", "_", "_", "_", "_\n",
      "_", "_", "_", "#", ".", "#", "_", "_", "_", "_\n",
      "_", "_", "_", "#", "_", "#", "#", "#", "#", "#\n",
      "#", "#", "#", "#", "$", "_", "$", "_", ".", "#\n",
      "#", ".", "_", "_", "$", "@", "#", "#", "#", "#\n",
      "#", "#", "#", "#", "#", "$", "#", "_", "_", "_\n",
      "_", "_", "_", "_", "#", "_", "#", "_", "_", "_\n",
      "_", "_", "_", "_", "#", "_", "#", "_", "_", "_\n",
      "_", "_", "_", "_", "#", ".", "#", "_", "_", "_\n",
      "_", "_", "_", "_", "#", "#", "#", "_", "_", "_\n"
    ];

    this.textArea.value = defaultLevel.join(','); 
    

    const images: Record<string, HTMLImageElement> = {
      wal: new Image(),
      flr: new Image(),
      tar: new Image(),
      bor: new Image(),
      bog: new Image()
    };

    images.wal.src = './sprites/wall.png';
    images.flr.src = './sprites/floor.png';
    images.tar.src = './sprites/target.png';
    images.bor.src = './sprites/box00.png';
    images.bog.src = './sprites/box01.png';

    this.playerSprite = new Image();
    this.playerSprite.src = './sprites/me3.png';

    this.game = {
      board: this.textArea.value.replace(/\n/g, '').split(','),
      checkWinCondition: () => !this.game.board.includes('$'),
      focusEnter: () => {
        this.gameScreen.focus();
        this.gameScreen.style.border = '2px solid red';
      },
      focusExit: () => {
        this.gameScreen.style.border = '1px solid black';
      },
      keyEvent: (key: number, isPressed: boolean) => {
        this.keyEvent(key, isPressed);
      }
    };

    this.engine = new Engine(this.game, images, 30, 15, 10, 10, this.playerSprite);
    this.engine.init();

    this.player = new Player(this.game.board);
    this.player.initPos(this.game.board);

  }

  public checkWinCondition(): boolean {
    return !this.game.board.includes('$');
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

    const cell = this.game.board[target];
    const nextCell = this.game.board[next];

    if (!['_', '.', '$', '*'].includes(cell)) return;

    if (cell === '$' || cell === '*') {
      if (['#', '$', '*'].includes(nextCell)) return;

      this.game.board[next] = nextCell === '.' ? '*' : '$';
      this.game.board[target] = cell === '$' ? '_' : '.';
    }

    this.game.board[source] = this.player.under;
    this.player.under = cell === '*' ? '.' : '_';
    this.game.board[target] = '@';

    this.player.setX(this.player.x + dx);
    this.player.setY(this.player.y + dy);

    this.engine.drawBoard();
    console.log(this.game.board);
  }

  public get boardState(): string[] {
    return this.game.board;
  }

  public updateBoardFromTextArea() {
    this.game.board = this.textArea.value.replace(/\n/g, '').split(',');
    this.player.initPos(this.game.board);
    this.engine.drawBoard();
  }

}
