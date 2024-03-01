/* global $, sessionStorage */

// Global variables
const KEY = {
  W : 87,
  A : 65,
  S : 83,
  D : 68,
  LEFT : 37,
  UP : 38,
  RIGHT : 39,
  DOWN : 40,
  MVMTKEYS : [87, 65, 83, 68, 37, 38, 39, 40],
};

const WALKSPEED = 7.5;
const BOARDWIDTH = 440;
const BOARDHEIGHT = 440;
const WALKERWIDTH = 50;
const WALKERHEIGHT = 50;

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 120;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  
  
  // Game Item Objects
  var walker = {
    positionX : 0,
    positionY : 0,
    speedX : 0,
    speedY : 0,
  }


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);   
  $(document).on('keyup', handleKeyUp)                        // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    
    repositionGameItem();
    redrawGameItem();
    checkBorderCollision();

    console.log("x: " + walker.positionX);
    console.log("y: " + walker.positionY)
    console.log("speed x: " + walker.speedX);
    console.log("speed y: " + walker.speedY)

    
  }

  function repositionGameItem(){
    // Changing walker's position
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
  }

  function redrawGameItem(){
    // Updating walker on the screen
    $("#walker").css('left', walker.positionX);
    $("#walker").css('top', walker.positionY);
  }

  function checkBorderCollision(){
    if ((walker.positionX >= BOARDWIDTH - WALKERWIDTH && !(walker.speedX <= 0))|| (walker.positionX <= 0 && !(walker.speedX >= 0))){
      walker.speedX = 0;
    }
    if ((walker.positionY >= BOARDHEIGHT - WALKERHEIGHT && !(walker.speedY <= 0)) || (walker.positionY <= 0 && !(walker.speedY >= 0))) {
      walker.speedY = 0;
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if ((event.which === KEY.A || event.which === KEY.LEFT) && !(walker.positionX <= 0)){
      walker.speedX = -1 * WALKSPEED;
      if (walker.speedY !== 0){
        walker.speedX /= 2;
      }
      // walker.speedX = -1 * WALKSPEED
    }else if ((event.which === KEY.W || event.which === KEY.UP) && !(walker.positionY <= 0)){
      walker.speedY = -1 * WALKSPEED
      if (walker.speedX !== 0){
        walker.speedY /= 2;
      }

      // walker.speedY = -1 * WALKSPEED
    }else if ((event.which === KEY.D || event.which === KEY.RIGHT) && !(walker.positionX >= BOARDWIDTH - WALKERWIDTH)){
      walker.speedX = WALKSPEED
      if (walker.speedY !== 0){
        walker.speedX /= 2;
      }

      // walker.speedX = WALKSPEED
    }else if ((event.which === KEY.S || event.which === KEY.DOWN) && !(walker.positionY >= BOARDHEIGHT - WALKERWIDTH)){
      walker.speedY = WALKSPEED
      if (walker.speedX !== 0){
        walker.speedY /= 2;
      }

      // walker.speedY = WALKSPEED
    }
  }

  function handleKeyUp(event){
    // When the player releases a movement key, stop their movement in that direction
    if ((event.which === KEY.A || event.which === KEY.LEFT) && !(walker.positionX <= 0)){
      if (walker.speedX < 0){
        walker.speedX = 0
      }

      if (walker.speedY > 0){
        walker.speedY = WALKSPEED
      }else if (walker.speedY < 0) {
        walker.speedY = -1 * WALKSPEED
      }

      // walker.speedX = 0
    }else if ((event.which === KEY.W || event.which === KEY.UP) && !(walker.positionY <= 0)){
      if (walker.speedY < 0){
        walker.speedY = 0
      }

      if (walker.speedX > 0){
        walker.speedX = WALKSPEED
      }else if(walker.speedX < 0){
        walker.speedX = -1 * WALKSPEED
      }

      // walker.speedY = 0
    }else if ((event.which === KEY.D || event.which === KEY.RIGHT) && !(walker.positionX >= BOARDWIDTH - WALKERWIDTH)){
      if (walker.speedX > 0){
        walker.speedX = 0
      }

      if (walker.speedY > 0){
        walker.speedY = WALKSPEED
      }else if (walker.speedY < 0) {
        walker.speedY = -1 * WALKSPEED
      }

      // walker.speedX = 0
    }else if ((event.which === KEY.S || event.which === KEY.DOWN) && !(walker.positionY >= BOARDHEIGHT - WALKERWIDTH)){
      if (walker.speedY > 0){
        walker.speedY = 0
      }

      if (walker.speedX > 0){
        walker.speedX = WALKSPEED
      }else if(walker.speedX < 0){
        walker.speedX = -1 * WALKSPEED
      }

      // walker.speedY = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
