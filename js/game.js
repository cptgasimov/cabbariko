var canvas;
var ctx;

var sizeOfBox = 32;
var dirX = 0, dirY = 0;
var direction;

var handle;
var counter = 0;

var head = [];
var body = [];

head[0] = {x : 32, y : 96};

var touchedItself = false;

//here, we create the instances of our audio files
var dead = new Audio();
var eat = new Audio();
var up = new Audio();
var right = new Audio();
var left = new Audio();
var down = new Audio();

var audioFile = new Audio();

//here, we provide a source for our audio files
audioFile.src = "Xenoblade Chronicles OST - Forest of the Nopon.mp3";
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

//create an instance of food
//and provide a source image for it
var foodImg = new Image();
foodImg.src = "images/food.png";

//food randomly appears in our screen
var food; 

createFood(head[0].x, head[0].y);

var score = 0;

//initializes the game
function start(){
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	var homePage = document.getElementById("main");
	homePage.style.display = "none";
	canvas.style.display = "block";
	
	sound();
	draw();
	play();
}

function play(){
	handle = setInterval(draw, 100);
}

//draws the game
function draw(){
	
	ctx.clearRect(head[0].x, head[0].y, sizeOfBox, sizeOfBox);
	
	for(i = 0; i < body.length; i++){
		ctx.clearRect(body[i].x, body[i].y, sizeOfBox, sizeOfBox);
	}
	
	ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the score
	
	//shows the score
	ctx.fillStyle = "black";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*sizeOfBox, 1.6*sizeOfBox);

//controls the snake	
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
		  if(direction != "right"){
			dirX = -1;
			dirY = 0;
		
		//when snake dies, we make left, right, up and down objects null
		//if user wants to move the snake again, and if we do not check whether the instance
		//is null or not, the program will try to .play() an instance which is null
		//which causes an error
		if(left != null)
			left.play();
		
			direction = "left";
			
			if(counter == 0){
				counter++;
			}
		  }
            break;
        case 38:
		  if(direction != "down"){
			dirY = -1;
			dirX = 0;
			
		//when snake dies, we make left, right, up and down objects null
		//if user wants to move the snake again, and if we do not check whether the instance
		//is null or not, the program will try to .play() an instance which is null
		//which causes an error	
		if(up != null)
			up.play();
		
			direction = "up";
			
			if(counter == 0){
				counter++;
			}
		  }
			break;
        case 39:
		  if(direction != "left"){
			dirX = 1;
			dirY = 0;
		
		//when snake dies, we make left, right, up and down objects null
		//if user wants to move the snake again, and if we do not check whether the instance
		//is null or not, the program will try to .play() an instance which is null
		//which causes an error
		if(right != null)
			right.play();
		
			direction = "right";
		  
		  	if(counter == 0){
				counter++;
			}
		  }
			break;
        case 40:
		  if(direction != "up"){
			dirY = 1;
			dirX = 0;
			
		//when snake dies, we make left, right, up and down objects null
		//if user wants to move the snake again, and if we do not check whether the instance
		//is null or not, the program will try to .play() an instance which is null
		//which causes an error	
		if(down != null)	
			down.play();
			
			direction = "down";  
		  
			if(counter == 0){
				counter++;
			}
		  }
			break;
    }
};
	if(dirX == 1){
		head[0].x += sizeOfBox;
	} else if (dirX == -1){
		head[0].x -= sizeOfBox;
	} else if (dirY == 1){
		head[0].y += sizeOfBox;
	} else if (dirY == -1){
		head[0].y -= sizeOfBox;
	}
	
	//when snake touches the border
	if(counter != 0){
	  if(head[0].x < sizeOfBox || head[0].x > 17 * sizeOfBox || head[0].y < 3*sizeOfBox || head[0].y > 17*sizeOfBox || touchedItself){
        gameOver();
        dead.play();
		return;
      }
	}
	
	//draws food
	ctx.drawImage(foodImg, food.cor1, food.cor2);

	//draws head
	ctx.fillStyle = "blue";
	ctx.fillRect(head[0].x, head[0].y, sizeOfBox, sizeOfBox);

	//draws body
	if(score > 0){
		for(i = 0; i < body.length; i++){
			ctx.fillStyle = "white";
			ctx.fillRect(body[i].x, body[i].y, sizeOfBox, sizeOfBox);
			
			ctx.strokeStyle = "#0000ff";
			ctx.lineWidth   = 1;
			ctx.strokeRect(body[i].x, body[i].y, sizeOfBox,sizeOfBox);
		}
	}
	
	//snake eats food
	if(counter != 0){
		if(head[0].x == food.cor1 && head[0].y == food.cor2){
			eat.play();
			score ++;		
			createFood(head[0].x, head[0].y);
		}
	}
	
	var oldX = head[0].x;
	var oldY = head[0].y;
	
	var a, b, c, d;
	
	for(i = 0; i < score; i++){
		
		if(i == 0){

			if(body[i] != null){
				a = body[i].x;
				b = body[i].y;
			}
		
			body[i] = { x : oldX, y : oldY};

		} else {
			
			if(i % 2 != 0)
			{
				if(body[i] != null){
					c = body[i].x;
					d = body[i].y;
				}
			
				body[i] = { x : a, y : b};
				
			} else
			{
				if(body[i] != null){
					a = body[i].x;
					b = body[i].y;
				}
			
				body[i] = { x : c, y : d};
			}

			if(head[0].x == body[i].x && head[0].y == body[i].y)
				touchedItself = true;
		}
		
		if(food.cor1 == body[i].x && food.cor2 == body[i].y){
			createFood(head[0].x, head[0].y);
		}

	}
}

function createFood(corOfHeadX, corOfHeadY){
	food = {
		cor1 : Math.floor(Math.random()*17+1) * sizeOfBox,
		cor2 : Math.floor(Math.random()*15+3) * sizeOfBox
	}
	
	if(counter == 0){
		if(food.cor1 == corOfHeadX && food.cor2 == corOfHeadY){
			food = {
				cor1 : Math.floor(Math.random()*17+1) * sizeOfBox,
				cor2 : Math.floor(Math.random()*15+3) * sizeOfBox
			}
		}
	} 
}

function gameOver(){
	clearInterval(handle);
	handle = 0;
	up = null;
	left = null;
	right = null;
	down = null;
	audioFile.pause();
}

//Soundtrack of the game
function sound(){
	audioFile.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
	}, false);

	audioFile.play();
	audioFile.volume = 0.3;
}