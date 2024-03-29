// ***todos***
// Padaryt kad kirtimas butinas
// Padaryt keleta galimu kirtimu

const body = document.body;
body.style.padding = '50px';

const board = document.createElement('div');
board.style.width = '100%';
board.style.display = 'flex';
board.style.flexWrap = 'wrap';
board.style.justifyContent = 'center';
board.style.boxSizing = 'border-box';

const getBoard = board.childNodes;
const rows = 8;
const columns = 8;
const selectedChecker = {
  color: '',
  position: null,
};
let whosMove = 'white';
let whiteCheckersList = [];
let blackCheckersList = [];

// const h3El = document.createElement("h3");

// document.body.prepend(h3El);

const createMainContainer = (board) => {
  const mainContainer = document.createElement('div');
  mainContainer.style.width = '40%';
  mainContainer.style.backgroundColor = '#1E352F';
  mainContainer.style.margin = '0 auto';
  mainContainer.style.padding = '20px 10px 20px 10px';
  mainContainer.appendChild(board);
  return mainContainer;
};

const createBlackChecker = () => {
  const checker = document.createElement('div');
  checker.style.width = '80%';
  checker.style.height = '80%';
  checker.style.borderRadius = '50%';
  checker.style.backgroundColor = 'black';
  checker.style.display = 'flex';
  checker.style.justifyContent = 'center';
  checker.style.alignItems = 'center';
  checker.setAttribute('name', 'black');
  const circle = document.createElement('div');
  circle.style.width = '50%';
  circle.style.height = '50%';
  circle.style.borderRadius = '50%';
  circle.style.border = '1px solid white';
  checker.appendChild(circle);
  return checker;
};
const createWhiteChecker = () => {
  const checker = document.createElement('div');
  checker.style.width = '80%';
  checker.style.height = '80%';
  checker.style.borderRadius = '50%';
  checker.style.backgroundColor = 'white';
  checker.style.display = 'flex';
  checker.style.justifyContent = 'center';
  checker.style.alignItems = 'center';
  checker.setAttribute('name', 'white');
  const circle = document.createElement('div');
  circle.style.width = '50%';
  circle.style.height = '50%';
  circle.style.borderRadius = '50%';
  circle.style.border = '1px solid black';
  checker.appendChild(circle);
  return checker;
};

const createWhiteQueen = () => {
  const checker = createWhiteChecker();
  checker.style.backgroundColor = 'lightblue';
  return checker;
};

const createBlackQueen = () => {
  const checker = createBlackChecker();
  checker.style.backgroundColor = 'grey';
  return checker;
};

const createCell = (checker, color) => {
  const cellHeight = board.clientWidth * 0.123;
  const cell = document.createElement('div');
  cell.style.width = '12%';
  cell.style.height = cellHeight + 'px';
  if (color) {
    cell.style.backgroundColor = color;
  } else {
    cell.style.backgroundColor = 'white';
  }
  cell.style.display = 'flex';
  cell.style.justifyContent = 'center';
  cell.style.alignItems = 'center';
  cell.classList.add('cell');
  if (checker) {
    cell.appendChild(checker);
  }
  return cell;
};

const createBoard = () => {
  for (let i = 0; i < rows; i++) {
    for (let y = 0; y < columns; y++) {
      if (i === 0 || i === 1 || i === 2) {
        if ((i % 2 === 0) & (y % 2 === 1)) {
          board.appendChild(createCell(createWhiteChecker(), '#A6C36F'));
          whiteCheckersList.push({
            isQueen: false,
            position: i === 0 ? i * 8 + y : i === 2 ? i * 8 + y : null,
          });
        } else if ((i % 2 === 1) & (y % 2 === 0)) {
          board.appendChild(createCell(createWhiteChecker(), '#A6C36F'));
          whiteCheckersList.push({
            isQueen: false,
            position: i === 1 ? i * 8 + y : null,
          });
        } else {
          board.appendChild(createCell());
        }
      } else if (i === rows - 1 || i === rows - 2 || i === rows - 3) {
        if ((i % 2 === 0) & (y % 2 === 1)) {
          board.appendChild(createCell(createBlackChecker(), '#A6C36F'));
          blackCheckersList.push({
            isQueen: false,
            position: i === rows - 2 ? i * 8 + y : null,
          });
        } else if ((i % 2 === 1) & (y % 2 === 0)) {
          board.appendChild(createCell(createBlackChecker(), '#A6C36F'));
          blackCheckersList.push({
            isQueen: false,
            position: i === rows - 1 ? i * 8 + y : rows - 3 ? i * 8 + y : null,
          });
        } else {
          board.appendChild(createCell());
        }
      } else {
        if ((i % 2 === 0) & (y % 2 === 1)) {
          board.appendChild(createCell(null, '#A6C36F'));
        } else if ((i % 2 === 1) & (y % 2 === 0)) {
          board.appendChild(createCell(null, '#A6C36F'));
        } else {
          board.appendChild(createCell());
        }
      }
    }
  }
};

