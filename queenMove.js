function calculateQueenMoves(activeChecker, checkerColor) {
  // All available moves
  const availableUpLeftMoves = [];
  const availableUpRightMoves = [];
  const availableDownRightMoves = [];
  const availableDownLeftMoves = [];
  // All available kicks
  const allowedUpLeftKicks = [];
  const allowedUpRightKicks = [];
  const allowedDownRightKicks = [];
  const allowedDownLeftKicks = [];

  // Wall coordinates
  const leftWall = [8, 24, 40, 56];
  const topWall = [1, 3, 5, 7];
  const rightWall = [7, 23, 39, 55];
  const bottomWall = [56, 58, 60, 62];

  // Calculate available moves for up left coordinates
  for (let i = activeChecker.position; i > 0; i -= 9) {
    if (activeChecker.position === i) continue;
    if (leftWall.includes(i)) {
      if (!getBoard[i].hasChildNodes()) {
        availableUpLeftMoves.push(i);
      }
      break;
    }
    if (topWall.includes(i)) {
      if (!getBoard[i].hasChildNodes()) {
        availableUpLeftMoves.push(i);
      }
      break;
    }
    if (getBoard[i].hasChildNodes() && getBoard[i - 9].hasChildNodes()) {
      break;
    }
    if (
      getBoard[i].hasChildNodes() &&
      getBoard[i].firstChild.getAttribute('name') === checkerColor
    ) {
      break;
    }
    if (getBoard[i].hasChildNodes()) {
      allowedUpLeftKicks.push(i);
      continue;
    }
    availableUpLeftMoves.push(i);
  }

  // Calculate available moves for down right coordinates
  for (let i = activeChecker.position; i < 63; i += 9) {
    if (activeChecker.position === i) continue;
    if (rightWall.includes(i)) {
      if (!getBoard[i].hasChildNodes()) {
        availableDownRightMoves.push(i);
      }
      break;
    }
    if (bottomWall.includes(i)) {
      if (!getBoard[i].hasChildNodes()) {
        availableDownRightMoves.push(i);
      }
      break;
    }
    if (getBoard[i].hasChildNodes() && getBoard[i + 9].hasChildNodes()) {
      break;
    }
    if (
      getBoard[i].hasChildNodes() &&
      getBoard[i].firstChild.getAttribute('name') === checkerColor
    ) {
      break;
    }
    if (getBoard[i].hasChildNodes()) {
      allowedDownRightKicks.push(i);
      continue;
    }
    availableDownRightMoves.push(i);
  }

  // Calculate available moves for up right coordinates
  for (let i = activeChecker.position; i > 0; i -= 7) {
    if (activeChecker.position === i) continue;
    if (rightWall.includes(i)) {
      if (!getBoard[i].hasChildNodes()) {
        availableUpRightMoves.push(i);
      }
      break;
    }
    if (topWall.includes(i)) {
      if (!getBoard[i].hasChildNodes()) {
        availableUpRightMoves.push(i);
      }
      break;
    }
    if (bottomWall.includes(i)) {
      if (!getBoard[i].hasChildNodes()) {
        availableDownRightMoves.push(i);
      }
      break;
    }
    if (getBoard[i].hasChildNodes() && getBoard[i - 7].hasChildNodes()) {
      break;
    }
    if (
      getBoard[i].hasChildNodes() &&
      getBoard[i].firstChild.getAttribute('name') === checkerColor
    ) {
      break;
    }
    if (getBoard[i].hasChildNodes()) {
      allowedUpRightKicks.push(i);
      continue;
    }
    availableUpRightMoves.push(i);
  }

  // Calculate available moves for down left coordinates
  for (let i = activeChecker.position; i < 63; i += 7) {
    if (activeChecker.position === i) continue;
    if (leftWall.includes(i)) {
      if (!getBoard[i].hasChildNodes()) {
        availableDownLeftMoves.push(i);
      }
      break;
    }
    if (bottomWall.includes(i)) {
      if (!getBoard[i].hasChildNodes()) {
        availableDownLeftMoves.push(i);
      }
      break;
    }
    if (getBoard[i].hasChildNodes() && getBoard[i + 7].hasChildNodes()) {
      break;
    }
    if (
      getBoard[i].hasChildNodes() &&
      getBoard[i].firstChild.getAttribute('name') === checkerColor
    ) {
      break;
    }
    if (getBoard[i].hasChildNodes()) {
      allowedDownLeftKicks.push(i);
      continue;
    }
    availableDownLeftMoves.push(i);
  }

  let mustDownLeftKicks = [];
  let mustDownRightKicks = [];
  let mustUpLeftKicks = [];
  let mustUpRightKicks = [];

  if (availableDownLeftMoves.length && allowedDownLeftKicks.length) {
    // Must down left kicks
    mustDownLeftKicks = availableDownLeftMoves.filter(
      (x) => x > allowedDownLeftKicks[0],
    );
  }

  if (availableDownRightMoves.length && allowedDownRightKicks.length) {
    // Must down right kicks
    mustDownRightKicks = availableDownRightMoves.filter(
      (x) => x > allowedDownRightKicks[0],
    );
  }

  if (availableUpLeftMoves.length && allowedUpLeftKicks.length) {
    // Must up left kicks
    mustUpLeftKicks = availableUpLeftMoves.filter(
      (x) => x < allowedUpLeftKicks[0],
    );
  }

  if (availableUpRightMoves.length && allowedUpRightKicks.length) {
    // Must up right kicks
    mustUpRightKicks = availableUpRightMoves.filter(
      (x) => x < allowedUpRightKicks[0],
    );
  }

  return {
    // All available moves
    availableUpLeftMoves,
    availableUpRightMoves,
    availableDownRightMoves,
    availableDownLeftMoves,
    // All available kicks
    allowedUpLeftKicks,
    allowedUpRightKicks,
    allowedDownRightKicks,
    allowedDownLeftKicks,
    // All must kicks
    mustDownLeftKicks,
    mustDownRightKicks,
    mustUpLeftKicks,
    mustUpRightKicks,
  };
}

