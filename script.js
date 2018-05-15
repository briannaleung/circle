var circle;
var context;
var cancan;
var movement = 20;
var size = 5;

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
	} else if (event.keyCode == 79){
        circle.increaseSize();
    } else if (event.keyCode == 80){
        circle.decreaseSize();
    } else if (event.keyCode == 85){
        circle.increaseThickness();
    } else if (event.keyCode == 73){
        circle.decreaseThickness();
    } else if (event.keyCode == 82){
        circle.reset();
    }
});

window.onload = function() {
    cancan = document.getElementById('cancan');
    context = cancan.getContext('2d');
    circle = new Circle();
}

class Circle {
	constructor() {
        this.x = 700;
        this.y = 600;
        this.r = 50;
        this.start = 0;
        this.end = Math.PI*2;
        this.color = "#FF0000";
        this.lineWidth="5";
        this.draw();     
    }

    draw() {
        context.strokeStyle = this.color;
        context.lineWidth=this.lineWidth;
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

    increaseSize() {
        this.erase();
        this.r = this.r + size;
        this.draw();
    }

    decreaseSize() {
        this.erase();
        this.r = this.r - size;
        this.draw();
    }

    increaseThickness() {
        this.erase();
        this.lineWidth++;
        this.draw();
    }

    decreaseThickness() {
        this.erase();
        this.lineWidth--;
        this.draw();
    }

    reset() {
        this.erase();
        this.x = 700;
        this.y = 600;
        this.r = 50;
        this.start = 0;
        this.color = "#FF0000";
        this.lineWidth="5";
        this.draw();
    }
}