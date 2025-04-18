export class Engine {
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private target: EventTarget | null = null;
  
    constructor(
      private game: {
        board: string[];
        checkWinCondition: () => boolean;
        focusEnter: () => void;
        focusExit: () => void;
        keyEvent: (keyCode: number, isPressed: boolean) => void;
      },
      private images: Record<string, HTMLImageElement>,
      private tileW: number,
      private tileH: number,
      private mapW: number,
      private mapH: number,
      private playerSprite: HTMLImageElement
    ) {}
  
    private currentSecond: number = 0;
    private frameCount: number = 0;
    private framesLastSecond: number = 0;
  
    public init() {
      this.canvas = document.getElementById("gameScreen") as HTMLCanvasElement;
      if (!this.canvas) return;
  
      this.canvas.style.border = "1px solid black";
      this.canvas.style.imageRendering = "pixelated"; 
      this.ctx = this.canvas.getContext("2d");
      if (this.ctx !=null)
            this.ctx.imageSmoothingEnabled = false; 

      this.setupListeners();
      requestAnimationFrame(() => this.drawBoard());
    }
    
    public drawBoard() {
      if (!this.ctx) return;
      
      this.ctx.clearRect(0, 0, 400, 400);
  
      const sec = Math.floor(Date.now() / 1000);
      if (sec !== this.currentSecond) {
        this.currentSecond = sec;
        this.framesLastSecond = this.frameCount;
        this.frameCount = 1;
      } else {
        this.frameCount++;
      }
  
      for (let y = 0; y < this.mapH; ++y) {
        for (let x = 0; x < this.mapW; ++x) {
          const cell = this.game.board[(y * this.mapW) + x];
          let img: HTMLImageElement | null = null;
  
          switch (cell) {
            case "#": img = this.images["wal"]; break;
            case "_": img = this.images["flr"]; break;
            case ".": img = this.images["tar"]; break;
            case "*": img = this.images["bor"]; break;
            case "+": img = this.playerSprite; break;
            case "$": img = this.images["bog"]; break;
            case "@": img = this.playerSprite; break;
            default:  img = this.images["flr"];
          }
  
          if (img) {
            this.ctx.drawImage(img, x * this.tileW, y * this.tileH, this.tileW, this.tileH);
          }
        }
      }
  
      if (this.game.checkWinCondition()) {
        this.ctx.fillStyle = "#00A";
        this.ctx.font = "40px Arial";
        this.ctx.fillText("- SOLVED -", 100, 235);
      }
    }
  
    private setupListeners() {
      document.addEventListener("mousedown", (event) => {
        this.target = event.target;
        if (this.target === this.canvas) {
          this.game.focusEnter();
        } else {
          this.game.focusExit();
        }
      });
  
      document.addEventListener("keydown", (event) => {
        if (this.target === this.canvas) {
          this.handleKey(event);
        }
      });
    }
  
    private handleKey(event: KeyboardEvent) {
      const keysMap: Record<number, boolean> = {
        37: false, // left
        38: false, // up
        39: false, // right
        40: false, // down
        82: false, // R
        85: false  // U
      };
  
      if (/^(37|38|39|40)$/.test(event.keyCode.toString())) {
        event.preventDefault(); // prevent scroll
      }
  
      keysMap[event.keyCode] = true;
      this.game.keyEvent(event.keyCode, keysMap[event.keyCode]);
    }
  }
  