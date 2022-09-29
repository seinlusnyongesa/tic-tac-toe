const gameBoard = (function () {
  const _gameBoard = new Array(9);

  const board = () => _gameBoard;

  const renderGameBoard = function () {
    _cell = document.querySelectorAll(".cell p");
    _btn = document.querySelectorAll(".cell");

    (function () {
      for (let i = 0; i < _btn.length; i++) {
        _btn[i].addEventListener("click", function () {
          Game.playerMove.call(this, i);
        });
      }
    })();

    for (let i = 0; i < _cell.length; i++) {
      if (_gameBoard[i] !== undefined) {
        _cell[i].innerText = _gameBoard[i];
      }
    }
  };

  const fillBoard = function (idx, marker) {
    if (_gameBoard[idx] === undefined) {
      _gameBoard[idx] = marker;
      return true;
    }
    return false;
  };

  const clearBoard = function () {
    for (let i; i < gameBoard.length; i++) {
      _gameBoard[i] = undefined;
    }
    return;
  };

  return { renderGameBoard, fillBoard, clearBoard, board };
})();

function Player(sign) {
  const _sign = sign;
  const getSign = function () {
    return _sign;
  };

  return { getSign };
}

const Game = (function () {
  const _player1 = Player("x");
  const _player2 = Player("o");
  let _nextPlayer = _player1;

  const playerMove = function (idx) {
    if (gameBoard.fillBoard(idx, _nextPlayer.getSign()) === true) {
      gameBoard.renderGameBoard();
      console.log(_winner(_nextPlayer.getSign()));
      if (_nextPlayer.getSign() === "x") {
        _nextPlayer = _player2;
      } else {
        _nextPlayer = _player1;
      }
    }
    return;
  };

  // check for win
  //   [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //   ];

  const _checkDiagonalWin = function (sign) {
    if (
      (gameBoard.board()[0] === sign &&
        gameBoard.board()[4] === sign &&
        gameBoard.board()[8] === sign) ||
      (gameBoard.board()[2] === sign &&
        gameBoard.board()[4] === sign &&
        gameBoard.board()[6] === sign)
    )
      return true;
    return false;
  };

  const _checkRowWin = function (sign) {
    if (
      (gameBoard.board()[0] === sign &&
        gameBoard.board()[1] === sign &&
        gameBoard.board()[2] === sign) ||
      (gameBoard.board()[3] === sign &&
        gameBoard.board()[4] === sign &&
        gameBoard.board()[5] === sign) ||
      (gameBoard.board()[6] === sign &&
        gameBoard.board()[7] === sign &&
        gameBoard.board()[8] === sign)
    )
      return true;
    return false;
  };

  const _checkColumnWin = function (sign) {
    if (
      (gameBoard.board()[0] === sign &&
        gameBoard.board()[3] === sign &&
        gameBoard.board()[6] === sign) ||
      (gameBoard.board()[1] === sign &&
        gameBoard.board()[4] === sign &&
        gameBoard.board()[7] === sign) ||
      (gameBoard.board()[2] === sign &&
        gameBoard.board()[5] === sign &&
        gameBoard.board()[8] === sign)
    )
      return true;

    return false;
  };

  const _winner = function () {
    const _sign = _nextPlayer.getSign();
    if (
      _checkDiagonalWin(_sign) ||
      _checkColumnWin(_sign) ||
      _checkRowWin(_sign)
    )
      return { state: _nextPlayer.getSign() };
    if (!gameBoard.board().includes(undefined)) {
      return { state: "draw" };
    }

    return { state: "playing" };
  };

  const _gamestatus = function () {
    return _winner;
  };

  //   const endGame = function(){

  //   }

  return { playerMove };
})();

(function () {
  gameBoard.renderGameBoard();
})();
