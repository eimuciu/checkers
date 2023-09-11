function calculateQueenMoves(presentChecker, checkerColor) {
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
  for (let i = presentChecker.position; i > 0; i -= 9) {
    if (presentChecker.position === i) continue;
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
  for (let i = presentChecker.position; i < 63; i += 9) {
    if (presentChecker.position === i) continue;
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
  for (let i = presentChecker.position; i > 0; i -= 7) {
    if (presentChecker.position === i) continue;
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
  for (let i = presentChecker.position; i < 63; i += 7) {
    if (presentChecker.position === i) continue;
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

function otherQueenCheckersMoveValidity(moveIdx, activeChecker, moveColor) {
  console.log('Queen checker kick function');
  if (activeChecker.position !== moveIdx) {
    if (!mustMoves.length && !queenMustMoves.length) {
      return;
    }
    if (!queenMustMoves.length) {
      isMoveMadeWithOrWitoutAMustMove(moveIdx, activeChecker);
      return;
    }
    const selectedCheckerExistsInMustMoves = queenMustMoves.find(
      (x) => x.position === activeChecker.position,
    );
    if (!selectedCheckerExistsInMustMoves) {
      const proceedDeletion = (pos) => {
        getBoard[queenMustMoves[0].position].style.backgroundColor =
          'rgb(166, 195, 111)';
        getBoard[pos].style.backgroundColor = 'rgb(166, 195, 111)';
        getBoard[queenMustMoves[0].position].removeChild(
          getBoard[queenMustMoves[0].position].firstChild,
        );
        if (moveColor === 'white') {
          whiteCheckersList = whiteCheckersList.filter(
            (x) => x.position !== queenMustMoves[0].position,
          );
        }
        if (moveColor === 'black') {
          blackCheckersList = blackCheckersList.filter(
            (x) => x.position !== queenMustMoves[0].position,
          );
        }
      };
      if (
        queenMustMoves[0].mustUpRightKicks &&
        queenMustMoves[0].mustUpRightKicks.length
      ) {
        getBoard[queenMustMoves[0].position].style.backgroundColor = 'red';
        getBoard[queenMustMoves[0].mustUpRightKicks[0]].style.backgroundColor =
          'red';
        const timer = setTimeout(() => {
          proceedDeletion(queenMustMoves[0].mustUpRightKicks[0]);
        }, 2000);
        return;
      }
      if (
        queenMustMoves[0].mustUpLeftKicks &&
        queenMustMoves[0].mustUpLeftKicks.length
      ) {
        getBoard[queenMustMoves[0].position].style.backgroundColor = 'red';
        getBoard[queenMustMoves[0].mustUpLeftKicks[0]].style.backgroundColor =
          'red';
        const timer = setTimeout(() => {
          proceedDeletion(queenMustMoves[0].mustUpLeftKicks[0]);
        }, 2000);
        return;
      }
      if (
        queenMustMoves[0].mustDownRightKicks &&
        queenMustMoves[0].mustDownRightKicks.length
      ) {
        getBoard[queenMustMoves[0].position].style.backgroundColor = 'red';
        getBoard[
          queenMustMoves[0].mustDownRightKicks[0]
        ].style.backgroundColor = 'red';
        const timer = setTimeout(() => {
          proceedDeletion(queenMustMoves[0].mustDownRightKicks[0]);
        }, 2000);
        return;
      }
      if (
        queenMustMoves[0].mustDownLeftKicks &&
        queenMustMoves[0].mustDownLeftKicks.length
      ) {
        console.log(queenMustMoves[0]);
        getBoard[queenMustMoves[0].position].style.backgroundColor = 'red';
        getBoard[queenMustMoves[0].mustDownLeftKicks[0]].style.backgroundColor =
          'red';
        const timer = setTimeout(() => {
          proceedDeletion(queenMustMoves[0].mustDownLeftKicks[0]);
        }, 2000);
        return;
      }
    }
    if (selectedCheckerExistsInMustMoves) {
      const proceedDeletion = (pos, movePos) => {
        getBoard[
          selectedCheckerExistsInMustMoves.position
        ].style.backgroundColor = 'rgb(166, 195, 111)';
        getBoard[pos].style.backgroundColor = 'rgb(166, 195, 111)';
        getBoard[movePos].removeChild(getBoard[movePos].firstChild);
        if (moveColor === 'white') {
          whiteCheckersList = whiteCheckersList.filter(
            (x) => x.position !== movePos,
          );
        }
        if (moveColor === 'black') {
          blackCheckersList = blackCheckersList.filter(
            (x) => x.position !== movePos,
          );
        }
      };
      if (
        selectedCheckerExistsInMustMoves.mustUpRightKicks &&
        !selectedCheckerExistsInMustMoves.mustUpRightKicks.includes(moveIdx)
      ) {
        getBoard[
          selectedCheckerExistsInMustMoves.position
        ].style.backgroundColor = 'red';
        getBoard[
          selectedCheckerExistsInMustMoves.mustUpRightKicks[0]
        ].style.backgroundColor = 'red';
        const timer = setTimeout(() => {
          proceedDeletion(
            selectedCheckerExistsInMustMoves.mustUpRightKicks[0],
            moveIdx,
          );
        }, 2000);
        return;
      }
      if (
        selectedCheckerExistsInMustMoves.mustUpLeftKicks &&
        !selectedCheckerExistsInMustMoves.mustUpLeftKicks.includes(moveIdx)
      ) {
        getBoard[
          selectedCheckerExistsInMustMoves.position
        ].style.backgroundColor = 'red';
        getBoard[
          selectedCheckerExistsInMustMoves.mustUpLeftKicks[0]
        ].style.backgroundColor = 'red';
        const timer = setTimeout(() => {
          proceedDeletion(
            selectedCheckerExistsInMustMoves.mustUpLeftKicks[0],
            moveIdx,
          );
        }, 2000);
        return;
      }
      if (
        selectedCheckerExistsInMustMoves.mustDownRightKicks &&
        !selectedCheckerExistsInMustMoves.mustDownRightKicks.includes(moveIdx)
      ) {
        getBoard[
          selectedCheckerExistsInMustMoves.position
        ].style.backgroundColor = 'red';
        getBoard[
          selectedCheckerExistsInMustMoves.mustDownRightKicks[0]
        ].style.backgroundColor = 'red';
        const timer = setTimeout(() => {
          proceedDeletion(
            selectedCheckerExistsInMustMoves.mustDownRightKicks[0],
            moveIdx,
          );
        }, 2000);
        return;
      }
      if (
        selectedCheckerExistsInMustMoves.mustDownLeftKicks &&
        !selectedCheckerExistsInMustMoves.mustDownLeftKicks.includes(moveIdx)
      ) {
        getBoard[
          selectedCheckerExistsInMustMoves.position
        ].style.backgroundColor = 'red';
        getBoard[
          selectedCheckerExistsInMustMoves.mustDownLeftKicks[0]
        ].style.backgroundColor = 'red';
        const timer = setTimeout(() => {
          proceedDeletion(
            selectedCheckerExistsInMustMoves.mustDownLeftKicks[0],
            moveIdx,
          );
        }, 2000);
        return;
      }
    }
  }
  timer.addChecker({ color: moveColor, position: moveIdx });
}

function queenMove(
  presentChecker,
  moveCoordinate,
  checkersList,
  presentCheckerColor,
  queenMaking,
) {
  const queenPosition = presentChecker.position;
  const activeChecker = { ...presentChecker };
  const checkerColor = presentCheckerColor;

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

  // const removeQueenFromBoard = (availableMoves, moveCoordinate) => {
  //   // ALSO NEED TO REMOVE QUEEN FROM CHECKERS ARRAY

  //   const currentChecker = { ...activeChecker };
  //   function proceedRemoval() {
  //     getBoard[availableMoves[0]].style.backgroundColor = 'rgb(166, 195, 111)';
  //     getBoard[currentChecker.position].style.backgroundColor =
  //       'rgb(166, 195, 111)';
  //     getBoard[moveCoordinate].removeChild(getBoard[moveCoordinate].firstChild);
  //   }

  //   if (!availableMoves.includes(moveCoordinate)) {
  //     getBoard[availableMoves[0]].style.backgroundColor = 'red';
  //     getBoard[currentChecker.position].style.backgroundColor = 'red';
  //     const timer = setTimeout(proceedRemoval, 2000);
  //   }
  // };

  if (moveCoordinate !== presentChecker.position) {
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
        blackCheckersList = blackCheckersList.filter(
          (x) => x.position !== allowedUpLeftKicks[0],
        );
      }
      if (checkerColor === 'black') {
        blackCheckersList = blackCheckersList.map((item) => {
          if (queenPosition === item.position)
            return { ...item, position: moveCoordinate };
          return item;
        });
        whiteCheckersList = whiteCheckersList.filter(
          (x) => x.position !== allowedUpLeftKicks[0],
        );
      }
      // Reset moves
      presentChecker.color = '';
      presentChecker.position = null;
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
        blackCheckersList = blackCheckersList.filter(
          (x) => x.position !== allowedDownRightKicks[0],
        );
      }
      if (checkerColor === 'black') {
        blackCheckersList = blackCheckersList.map((item) => {
          if (queenPosition === item.position)
            return { ...item, position: moveCoordinate };
          return item;
        });
        whiteCheckersList = whiteCheckersList.filter(
          (x) => x.position !== allowedDownRightKicks[0],
        );
      }
      // Reset moves
      presentChecker.color = '';
      presentChecker.position = null;
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
        blackCheckersList = blackCheckersList.filter(
          (x) => x.position !== allowedUpRightKicks[0],
        );
      }
      if (checkerColor === 'black') {
        blackCheckersList = blackCheckersList.map((item) => {
          if (queenPosition === item.position)
            return { ...item, position: moveCoordinate };
          return item;
        });
        whiteCheckersList = whiteCheckersList.filter(
          (x) => x.position !== allowedUpRightKicks[0],
        );
      }
      // Reset moves
      presentChecker.color = '';
      presentChecker.position = null;
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
        blackCheckersList = blackCheckersList.filter(
          (x) => x.position !== allowedDownLeftKicks[0],
        );
      }
      if (checkerColor === 'black') {
        blackCheckersList = blackCheckersList.map((item) => {
          if (queenPosition === item.position)
            return { ...item, position: moveCoordinate };
          return item;
        });
        whiteCheckersList = whiteCheckersList.filter(
          (x) => x.position !== allowedDownLeftKicks[0],
        );
      }
      // Reset moves
      presentChecker.color = '';
      presentChecker.position = null;
      whosMove = checkerColor === 'white' ? 'black' : 'white';
    }

    // // Everything below is checking if the move was valid
    // if (
    //   (allowedDownLeftKicks.length &&
    //     !availableDownLeftMoves.includes(moveCoordinate) &&
    //     moveCoordinate !== presentChecker.position) ||
    //   (allowedDownLeftKicks.length &&
    //     availableDownLeftMoves.includes(moveCoordinate) &&
    //     moveCoordinate < allowedDownLeftKicks[0])
    // ) {
    //   // Must down left kicks
    //   removeQueenFromBoard(mustDownLeftKicks, moveCoordinate);
    //   return;
    // }

    // if (
    //   (allowedDownRightKicks.length &&
    //     !availableDownRightMoves.includes(moveCoordinate) &&
    //     moveCoordinate !== presentChecker.position) ||
    //   (allowedDownRightKicks.length &&
    //     availableDownRightMoves.includes(moveCoordinate) &&
    //     moveCoordinate < allowedDownRightKicks[0])
    // ) {
    //   // Must down right kicks
    //   removeQueenFromBoard(mustDownRightKicks, moveCoordinate);
    //   return;
    // }

    // if (
    //   (allowedUpLeftKicks.length &&
    //     !availableUpLeftMoves.includes(moveCoordinate) &&
    //     moveCoordinate !== presentChecker.position) ||
    //   (allowedUpLeftKicks.length &&
    //     availableUpLeftMoves.includes(moveCoordinate) &&
    //     moveCoordinate > allowedUpLeftKicks[0])
    // ) {
    //   // Must up left kicks
    //   removeQueenFromBoard(mustUpLeftKicks, moveCoordinate);
    //   return;
    // }

    // if (
    //   (allowedUpRightKicks.length &&
    //     !allowedUpRightKicks.includes(moveCoordinate) &&
    //     moveCoordinate !== presentChecker.position) ||
    //   (allowedUpRightKicks.length &&
    //     availableUpRightMoves.includes(moveCoordinate) &&
    //     moveCoordinate > allowedUpRightKicks[0])
    // ) {
    //   // Must up right kicks
    //   removeQueenFromBoard(mustUpRightKicks, moveCoordinate);
    //   return;
    // }

    otherQueenCheckersMoveValidity(
      moveCoordinate,
      activeChecker,
      presentCheckerColor,
    );
  }
}
