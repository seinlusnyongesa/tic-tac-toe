const gameBoard = (function () {
  const _gameBoard = new Array(9);

  const renderGameBoard = function () {
    _cell = document.querySelectorAll(".cell p");
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

  return { renderGameBoard, fillBoard, clearBoard };
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
})();
