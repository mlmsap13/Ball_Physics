var balls = [];
var amount = 10;
var mou1;
var mou2;


function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  for(var i = 0; i < 400; i++)  {
	var ball = new Ball(random(20, windowWidth-20), random(20, windowHeight-200));
	balls.push(ball);
  }
}
function draw() {
  background(0, 0, 32);
  mou1 = mouseX;
  mou2 = mouseY;
  for(var i = 0; i < balls.length; i++){
	balls[i].move();
	balls[i].display();
	balls[i].applyForce();
	balls[i].gravity();
	balls[i].edge();
	balls[i].settle();
	if (mouseIsPressed){
  	balls[i].behaviors();
	}
  }
}

function Ball(x,y){
  this.x = x;
  this.y = y;
  this.position = createVector(this.x,this.y);
  this.velocity = createVector(random(0,(windowWidth/2-x)/100),random(-8,1));
  this.acceleration = createVector(0,0);
  this.mouse = createVector(0,0);
  this.r = 7;
  this.c = random(0, 255);
}
  Ball.prototype.move = function(){
	this.position.add(this.velocity);
	this.velocity.add(this.acceleration);
	this.acceleration.mult(0);
};
  Ball.prototype.applyForce = function(f) {
  	this.acceleration.add(f);
};
  Ball.prototype.display = function(){
	noStroke;
	fill(this.c, 100, 100);
	ellipse(this.position.x, this.position.y, this.r*2, this.r*2)
};
  Ball.prototype.gravity = function() {
	var gravity = createVector();
	gravity.y = .4;
	this.applyForce(gravity);
};
  Ball.prototype.edge = function() {
	if(this.position.x < this.r || this.position.x > windowWidth-this.r){
  	this.velocity.x *= -1;
	}
	if(this.position.y > windowHeight-this.r){
  	this.velocity.y *= -.75;
  	this.velocity.x *= .95;
  	this.position.y = windowHeight - this.r;
	}
  }
  Ball.prototype.settle = function(){
	if(this.position.y > windowHeight-18 && this.velocity.y < .06 && this.velocity.y > -.06){
  	this.position.y = windowHeight-this.r;
  	this.velocity.x *= .99999;
	}
  }
  Ball.prototype.behaviors = function() {
  	this.mouse.x = mou1;
  	this.mouse.y = mou2;
  	var arrive = this.arrive(this.mouse);
  	arrive.mult(1);
  	this.applyForce(arrive);
  }
  Ball.prototype.arrive = function(target) {
	var desired = p5.Vector.sub(target, this.position);
	var d = desired.mag();
// 	console.log(d);
	var speed;
	speed = map(d, 0, 70, 30, 40);
	desired.setMag(speed);
	var steer = p5.Vector.sub(desired, this.velocity);
	steer.limit(5);
	return steer;
  }
