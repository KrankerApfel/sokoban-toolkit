// Player.ts

  const mapW = 10; // largeur de la carte
  
  export class Player {
    x: number;
    y: number;
    under: string;
    sprite: HTMLImageElement;
    private spriteDict: Record<number, HTMLImageElement>;
  
    constructor(game) {
      const index = game.board.indexOf('@');
      this.x = (index + 1) % mapW || mapW;
      this.y = Math.trunc((index + 1) / mapW) + 1;
      this.under = "_";
  
      // Initialisation des sprites
      this.spriteDict = {
        37: this.loadSprite('me0.png'), // Gauche
        38: this.loadSprite('me1.png'), // Haut
        39: this.loadSprite('me2.png'), // Droite
        40: this.loadSprite('me3.png'), // Bas
      };
  
      this.sprite = this.spriteDict[40];
    }

    public getSprite(){return this.sprite;}
  
    private loadSprite(fileName: string): HTMLImageElement {
      const img = new Image();
      img.src = `/sprites/${fileName}`;
      return img;
    }
  
    initPos(): void {
      const index = game.board.indexOf('@');
      this.setX((index + 1) % mapW || mapW);
      this.setY(Math.trunc((index + 1) / mapW) + 1);
    }
  
    setX(posX: number): void {
      this.x = posX;
    }
  
    setY(posY: number): void {
      this.y = posY;
    }
  
    setSprite(keyCode: number): void {
      if (this.spriteDict[keyCode]) {
        this.sprite = this.spriteDict[keyCode];
      }
    }
  
    canMoveTo(dirX: number, dirY: number): boolean {
      const targetX = this.x + dirX - 1;
      const targetY = this.y + dirY - 1;
      const cellIndex = targetY * mapW + targetX;
  
      const cell = game.board[cellIndex];
      return ['_', '.', '$', '*'].includes(cell);
    }
  }
  