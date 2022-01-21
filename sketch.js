let W = 400;
let H = 400;
// Noerbline was here 50 (30)

// Configs
let speedX = 3;
let speedY = -3;


// Django King (Matin)
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
        
        row.push(new Block(x, y, w, h, 'white', i, j)); // na na
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

  delete(i, j){
    let block = this.grid[i][j]
    block.x = -block.width;
    block.y = -block.health;
  }

  render(obj) {
    push();

    this.grid.forEach(
      row => row.forEach(block => block.render())
    );

    pop();
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
  
  render(obj) {
    push();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    
    pop();
  }
}


// Fatemeh 50 (30)
class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  show() {
    fill('white');
    circle(this.x, this.y, this.r);
  }

  speedChecker(){
    if (this.x + this.r / 2 > W) speedX *= -1;
    if (this.x - this.r / 2 < 0) speedX *= -1;
    if (this.y - this.r / 2 < 0) speedY *= -1;
    // if (this.y + this.r / 2 > H) speedY *= -1;
  }

  move(){

    this.x += speedX;
    this.y += speedY;
    
    this.speedChecker()
  }

  render(obj){
    push()

    this.show();
    this.move();
    this.collision(obj)
    
    pop()
  }

  collision(obj){

    // board
    let board = obj.board
    
    // TODO
    // collision detection for board

    // grid
    let grid = obj.grid
    grid.grid.forEach(row => row.forEach(
      block => {
          if( block.y + block.height > this.y - this.r && (this.x >= block.x && this.x <= block.x + block.width) ){
              speedY *= -1
              grid.delete(block.i, block.j)
          }
      }
      // TODO
      // collision detection for blocks 
    ))
    //
    if(board.y < this.y + this.r && (board.x - board.width/2 <= this.x && this.x <= board.x + board.width)){
        speedY *= -1
    }
  }
}

// Nima 50 (30)

// mouseX, mouseY => mouse location
class Board {
  constructor(y, width, height){
    this.width = width;
    this.height = height;
    this.x = null;
    this.y = y ;  
  }

  render(obj) {
    push();
    fill(170);
    rectMode(CENTER);
    this.x = mouseX;

    if (mouseX - this.width / 2 < 0) {
        this.x = this.width / 2
    }

    if (mouseX + this.width / 2 > W) {
        this.x = W - this.width / 2
    }
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}

// let board = new Board(W / 2 , (7 * H) / 8 , 40 , 15);
let board = new Board(H - 15 , 60 , 15);
// let grid = new Grid();

function setup() {
  createCanvas(W, H);
}

let grid = new Grid(10, 5, W, H / 2);
let ball = new Ball(200, 300, 15)

// global object
let obj = {
  'grid': grid,
  'ball': ball,
  'board': board
}

// 60 bar too 1 sanie call mishe
function draw() {
  background(0);
  
  Object.values(obj).forEach(object => object.render(obj))
}
