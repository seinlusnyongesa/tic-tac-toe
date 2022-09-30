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
      } else {
        _cell[i].innerText = "";
      }
    }
  };

  const getEmptyBoardSlots = function () {
    let _emptySlotsArr = [];
    for (let i = 0; i < _gameBoard.length; i++) {
      if (_gameBoard[i] === undefined) {
        _emptySlotsArr.push(i);
      }
    }
    return _emptySlotsArr;
  };

  const fillBoard = function (idx, marker) {
    if (_gameBoard[idx] === undefined) {
      _gameBoard[idx] = marker;
      return true;
    }
    return false;
  };

  const clearBoard = function () {
    _gameBoard.fill(undefined);
    return;
  };

  return { renderGameBoard, fillBoard, clearBoard, board, getEmptyBoardSlots };
})();

function Player(sign) {
  let _sign = sign;
  const getSign = function () {
    return _sign;
  };

  const changeSign = function (sign) {
    _sign = sign;
    return _sign;
  };
  return { getSign, changeSign };
}

const Game = (function () {
  const _player1 = Player("x");
  const _player2 = Player("o");
  let _nextPlayer = _player1;

  const _x = document.querySelector(".x");
  const _o = document.querySelector(".o");

  _x.addEventListener("click", () => {
    _x.classList.add("x-active");
    _o.classList.remove("o-active");
    _nextPlayer = _player1;
    gameBoard.clearBoard();
    gameBoard.renderGameBoard();
  });

  _o.addEventListener("click", () => {
    _o.classList.add("o-active");
    _x.classList.remove("x-active");
    // _player2.changeSign("x");
    // _player1.changeSign("o");

    _nextPlayer = _player2;

    gameBoard.clearBoard();
  });

  const playerMove = function (idx) {
    if (gameBoard.fillBoard(idx, _nextPlayer.getSign()) === true) {
      gameBoard.renderGameBoard();
      if (endGame()) return;
      if (_nextPlayer.getSign() === _player1.getSign()) {
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

  const _gamestatus = (function () {
    return _winner;
  })();

  const endGame = function () {
    const winDiv = document.querySelector(".win");
    const winDisplay = document.querySelector(".win>p");

    const resetBtn = document.querySelector(".reset");

    resetBtn.addEventListener("click", () => {
      gameBoard.clearBoard();
      gameBoard.renderGameBoard();
      winDiv.classList.remove("show");
    });

    if (_gamestatus().state === "x" || _gamestatus().state === "o") {
      winDiv.classList.add("show");
      winDisplay.innerText = ` ${_gamestatus().state} wins`;
      return true;
    }

    if (_gamestatus().state === "draw") {
      winDiv.classList.add("show");
      winDisplay.innerText = `you draw`;
      return true;
    }
    return false;
  };

  return { playerMove };
})();

(function () {
  gameBoard.renderGameBoard();
})();
