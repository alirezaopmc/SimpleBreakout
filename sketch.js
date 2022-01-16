let W = 400;
let H = 400;


// Noerbline was here 50 (30)

// Configs
let speedX = 1;
let speedY = 1;


// Django King
class Grid {
  constructor(n, m, w, h) {
    this.n = n;
    this.m = m;
    this.w = w;
    this.h = h;
    
    this.initColors();
    this.init();
  }
  
  initColors() {
    this.colors = [
      'red',
      'green',
      'blue',
      'yellow'
    ];
  }
  
  init() {
    this.grid = [];
    
    for(let i=0; i<this.n; i++) {
      let row = [];
      
      for(let j=0; j<this.m; j++) {
        let w = this.w / this.m;
        let h = this.h / this.n;
        
        let x = j * w;
        let y = i * h;
        
        row.push(new Block(x, y, w, h, 'white', i, j));
      }
      
      this.grid.push(row)
    }
    
    this.randomize();

  }
  
  randomColor() {
    return this.colors[
      // 0-1 ==(map)==> 0-len ==(floor) ==>0,1,2,...,len-1
      Math.floor(Math.random()*this.colors.length)
    ]
  }
  
  randomize() {
    this.grid.forEach(
      row => row.forEach(
        block => block.color = this.randomColor()
      )
    )
  }

  render() {
    push();

    this.grid.forEach(
      row => row.forEach(block => block.render())
    );

    pop();
  }

}

let grid = new Grid(5, 5, W, H);





// Fatemeh 50 (30)
class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  show() {
    fill(color(0, 0, 255));
    circle(this.x, this.y, this.r);
  }
  move(){
    // this.x-=speedX;
    // this.y-=speedY;

    if ( this.y <= 0 + r ){
      speedY *= -1;
    }
    
    else if ( this.y >= H - r ){
      speedY *= -1;
    }

    if ( this.x <= 0 + r ){
      speedY *= -1;
    }

    else if ( this.x <= W - r ){
      speedY *= -1;
    }

  }
  
  render(){
    push()
    this.show();
    this.move();
    pop()
  }

  collision(){
    
    
    if (this.x <= 0 || this.x >= width){
      speedX *= -1;
      // in magar inke akhare in tabe bashe
    }
  }
}

// Kourosh 50 (40)
class Block {
  constructor(x, y, width, height, c, i, j){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = c;
    this.health = this.getRandomHealth();
    this.i = i;
    this.j = j;
  }

  getRandomHealth() {
    return 10 + Math.floor(10 * Math.random());
  }
  
  damaged(damage){
    if (this.health > 0){
      this.health -= damage;
    }
    
    this.break();
  }

  // TODO [ Tashakori & Matin ]
  // It must be deleted in the grid table !!!
  // break(){
  //   if (this.health <= 0){
  //     this.health = 0;
  //   }
  // }

  render() {
    push();

    rect(this.x, this.y, this.width, this.height);
    
    pop();
  }
}

// Nima 50 (30)

// mouseX, mouseY => mouse location
class Board {
  constructor(x, y, width, height){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y ;  
  }

  render() {
    push();
    fill(170);
    rectMode(CENTER);
    rect(mouseX, this.y, this.width, this.height , this.height);
    pop();
  }
}

let board = new Board(W / 2 , (7 * H) / 8 , 40 , 15);
// let grid = new Grid();

function setup() {
  createCanvas(W, H);
}

// 60 bar too 1 sanie call mishe
function draw() {
  background(220);
  
  
  grid.render();
  board.render();
}