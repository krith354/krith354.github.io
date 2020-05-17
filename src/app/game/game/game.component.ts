import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ShareStateService } from 'src/app/services/share-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;
  requestId;
  requestId2;
  interval;
  x;
  y;
  dx = 2;
  dy = -2;
  ballRadius = 10;
  jumping = true;
  isJumping = false;
  myObstacles = [];
  myGamePiece;
  width;
  height;
  speedX;
  speedY;
  frameNo;
  score = 0;
  lost = false;
  game = true;
  container = {
    x: 0,
    y: 0,
    width: 600,
    height: 500
  };
  circles = [{
    x: 50,
    y: 490,
    r: 10,
    vx: 10,
    vy: 9,
    color: 125
  }];
  requestId3: number;

  constructor(public ngZone: NgZone, public ss: ShareStateService) {
    this.speedX = 0;
    this.speedY = 0;
    this.frameNo = 0;
  }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.x = 40;
    this.y = this.context.canvas.height - this.ballRadius - 0.01;
    this.myGamePiece = new Block(this.context, 20, 20, '#0095DD', 10, this.context.canvas.height - 20);
    this.requestId3 = window.requestAnimationFrame(() => this.updateGameArea());
    if (!this.isJumping) {
      document.body.onkeyup = (e) => {
        if (e.which === 32) {
          this.jump();
        }
      };
    }
  }

  reset() {
    window.cancelAnimationFrame(this.requestId3);
    this.context = this.canvas.nativeElement.getContext('2d');
    this.myGamePiece = new Block(this.context, 20, 20, '#0095DD', 10, this.context.canvas.height - 20);
    this.myObstacles = [];
    this.score = 0;
    this.lost = false;
    this.ngOnInit();
  }

  exit() {
    this.ss.toggleGame();
  }

  stop() {
    clearInterval(this.interval);
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  jump() {
    this.isJumping = true;
    if (this.myGamePiece.y < 400) {
      this.jumping = !this.jumping;
    } else if (this.myGamePiece.y >= this.context.canvas.height - 19) {
      this.jumping = !this.jumping;
    }
    if (this.jumping) {
      this.myGamePiece.y = this.myGamePiece.y - 3;
      this.myGamePiece.updateJump(this.myGamePiece.x, this.myGamePiece.y);
    } else {
      this.myGamePiece.y = this.myGamePiece.y + 3;
      this.myGamePiece.updateJump(this.myGamePiece.x, this.myGamePiece.y);
    }
    this.requestId = window.requestAnimationFrame(() => this.jump());
    setTimeout(() => {
      window.cancelAnimationFrame(this.requestId);
      this.isJumping = false;
    }, 378);
  }

  updateGameArea() {
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (let i = 0; i < this.myObstacles.length; i += 1) {
      if (this.myGamePiece.crashWith(this.myObstacles[i])) {
        this.stop();
        this.lost = true;
        return;
      }
    }
    this.clear();
    this.frameNo += 1;
    if (this.frameNo === 1 || this.everyInterval(200)) {
        x = this.context.canvas.width;
        minHeight = 450;
        maxHeight = 490;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 3;
        maxGap = 3;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        this.myObstacles.push(new Block(this.context, 10, x - height - gap, 'green', x - 50, height + gap));
    }
    for (let i = 0; i < this.myObstacles.length; i += 1) {
      this.myObstacles[i].x += -4;
      if (this.myObstacles[i].x === this.myGamePiece.x) {
        this.score = this.score + 5;
      }
      this.myObstacles[i].update();
    }
    this.myGamePiece.newPos();
    this.myGamePiece.update();
    this.requestId3 = window.requestAnimationFrame(() => this.updateGameArea());
  }

  everyInterval(n) {
    if ((this.frameNo / n) % 1 === 0) {
      return true;
    }
    return false;
  }
}
class Block {
  width;
  height;
  speedX;
  speedY;
  x;
  y;
  ctx;
  color;

  constructor(ctx, width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.color = color;
  }

  public update() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  public updateJump(x, y) {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(x, y, this.width, this.height);
  }
  public newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  public crashWith(otherobj) {
    const myleft = this.x;
    const myright = this.x + (this.width);
    const mytop = this.y;
    const mybottom = this.y + (this.height);
    const otherleft = otherobj.x;
    const otherright = otherobj.x + (otherobj.width);
    const othertop = otherobj.y;
    const otherbottom = otherobj.y + (otherobj.height);
    let crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        crash = false;
    }
    return crash;
  }
}
