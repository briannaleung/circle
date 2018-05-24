//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;
//Create a Pixi Application
let app = new Application({ 
    width: 2560, 
    height: 2560,                       
    antialiasing: true, 
    transparent: false, 
    resolution: 1,
    backgroundColor: 0x000000
  }
);
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
loader
  .add("circleicon.png")
  .load(setup);
//Define any variables that are used in more than one function
var cat, state;
function setup() {
  //Create the `cat` sprite 
  cat = new Sprite(resources["circleicon.png"].texture);
  cat.x = 96;
  cat.y = 96; 
  cat.vx = 0;
  cat.vy = 0;
  cat.width = 120;
  cat.height = 120;
  app.stage.addChild(cat);
  //Capture the keyboard arrow keys
  let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);
  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    cat.vx = -5;
    cat.vy = 0;
  };
  
  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };
  //Up
  up.press = () => {
    cat.vy = -5;
    cat.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };
  //Right
  right.press = () => {
    cat.vx = 5;
    cat.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };
  //Down
  down.press = () => {
    cat.vy = 5;
    cat.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };
  //Set the game state
  state = play;
 
  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}
function gameLoop(delta){
  //Update the current game state:
  state(delta);
}
function play(delta) {
  //Use the cat's velocity to make it move
  cat.x += cat.vx;
  cat.y += cat.vy
}
//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };
  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };
  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );

  //1. Simple text
let message = new Text("Hello Pixi!");
//Position it and add it to the stage
message.position.set(54, 96);
//app.stage.addChild(message);
//2. Styled text
let style = new TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: "white",
  stroke: '#ff3300',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});
let styledMessage = new Text("Beat that WenYu", style);
//Position it and add it to the stage
styledMessage.position.set(130, 128);
//app.stage.addChild(styledMessage);
  return key;
}