const removeColor = (index) => {
  for (let i = 0; i < getBoard.length; i++) {
    if (getBoard[i].childNodes.length > 0) {
      const attributeValue = getBoard[i].firstChild.getAttribute('name');

      if (i !== index) {
        if (getBoard[i].childNodes.length > 0) {
          if (attributeValue === 'white') {
            const isCheckerAvailable = whiteCheckersList.find(
              (item) => item.position === i,
            );
            getBoard[i].firstChild.style.backgroundColor =
              isCheckerAvailable && isCheckerAvailable.isQueen
                ? 'lightblue'
                : 'white';
          }
          if (attributeValue === 'black') {
            const isCheckerAvailable = blackCheckersList.find(
              (item) => item.position === i,
            );
            getBoard[i].firstChild.style.backgroundColor =
              isCheckerAvailable && isCheckerAvailable.isQueen
                ? 'grey'
                : 'black';
          }
        }
      }
    }
  }
};

const checkerClickListener = () => {
  for (let i = 0; i < getBoard.length; i++) {
    getBoard[i].addEventListener('click', () => {
      if (getBoard[i].childNodes.length > 0) {
        const attributeValue = getBoard[i].firstChild.getAttribute('name');
        if (whosMove === 'white' && attributeValue === 'white') {
          getBoard[i].firstChild.style.backgroundColor = '#BEEF9E';
        }
        if (whosMove === 'black' && attributeValue === 'black') {
          getBoard[i].firstChild.style.backgroundColor = '#BEEF9E';
        }
        selectedChecker.color = attributeValue;
        selectedChecker.position = i;
        removeColor(i);
      } else {
        return;
      }
    });
  }
};

function whiteQueenMaking(num, coord) {
  if (selectedChecker.position + num > 55) {
    getBoard[coord].firstChild.style.backgroundColor = 'lightblue';
  }
  whiteCheckersList = whiteCheckersList.map((item) => {
    if (
      selectedChecker.position === item.position &&
      selectedChecker.position + num > 55
    )
      return {
        ...item,
        position: selectedChecker.position + num,
        isQueen: true,
      };
    if (selectedChecker.position === item.position)
      return { ...item, position: selectedChecker.position + num };
    return item;
  });
}

function blackQueenMaking(num, coord) {
  if (selectedChecker.position + num < 8) {
    getBoard[coord].firstChild.style.backgroundColor = 'grey';
  }
  blackCheckersList = blackCheckersList.map((item) => {
    if (
      selectedChecker.position === item.position &&
      selectedChecker.position + num < 8
    )
      return {
        ...item,
        position: selectedChecker.position + num,
        isQueen: true,
      };
    if (selectedChecker.position === item.position)
      return { ...item, position: selectedChecker.position + num };
    return item;
  });
}

