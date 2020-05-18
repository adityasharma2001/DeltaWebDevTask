var char;
var obs = [];

function startGame() {
    char = new character();
    Game.start();
}

var Game= {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 350;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(draw, 20);
          window.addEventListener('keydown', function (e){
          Game.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e){
          Game.key = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function character() {
    this.width = 30;
    this.height = 30;
    this.speedX = 0;
    this.speedY = 0;
    this.x = 30;
    this.y = 250;
    this.gravity=0.1;
    this.lift = -2;
    this.update = function() {
        ctx = Game.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 280, 1000, 50);
    }
    this.newPos = function(){
      this.x += this.speedX;
      this.speedY += this.gravity;
      this.y+=this.speedY;
      if(this.speedY<= -3){
        this.speedY = -3;
      }
      if(this.y > 250){
        this.y=250;
        this.speedY=0;
      }
     }


}

function draw() {
    if(Game.key && Game.key==37){left();}
    if(Game.key && Game.key==39){right();}
    if(Game.key && Game.key==38){up();}
    for (i = 0; i < obs.length; i += 1) {
        if (obs[i].intersect()) {
            Game.stop();
            return;
        }
    }
    Game.clear();
    Game.frameNo += 1;
    if (Game.frameNo == 1 || everyinterval(150)) {
        posx = Game.canvas.width;
          minheight = 195;
        maxheight = 255;
        posy = Math.floor(Math.random()*(maxheight-minheight+1)+minheight);
        obs.push(new obstacle(posx,posy));
    }
    for (i = 0; i < obs.length; i += 1) {
        obs[i].x += -1;
        obs[i].show();
        obs[i].update();
    }
    char.newPos();
    char.update();
}

function everyinterval(n) {
    if ((Game.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function up() {
  char.speedY = char.lift;
  char.speedY = char.lift * 0.8;
}


function left() {
    char.speedX = -1;
}

function right() {
    char.speedX = 1;
}

function clearmove() {
    char.speedX = 0;
    char.speedY = 0;
}
function obstacle(x){
  this.x = x;
  this.y = 255;
  this.velocity = 1;
  this.radius = 25;

  this.show = function(){
    ctx=Game.context;
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fill();
  }

  this.update = function(){
    if(this.x>0){
      this.x -=1;
  }
      if((this.y + this.radius)==280){
       this.velocity = -1;
    }
    if((this.y - this.radius) == 170){
       this.velocity = 1;
    }
    this.y+=this.velocity;
  }

  this.intersect = function(){
    var fIntersect = ((char.x + 30) >= (this.x - this.radius))&&(char.x < (this.x - this.radius)&&(char.y + 30)>=(this.y - this.radius));
    var eIntersect = ((char.x)<=(this.x+this.radius))&&((char.x +30)>(this.x + this.radius))&&(char.y + 30)>=(this.y - this.radius);
    //var tIntersect = ((char.y + 30)>=(this.y - this.radius))&&((char.y)<(this.y - this.radius));
    var bIntersect = ((character.y)<=(this.y+this.radius)) && ((character.y + 30)>(this.y+this.radius));

    return(fIntersect || eIntersect  || bIntersect);
  }


}
