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
  jumping: boolean = true;
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

  constructor(public ngZone: NgZone, public ss: ShareStateService) {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode == 32) {
        console.log('test');
        
      }
    });
    this.speedX = 0;
    this.speedY = 0;
    this.frameNo = 0;
    // this.ngZone.runOutsideAngular(() => this.jump());
  }

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.x = 40;
    this.y = this.context.canvas.height - this.ballRadius - 0.01;
    this.myGamePiece = new component(this.context, 20, 20, "#0095DD", 10, this.context.canvas.height-20);
    // setInterval(() => {
    //   this.updateGameArea();
    // }, 3);
    this.requestId2 = window.requestAnimationFrame(() => this.updateGameArea());
  }

  reset() {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.myGamePiece = new component(this.context, 20, 20, "#0095DD", 10, this.context.canvas.height-20);
    this.myObstacles = [];
    this.score = 0;
    this.lost = false;
  }

  exit() {
    this.ss.toggleGame();
  }

  animate() {
    //draw the container
    // this.context.fillStyle = "#000000";
    // this.context.fillRect(this.container.x, this.container.y, this.container.width, this.container.height);
  
    //loop throughj the circles array
    for (var i = 0; i < this.circles.length; i++) {
      //draw the circles
      this.clear();
      this.context.fillStyle = 'hsl(' + this.circles[i].color++ + ', 100%, 50%)';
      this.context.beginPath();
      this.context.arc(this.circles[i].x, this.circles[i].y, this.circles[i].r, 0, Math.PI * 2, true);
      this.context.fill();
      this.context.closePath();
  
      //time to animate our circles ladies and gentlemen.
      if (this.circles[i].x - this.circles[i].r + this.circles[i].vx < this.container.x || this.circles[i].x + this.circles[i].r + this.circles[i].vx > this.container.x + this.container.width) {
        this.circles[i].vx = -this.circles[i].vx;
      }
  
      if (this.circles[i].y + this.circles[i].r + this.circles[i].vy > this.container.y + this.container.height || this.circles[i].y - this.circles[i].r + this.circles[i].vy < this.container.y + 380) {
        this.circles[i].vy = -this.circles[i].vy;
      }
  
      // circles[i].x += circles[i].vx
      this.circles[i].y += this.circles[i].vy;
      
    }
    this.requestId = window.requestAnimationFrame(() => this.animate());
  }

  start() {
    // this.jump();
    this.requestId = window.requestAnimationFrame(() => this.jump());
    // window.requestAnimationFrame(() => this.animate());
    // this.interval = setInterval(() => {
    //   this.jump();
    //   this.requestId = requestAnimationFrame(() => this.start);
    // }, 7);
  }

  stop() {
    clearInterval(this.interval);
  }

  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  jump() {
    this.clear();
    if (this.myGamePiece.y < 400) {
      this.jumping = !this.jumping;
    } else if (this.myGamePiece.y >= this.context.canvas.height-19) {
      this.jumping = !this.jumping;
    }
    if (this.jumping) {
      this.myGamePiece.y = this.myGamePiece.y - 7;
      this.myGamePiece.updateJump(this.myGamePiece.x, this.myGamePiece.y);
    } else {
      this.myGamePiece.y = this.myGamePiece.y + 7;
      this.myGamePiece.updateJump(this.myGamePiece.x, this.myGamePiece.y);
    }
    this.requestId = window.requestAnimationFrame(() => this.jump());
    setTimeout(() => {
      window.cancelAnimationFrame(this.requestId);
    }, 400);
  }

  drawBall() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
    this.context.fillStyle = 'hsl(' + this.circles[0].color++ + ', 100%, 50%)';
    this.context.fill();
    this.context.closePath();
  }

  updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (var i = 0; i < this.myObstacles.length; i += 1) {
      if (this.myGamePiece.crashWith(this.myObstacles[i])) {
        this.stop();
        this.lost = true;
        return;
      }
    }
    this.clear();
    this.frameNo += 1;
    if (this.frameNo == 1 || this.everyInterval(200)) {
        x = this.context.canvas.width;
        minHeight = 450;
        maxHeight = 490;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 3;
        maxGap = 3;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        this.myObstacles.push(new component(this.context, 10, x - height - gap, "green", x - 50, height + gap));
    }
    for (var i = 0; i < this.myObstacles.length; i += 1) {
      this.myObstacles[i].x += -4;
      if (this.myObstacles[i].x == this.myGamePiece.x) {
        this.score = this.score + 5;
      }
      this.myObstacles[i].update();
    }
    this.myGamePiece.newPos();    
    this.myGamePiece.update();
    this.requestId2 = window.requestAnimationFrame(() => this.updateGameArea());
  }
  everyInterval(n) {
    if ((this.frameNo / n) % 1 == 0) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
class component {
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
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
        crash = false;
    }
    return crash;
  }
}