function queenMove(
  activeChecker,
  moveCoordinate,
  checkersList,
  checkerColor,
  queenMaking,
) {
  const queenPosition = activeChecker.position;

  // All available moves
  const availableUpLeftMoves = [];
  const allowedUpLeftKicks = [];
  const availableDownRightMoves = [];
  const allowedDownRightKicks = [];
  const availableUpRightMoves = [];
  const allowedUpRightKicks = [];
  const availableDownLeftMoves = [];
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

const checkerMoveClickListener = () => {
  for (let i = 0; i < getBoard.length; i++) {
    getBoard[i].addEventListener('click', () => {
      if (selectedChecker.position) {
        // White checker move
        if (selectedChecker.color === 'white' && whosMove === 'white') {
          // White queen moves
          const isCheckerAvailable = whiteCheckersList.find(
            (item) => item.position === selectedChecker.position,
          );
          if (isCheckerAvailable && isCheckerAvailable.isQueen)
            return queenMove(
              selectedChecker,
              i,
              whiteCheckersList,
              'white',
              createWhiteQueen,
            );
          // White checker moving down left
          if (
            i === selectedChecker.position + 7 &&
            getBoard[i] &&
            getBoard[i].childNodes.length <= 0 &&
            selectedChecker.color === 'white'
          ) {
            if (
              selectedChecker.position === 8 ||
              selectedChecker.position === 24 ||
              selectedChecker.position === 40 ||
              selectedChecker.position === 56
            ) {
              return;
            }
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );
            // Queen making
            whiteQueenMaking(7, i);

            // Resetting moves
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'black';

            // White checker moving down right
          }
          if (
            i === selectedChecker.position + 9 &&
            getBoard[i] &&
            getBoard[i].childNodes.length <= 0 &&
            selectedChecker.color === 'white'
          ) {
            if (
              selectedChecker.position === 7 ||
              selectedChecker.position === 23 ||
              selectedChecker.position === 39 ||
              selectedChecker.position === 55
            ) {
              return;
            }

            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );
            //Queen making
            whiteQueenMaking(9, i);

            //Resetting moves
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'black';
          }
          // White checker beat down left
          if (
            getBoard[selectedChecker.position + 7] &&
            getBoard[selectedChecker.position + 14] &&
            getBoard[selectedChecker.position + 7].childNodes.length > 0 &&
            getBoard[selectedChecker.position + 7].firstChild.getAttribute(
              'name',
            ) !== 'white' &&
            getBoard[selectedChecker.position + 14].childNodes.length <= 0 &&
            i === selectedChecker.position + 14
          ) {
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );
            getBoard[selectedChecker.position + 7].removeChild(
              getBoard[selectedChecker.position + 7].firstChild,
            );

            //Queen making!
            whiteQueenMaking(14, i);

            //Resetting moves
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'black';
          }

          // White checker beat down right
          if (
            getBoard[selectedChecker.position + 9] &&
            getBoard[selectedChecker.position + 18] &&
            getBoard[selectedChecker.position + 9].childNodes.length > 0 &&
            getBoard[selectedChecker.position + 9].firstChild.getAttribute(
              'name',
            ) !== 'white' &&
            getBoard[selectedChecker.position + 18].childNodes.length <= 0 &&
            i === selectedChecker.position + 18
          ) {
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );
            getBoard[selectedChecker.position + 9].removeChild(
              getBoard[selectedChecker.position + 9].firstChild,
            );

            //Queen making
            whiteQueenMaking(18, i);

            //Resetting moves
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'black';
          }

          // White checker beat back right
          if (
            selectedChecker.position &&
            getBoard[selectedChecker.position - 7] &&
            getBoard[selectedChecker.position - 14] &&
            getBoard[selectedChecker.position - 7].childNodes.length > 0 &&
            getBoard[selectedChecker.position - 7].firstChild.getAttribute(
              'name',
            ) !== 'white' &&
            getBoard[selectedChecker.position - 14].childNodes.length <= 0 &&
            i === selectedChecker.position - 14
          ) {
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );
            getBoard[selectedChecker.position - 7].removeChild(
              getBoard[selectedChecker.position - 7].firstChild,
            );
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'black';
          }

          // White checker beat back left
          if (
            selectedChecker.position &&
            getBoard[selectedChecker.position - 9] &&
            getBoard[selectedChecker.position - 18] &&
            getBoard[selectedChecker.position - 9].childNodes.length > 0 &&
            getBoard[selectedChecker.position - 9].firstChild.getAttribute(
              'name',
            ) !== 'white' &&
            getBoard[selectedChecker.position - 18].childNodes.length <= 0 &&
            i === selectedChecker.position - 18
          ) {
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );
            getBoard[selectedChecker.position - 9].removeChild(
              getBoard[selectedChecker.position - 9].firstChild,
            );
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'black';
          }
        }

        // Black checker move
        if (selectedChecker.color === 'black' && whosMove === 'black') {
          // Black queen moves
          const isCheckerAvailable = blackCheckersList.find(
            (item) => item.position === selectedChecker.position,
          );
          if (isCheckerAvailable && isCheckerAvailable.isQueen)
            return queenMove(
              selectedChecker,
              i,
              blackCheckersList,
              'black',
              createBlackQueen,
            );
          // Black checker moving up right
          if (
            i === selectedChecker.position - 7 &&
            getBoard[i] &&
            getBoard[i].childNodes.length <= 0 &&
            selectedChecker.color === 'black'
          ) {
            if (
              selectedChecker.position === 7 ||
              selectedChecker.position === 23 ||
              selectedChecker.position === 39 ||
              selectedChecker.position === 55
            ) {
              return;
            }
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );

            //Queen making
            blackQueenMaking(-7, i);

            //Resetting moves
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'white';
          }

          // Black checker moving up left
          if (
            i === selectedChecker.position - 9 &&
            getBoard[i] &&
            getBoard[i].childNodes.length <= 0 &&
            selectedChecker.color === 'black'
          ) {
            if (
              selectedChecker.position === 8 ||
              selectedChecker.position === 24 ||
              selectedChecker.position === 40 ||
              selectedChecker.position === 56
            ) {
              return;
            }
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );

            //Queen making
            blackQueenMaking(-9, i);

            // Resetting moves
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'white';
          }

          // Black checker beat up right
          if (
            selectedChecker.position &&
            getBoard[selectedChecker.position - 7] &&
            getBoard[selectedChecker.position - 14] &&
            getBoard[selectedChecker.position - 7].childNodes.length > 0 &&
            getBoard[selectedChecker.position - 7].firstChild.getAttribute(
              'name',
            ) !== 'black' &&
            getBoard[selectedChecker.position - 14].childNodes.length <= 0 &&
            i === selectedChecker.position - 14
          ) {
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );
            getBoard[selectedChecker.position - 7].removeChild(
              getBoard[selectedChecker.position - 7].firstChild,
            );
            // Queen making
            blackQueenMaking(-14, i);

            // Resetting moves
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'white';
          }

          // Black checker beat up left
          if (
            selectedChecker.position &&
            getBoard[selectedChecker.position - 9] &&
            getBoard[selectedChecker.position - 18] &&
            getBoard[selectedChecker.position - 9].childNodes.length > 0 &&
            getBoard[selectedChecker.position - 9].firstChild.getAttribute(
              'name',
            ) !== 'black' &&
            getBoard[selectedChecker.position - 18].childNodes.length <= 0 &&
            i === selectedChecker.position - 18
          ) {
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );
            getBoard[selectedChecker.position - 9].removeChild(
              getBoard[selectedChecker.position - 9].firstChild,
            );
            // Queen making
            blackQueenMaking(-18, i);

            // Resetting moves
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'white';
          }

          // Black checker beat back left
          if (
            selectedChecker.position &&
            getBoard[selectedChecker.position + 7] &&
            getBoard[selectedChecker.position + 14] &&
            getBoard[selectedChecker.position + 7].childNodes.length > 0 &&
            getBoard[selectedChecker.position + 7].firstChild.getAttribute(
              'name',
            ) !== 'black' &&
            getBoard[selectedChecker.position + 14].childNodes.length <= 0 &&
            i === selectedChecker.position + 14
          ) {
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );
            getBoard[selectedChecker.position + 7].removeChild(
              getBoard[selectedChecker.position + 7].firstChild,
            );
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'white';
          }

          // Black checker beat back right
          if (
            selectedChecker.position &&
            getBoard[selectedChecker.position + 9] &&
            getBoard[selectedChecker.position + 18] &&
            getBoard[selectedChecker.position + 9].childNodes.length > 0 &&
            getBoard[selectedChecker.position + 9].firstChild.getAttribute(
              'name',
            ) !== 'black' &&
            getBoard[selectedChecker.position + 18].childNodes.length <= 0 &&
            i === selectedChecker.position + 18
          ) {
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild,
            );
            getBoard[selectedChecker.position + 9].removeChild(
              getBoard[selectedChecker.position + 9].firstChild,
            );
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'white';
          }
        }
      }
    });
  }
};

body.appendChild(createMainContainer(board));
createBoard();
checkerClickListener();
checkerMoveClickListener();
