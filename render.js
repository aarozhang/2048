import Game from "./engine/game.js";

let game = new Game(4);

game.onMove((gameState) => {
  updateBoard(gameState);
});

game.onWin((gameState) => {
  const $won = $("#won");
  $won.html(`You Win!`);
});

game.onLose((gameState) => {
  const $over = $("#over");
  $over.html(`Game Over`);
});

export const updateBoard = function (gameState) {
  const $won = $("#won");
  $won.html(``);
  const $over = $("#over");
  $over.html(``);
  const $score = $("#score");
  $score.html(`Score: ${gameState.score}`);

  for (let i = 0; i < gameState.board.length; i++) {
    const $entry = $(`#${i}`);
    if (gameState.board[i] == 0) {
      $entry.html(" ");
    } else {
      $entry.html(gameState.board[i]);
    }
  }
};

export const handleResetButtonPress = function (event) {
  game.setupNewGame();
  updateBoard(game.gameState);
};

export const handleKeyPress = (event) => {
  if (event.keyCode == 37) {
    game.move("left");
  }
  if (event.keyCode == 38) {
    game.move("up");
  }
  if (event.keyCode == 39) {
    game.move("right");
  }
  if (event.keyCode == 40) {
    game.move("down");
  }
};

export const loadBoardIntoDOM = function (gameState) {
  const $root = $("#root");
  //load inital board start
  updateBoard(gameState);

  $(window).on("keydown", handleKeyPress);
  $root.on("click", "#resetButton", handleResetButtonPress);
};

/**
 * Use jQuery to execute the loadBoard function after the page loads
 */
$(function () {
  loadBoardIntoDOM(game.gameState);
});
