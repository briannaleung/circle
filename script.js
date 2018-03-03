var circle;
var context;
var cancan;
var movement = 50;

document.addEventListener('keydown', function(event) {
	if(event.keyCode == 87){
		circle.moveUp();
	} else if (event.keyCode == 83){
		circle.moveDown();
	} else if (event.keyCode == 65){
		circle.moveLeft();
	} else if (event.keyCode == 68){
		circle.moveRight();
	} else if (event.keyCode == 84){
		circle.changeColor();
	}
});

window.onload = function() {
    cancan = document.getElementById('cancan');
    context = cancan.getContext('2d');
    circle = new Circle();
}

class Circle {
	constructor() {
        this.x = 200;
        this.y = 200;
        this.r = 50;
        this.start = 0;
        this.end = Math.PI*2;
        this.color = "#ff6b6b";
        this.draw();      
    }

    draw() {
        context.strokeStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, this.start, this.end);
        context.stroke();
    }
    
    erase() { 
        context.clearRect(0, 0, cancan.width, cancan.height);
    }

    getRandomColor() {
	  	var letters = '0123456789ABCDEF';
	  	var color = '#';
	  	for (var i = 0; i < 6; i++) {
	    	color += letters[Math.floor(Math.random() * 16)];
	  	}
	  	return color;
	}

    moveUp() {
        this.erase();
        this.y = this.y - movement;
        this.draw();
    }

    moveDown() {
    	this.erase();
        this.y = this.y + movement;
        this.draw();
    }

    moveLeft() {
    	this.erase();
        this.x = this.x - movement;
        this.draw();
    }

    moveRight() {
    	this.erase();
        this.x = this.x + movement;
        this.draw();
    }

	changeColor() {
    	this.erase();

    	var letters = '0123456789ABCDEF';
	  	var color = '#';
	  	for (var i = 0; i < 6; i++) {
	    	color += letters[Math.floor(Math.random() * 16)];
	  	}

	  	this.color = color;
    	this.draw();
    }


}