function queenMove(
  activeChecker,
  moveCoordinate,
  checkersList,
  checkerColor,
  queenMaking,
) {
  const queenPosition = activeChecker.position;

  const {
    // All available moves
    availableUpLeftMoves,
    availableUpRightMoves,
    availableDownRightMoves,
    availableDownLeftMoves,
    // All available kicks
    allowedUpLeftKicks,
    allowedUpRightKicks,
    allowedDownRightKicks,
    allowedDownLeftKicks,
    // All must kicks
    mustDownLeftKicks,
    mustDownRightKicks,
    mustUpLeftKicks,
    mustUpRightKicks,
  } = calculateQueenMoves(activeChecker, checkerColor);

  const removeQueenFromBoard = (availableMoves) => {
    const currentChecker = { ...activeChecker };
    function proceedRemoval() {
      getBoard[availableMoves[0]].style.backgroundColor = 'rgb(166, 195, 111)';
      getBoard[currentChecker.position].style.backgroundColor =
        'rgb(166, 195, 111)';
      getBoard[moveCoordinate].removeChild(getBoard[moveCoordinate].firstChild);
    }

    if (!availableMoves.includes(moveCoordinate)) {
      getBoard[availableMoves[0]].style.backgroundColor = 'red';
      getBoard[currentChecker.position].style.backgroundColor = 'red';
      const timer = setTimeout(proceedRemoval, 2000);
    }
  };

  if (
    (allowedDownLeftKicks.length &&
      !availableDownLeftMoves.includes(moveCoordinate) &&
      moveCoordinate !== activeChecker.position) ||
    (allowedDownLeftKicks.length &&
      availableDownLeftMoves.includes(moveCoordinate) &&
      moveCoordinate < allowedDownLeftKicks[0])
  ) {
    // Must down left kicks
    removeQueenFromBoard(mustDownLeftKicks);
  }

  if (
    (allowedDownRightKicks.length &&
      !availableDownRightMoves.includes(moveCoordinate) &&
      moveCoordinate !== activeChecker.position) ||
    (allowedDownRightKicks.length &&
      availableDownRightMoves.includes(moveCoordinate) &&
      moveCoordinate < allowedDownRightKicks[0])
  ) {
    // Must down right kicks
    removeQueenFromBoard(mustDownRightKicks);
  }

  if (
    (allowedUpLeftKicks.length &&
      !availableUpLeftMoves.includes(moveCoordinate) &&
      moveCoordinate !== activeChecker.position) ||
    (allowedUpLeftKicks.length &&
      availableUpLeftMoves.includes(moveCoordinate) &&
      moveCoordinate > allowedUpLeftKicks[0])
  ) {
    // Must up left kicks
    removeQueenFromBoard(mustUpLeftKicks);
  }

  if (
    (allowedUpRightKicks.length &&
      !allowedUpRightKicks.includes(moveCoordinate) &&
      moveCoordinate !== activeChecker.position) ||
    (allowedUpRightKicks.length &&
      availableUpRightMoves.includes(moveCoordinate) &&
      moveCoordinate > allowedUpRightKicks[0])
  ) {
    // Must up right kicks
    removeQueenFromBoard(mustUpRightKicks);
  }

  // Make left up move with a queen
  if (availableUpLeftMoves.includes(moveCoordinate)) {
    getBoard[moveCoordinate].appendChild(queenMaking());
    getBoard[queenPosition].removeChild(getBoard[queenPosition].firstChild);
    allowedUpLeftKicks.forEach((kickPosition) => {
      if (kickPosition > moveCoordinate) {
        getBoard[kickPosition].removeChild(getBoard[kickPosition].firstChild);
      }
    });
    // Update checkers array with coordinates
    if (checkerColor === 'white') {
      whiteCheckersList = whiteCheckersList.map((item) => {
        if (queenPosition === item.position)
          return { ...item, position: moveCoordinate };
        return item;
      });
    }
    if (checkerColor === 'black') {
      blackCheckersList = blackCheckersList.map((item) => {
        if (queenPosition === item.position)
          return { ...item, position: moveCoordinate };
        return item;
      });
    }
    // Reset moves
    activeChecker.color = '';
    activeChecker.position = null;
    whosMove = checkerColor === 'white' ? 'black' : 'white';
  }

  // Make right down move with a queen
  if (availableDownRightMoves.includes(moveCoordinate)) {
    getBoard[moveCoordinate].appendChild(queenMaking());
    getBoard[queenPosition].removeChild(getBoard[queenPosition].firstChild);
    allowedDownRightKicks.forEach((kickPosition) => {
      if (kickPosition < moveCoordinate) {
        getBoard[kickPosition].removeChild(getBoard[kickPosition].firstChild);
      }
    });
    // Update checkers array with coordinates
    if (checkerColor === 'white') {
      whiteCheckersList = whiteCheckersList.map((item) => {
        if (queenPosition === item.position)
          return { ...item, position: moveCoordinate };
        return item;
      });
    }
    if (checkerColor === 'black') {
      blackCheckersList = blackCheckersList.map((item) => {
        if (queenPosition === item.position)
          return { ...item, position: moveCoordinate };
        return item;
      });
    }
    // Reset moves
    activeChecker.color = '';
    activeChecker.position = null;
    whosMove = checkerColor === 'white' ? 'black' : 'white';
  }

  // Make right up move with a queen
  if (availableUpRightMoves.includes(moveCoordinate)) {
    getBoard[moveCoordinate].appendChild(queenMaking());
    getBoard[queenPosition].removeChild(getBoard[queenPosition].firstChild);
    allowedUpRightKicks.forEach((kickPosition) => {
      if (kickPosition > moveCoordinate) {
        getBoard[kickPosition].removeChild(getBoard[kickPosition].firstChild);
      }
    });
    // Update checkers array with coordinates
    if (checkerColor === 'white') {
      whiteCheckersList = whiteCheckersList.map((item) => {
        if (queenPosition === item.position)
          return { ...item, position: moveCoordinate };
        return item;
      });
    }
    if (checkerColor === 'black') {
      blackCheckersList = blackCheckersList.map((item) => {
        if (queenPosition === item.position)
          return { ...item, position: moveCoordinate };
        return item;
      });
    }
    // Reset moves
    activeChecker.color = '';
    activeChecker.position = null;
    whosMove = checkerColor === 'white' ? 'black' : 'white';
  }

  // Make left down move with a queen
  if (availableDownLeftMoves.includes(moveCoordinate)) {
    getBoard[moveCoordinate].appendChild(queenMaking());
    getBoard[queenPosition].removeChild(getBoard[queenPosition].firstChild);
    allowedDownLeftKicks.forEach((kickPosition) => {
      if (kickPosition < moveCoordinate) {
        getBoard[kickPosition].removeChild(getBoard[kickPosition].firstChild);
      }
    });
    // Update checkers array with coordinates
    if (checkerColor === 'white') {
      whiteCheckersList = whiteCheckersList.map((item) => {
        if (queenPosition === item.position)
          return { ...item, position: moveCoordinate };
        return item;
      });
    }
    if (checkerColor === 'black') {
      blackCheckersList = blackCheckersList.map((item) => {
        if (queenPosition === item.position)
          return { ...item, position: moveCoordinate };
        return item;
      });
    }
    // Reset moves
    activeChecker.color = '';
    activeChecker.position = null;
    whosMove = checkerColor === 'white' ? 'black' : 'white';
  }
}
