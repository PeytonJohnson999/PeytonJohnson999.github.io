/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $('#board').width();
  const BOARD_HEIGHT = $("#board").height();
  const PADDLE_WIDTH = $("#paddle1").width();
  const PADDLE_HEIGHT = $("#paddle2").height();
  const X_OFFSET = 10;
  const NOTHING = 0;  //NO MAGIC NUMBERS
  const PADDLE_SPEED = 5;
  const KEY_CODE= {
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
  
  // Game Item Objects
  const paddle1 = {
    x : X_OFFSET,
    y : 0,
    velocityY : 0,
    id : "#paddle1",
  }

  const paddle2 = {
    x : BOARD_WIDTH - (PADDLE_WIDTH + X_OFFSET),  
    y : 0,
    velocityY : 0,
    id : "#paddle2",
  }

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);  
                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    updatePosition(paddle1)
    updatePosition(paddle2)
    checkBorderCollision(paddle1);
    checkBorderCollision(paddle2)
  }
  

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    ///////////
    ///////////
    // PLAYER 1
    ///////////
    ///////////
    if (event.which === KEY_CODE.W && paddle1.y >= 0){
        paddle1.velocityY = -1 * PADDLE_SPEED;
    }else if(event.which === KEY_CODE.S && paddle1.y + PADDLE_HEIGHT <= BOARD_HEIGHT){
      
        paddle1.velocityY = PADDLE_SPEED;
    }

    if (event.which === KEY_CODE.UP && paddle2.y >= 0){
      paddle2.velocityY = -1 * PADDLE_SPEED;
    }else if(event.which === KEY_CODE.DOWN && paddle2.y + PADDLE_HEIGHT <= BOARD_HEIGHT){
      
        paddle2.velocityY = PADDLE_SPEED;
    }
  }

  function handleKeyUp(event){
    //TODO: FLUID MOVEMENT AND PLAYER 2 MOVEMENT
    if ((event.which === KEY_CODE.W && paddle1.velocityY <= 0) || (event.which === KEY_CODE.S && paddle1.velocityY >= 0)){
      paddle1.velocityY = 0;
    }
    if ((event.which === KEY_CODE.UP && paddle2.velocityY <= 0) || (event.which === KEY_CODE.DOWN && paddle2.velocityY >= 0)){
      paddle2.velocityY = 0;
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

  function updatePosition(paddle){
    paddle.y += paddle.velocityY;
    $(paddle.id).css("left", paddle.x);
    $(paddle.id).css("top", paddle.y);
  }

  function canMove(paddle, direction){
    
  }

  function checkBorderCollision(paddle){
    //TODO: FIX
    if ((paddle.y >= BOARD_HEIGHT - PADDLE_HEIGHT && !(paddle.velocityY <= 0)) || (paddle.y <= 0 && !(paddle.velocityY >= 0))) {
      paddle.velocityY = 0;
    }
  }
  
}
