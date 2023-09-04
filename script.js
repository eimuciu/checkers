// ***todos***
// Kai yra du galimi kirtimai, bet su vienu tarkim paeini tiesiog i sona galimai pazymi sekanti kirtimo varianta, bet istrina saske su kuria buvo paeita i sona

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
let mustMoves = [];

const isLeftWallObstacle = (checker) => {
  let obstacle = false;
  if (
    // left wall
    checker.position === 8 ||
    checker.position === 24 ||
    checker.position === 40 ||
    checker.position === 56 ||
    // left near wall
    checker.position === 1 ||
    checker.position === 17 ||
    checker.position === 33 ||
    checker.position === 49
  ) {
    obstacle = true;
  }
  return obstacle;
};

const isRightWallObstacle = (checker) => {
  let obstacle = false;
  if (
    // right wall
    checker.position === 7 ||
    checker.position === 23 ||
    checker.position === 39 ||
    checker.position === 55 ||
    // right near wall
    checker.position === 14 ||
    checker.position === 30 ||
    checker.position === 46 ||
    checker.position === 62
  ) {
    obstacle = true;
  }
  return obstacle;
};

const isTopWallObstacle = (checker) => {
  let obstacle = false;
  if (
    // top wall
    checker.position === 1 ||
    checker.position === 3 ||
    checker.position === 5 ||
    checker.position === 7 ||
    // top near wall
    checker.position === 8 ||
    checker.position === 10 ||
    checker.position === 12 ||
    checker.position === 14
  ) {
    obstacle = true;
  }
  return obstacle;
};

const isBottomWallObstacle = (checker) => {
  let obstacle = false;
  if (
    // bottom wall
    checker.position === 56 ||
    checker.position === 58 ||
    checker.position === 60 ||
    checker.position === 62 ||
    // bottom near wall
    checker.position === 49 ||
    checker.position === 51 ||
    checker.position === 53 ||
    checker.position === 55
  ) {
    obstacle = true;
  }
  return obstacle;
};

const isLeftDownKickValid = (checker, kickColor) => {
  let isValid = false;
  if (
    getBoard[checker.position + 7] &&
    getBoard[checker.position + 14] &&
    getBoard[checker.position + 7].childNodes.length > 0 &&
    getBoard[checker.position + 7].firstChild.getAttribute('name') ===
      kickColor &&
    getBoard[checker.position + 14].childNodes.length <= 0
  ) {
    if (!isLeftWallObstacle(checker) && !isBottomWallObstacle(checker)) {
      isValid = true;
    }
  }
  return isValid;
};

const isRightDownKickValid = (checker, kickColor) => {
  let isValid = false;
  if (
    getBoard[checker.position + 9] &&
    getBoard[checker.position + 18] &&
    getBoard[checker.position + 9].childNodes.length > 0 &&
    getBoard[checker.position + 9].firstChild.getAttribute('name') ===
      kickColor &&
    getBoard[checker.position + 18].childNodes.length <= 0
  ) {
    if (!isRightWallObstacle(checker) && !isBottomWallObstacle(checker)) {
      isValid = true;
    }
  }
  return isValid;
};

const isRightUpKickValid = (checker, kickColor) => {
  let isValid = false;
  if (
    getBoard[checker.position - 7] &&
    getBoard[checker.position - 14] &&
    getBoard[checker.position - 7].childNodes.length > 0 &&
    getBoard[checker.position - 7].firstChild.getAttribute('name') ===
      kickColor &&
    getBoard[checker.position - 14].childNodes.length <= 0
  ) {
    if (!isRightWallObstacle(checker) && !isTopWallObstacle(checker)) {
      isValid = true;
    }
  }
  return isValid;
};

const isLeftUpKickValid = (checker, kickColor) => {
  let isValid = false;
  if (
    getBoard[checker.position - 9] &&
    getBoard[checker.position - 18] &&
    getBoard[checker.position - 9].childNodes.length > 0 &&
    getBoard[checker.position - 9].firstChild.getAttribute('name') ===
      kickColor &&
    getBoard[checker.position - 18].childNodes.length <= 0
  ) {
    if (!isLeftWallObstacle(checker) && !isTopWallObstacle(checker)) {
      isValid = true;
    }
  }
  return isValid;
};

function checkForNecessaryMovies() {
  mustMoves = [];
  let necessaryMoves = [];
  if (whosMove === 'white') {
    whiteCheckersList.forEach((whiteChecker) => {
      if (isLeftDownKickValid(whiteChecker, 'black')) {
        necessaryMoves.push({ checker: whiteChecker });
      }
      if (isRightDownKickValid(whiteChecker, 'black')) {
        necessaryMoves.push({ checker: whiteChecker });
      }
      if (isRightUpKickValid(whiteChecker, 'black')) {
        necessaryMoves.push({ checker: whiteChecker });
      }
      if (isLeftUpKickValid(whiteChecker, 'black')) {
        necessaryMoves.push({ checker: whiteChecker });
      }
    });
    if (necessaryMoves.length) {
      createListOfMoves(necessaryMoves, 'black');
    }
  }

  if (whosMove === 'black') {
    blackCheckersList.forEach((blackChecker) => {
      if (isLeftDownKickValid(blackChecker, 'white')) {
        necessaryMoves.push({ checker: blackChecker });
      }
      if (isRightDownKickValid(blackChecker, 'white')) {
        necessaryMoves.push({ checker: blackChecker });
      }
      if (isRightUpKickValid(blackChecker, 'white')) {
        necessaryMoves.push({ checker: blackChecker });
      }
      if (isLeftUpKickValid(blackChecker, 'white')) {
        necessaryMoves.push({ checker: blackChecker });
      }
    });
    if (necessaryMoves.length) {
      createListOfMoves(necessaryMoves, 'white');
    }
  }
}

function createListOfMoves(necessaryMoves, kickColor) {
  let unmodifiedChecker;

  const whiteList = whiteCheckersList.map((x) => ({ ...x, state: 'w' }));
  const blackList = blackCheckersList.map((x) => ({ ...x, state: 'b' }));

  let checkersArray;
  let currentCelectedChecker;

  const queue = [];
  const moves = [];

  let curMov;

  if (necessaryMoves.length) {
    for (let i = 0; i < necessaryMoves.length; i++) {
      checkersArray = whiteList.concat(blackList);
      unmodifiedChecker = necessaryMoves[i];
      unmodifiedChecker.moves = [];
      currentCelectedChecker = checkersArray.find(
        (x) => x.position === unmodifiedChecker.checker?.position,
      );

      queue.push(currentCelectedChecker);
      while (queue.length > 0) {
        curMov = queue.shift();

        const plusfourteen = checkersArray.find(
          (x) => curMov.position + 14 === x.position,
        )?.state;
        const minusfourteen = checkersArray.find(
          (x) => curMov.position - 14 === x.position,
        )?.state;
        const pluseighteen = checkersArray.find(
          (x) => curMov.position + 18 === x.position,
        )?.state;
        const minuseighteen = checkersArray.find(
          (x) => curMov.position - 18 === x.position,
        )?.state;

        if (
          // if kick steps are taken
          (isRightWallObstacle(curMov) && plusfourteen && minuseighteen) ||
          (isLeftWallObstacle(curMov) && pluseighteen && minusfourteen) ||
          (isTopWallObstacle(curMov) && plusfourteen && pluseighteen) ||
          (isBottomWallObstacle(curMov) && minusfourteen && minuseighteen) ||
          (plusfourteen && minusfourteen && pluseighteen && minuseighteen) ||
          (isBottomWallObstacle(curMov) &&
            isRightWallObstacle(curMov) &&
            minuseighteen) ||
          (isBottomWallObstacle(curMov) &&
            isLeftWallObstacle(curMov) &&
            minusfourteen) ||
          (isTopWallObstacle(curMov) &&
            isRightWallObstacle(curMov) &&
            plusfourteen) ||
          (isTopWallObstacle(curMov) &&
            isLeftWallObstacle(curMov) &&
            pluseighteen) ||
          // if some steps are taken and some steps are not taken and still not valid moves because two cells acrros are empty
          // with walls
          (isRightWallObstacle(curMov) &&
            !isLeftDownKickValid(curMov, kickColor) &&
            minuseighteen) ||
          (isRightWallObstacle(curMov) &&
            plusfourteen &&
            !isLeftUpKickValid(curMov, kickColor)) ||
          (isLeftWallObstacle(curMov) &&
            !isRightDownKickValid(curMov, kickColor) &&
            minusfourteen) ||
          (isLeftWallObstacle(curMov) &&
            pluseighteen &&
            !isRightUpKickValid(curMov, kickColor)) ||
          (isTopWallObstacle(curMov) &&
            !isLeftDownKickValid(curMov, kickColor) &&
            pluseighteen) ||
          (isTopWallObstacle(curMov) &&
            plusfourteen &&
            !isRightDownKickValid(curMov, kickColor)) ||
          (isBottomWallObstacle(curMov) &&
            !isRightUpKickValid(curMov, kickColor) &&
            minuseighteen) ||
          (isBottomWallObstacle(curMov) &&
            minusfourteen &&
            !isLeftUpKickValid(curMov, kickColor)) ||
          // without walls
          // singles
          // +18
          // !isRightDownKickValid(curMov, kickColor)
          // -14
          // !isRightUpKickValid(curMov, kickColor)
          // +14
          // !isLeftDownKickValid(curMov, kickColor)
          // -18
          // !isLeftUpKickValid(curMov, kickColor)
          (!isLeftDownKickValid(curMov, kickColor) &&
            minusfourteen &&
            pluseighteen &&
            minuseighteen) ||
          (plusfourteen &&
            !isRightUpKickValid(curMov, kickColor) &&
            pluseighteen &&
            minuseighteen) ||
          (plusfourteen &&
            minusfourteen &&
            !isRightDownKickValid(curMov, kickColor) &&
            minuseighteen) ||
          (plusfourteen &&
            minusfourteen &&
            pluseighteen &&
            !isLeftUpKickValid(curMov, kickColor)) ||
          // doubles
          // 1st with all others
          (!isLeftDownKickValid(curMov, kickColor) &&
            !isRightUpKickValid(curMov, kickColor) &&
            pluseighteen &&
            minuseighteen) ||
          (!isLeftDownKickValid(curMov, kickColor) &&
            minusfourteen &&
            !isRightDownKickValid(curMov, kickColor) &&
            minuseighteen) ||
          (!isLeftDownKickValid(curMov, kickColor) &&
            minusfourteen &&
            pluseighteen &&
            !isLeftUpKickValid(curMov, kickColor)) ||
          // 2nd with all others except 1st
          (plusfourteen &&
            !isRightUpKickValid(curMov, kickColor) &&
            !isRightDownKickValid(curMov, kickColor) &&
            minuseighteen) ||
          (plusfourteen &&
            !isRightUpKickValid(curMov, kickColor) &&
            pluseighteen &&
            !isLeftUpKickValid(curMov, kickColor)) ||
          // 3rd with 4th
          (plusfourteen &&
            minusfourteen &&
            !isRightDownKickValid(curMov, kickColor) &&
            !isLeftUpKickValid(curMov, kickColor))
        ) {
          const lastCheckerState = checkersArray
            .find((x) => x.position === curMov.position)
            .state.split(',')
            .splice(1);
          moves.push({ ...unmodifiedChecker, moves: lastCheckerState });
        }

        if (isRightDownKickValid(curMov, kickColor)) {
          console.log('Right down kick valid');
          const nextCheckerState = checkersArray.find(
            (x) => curMov.position + 18 === x.position,
          )?.state;
          const currentCheckerState = checkersArray.find(
            (x) => curMov.position === x.position,
          )?.state;
          if (!nextCheckerState) {
            queue.push({ position: curMov.position + 18 });
            checkersArray.push({
              position: curMov.position + 18,
              state: currentCheckerState + ',+18',
            });
          }
        }
        if (isLeftDownKickValid(curMov, kickColor)) {
          console.log('Left down kick valid');
          const nextCheckerState = checkersArray.find(
            (x) => curMov.position + 14 === x.position,
          )?.state;
          const currentCheckerState = checkersArray.find(
            (x) => curMov.position === x.position,
          )?.state;
          if (!nextCheckerState) {
            queue.push({ position: curMov.position + 14 });
            checkersArray.push({
              position: curMov.position + 14,
              state: currentCheckerState + ',+14',
            });
          }
        }
        if (isRightUpKickValid(curMov, kickColor)) {
          console.log('Right up kick valid');
          const nextCheckerState = checkersArray.find(
            (x) => curMov.position - 14 === x.position,
          )?.state;
          const currentCheckerState = checkersArray.find(
            (x) => curMov.position === x.position,
          )?.state;
          if (!nextCheckerState) {
            queue.push({ position: curMov.position - 14 });
            checkersArray.push({
              position: curMov.position - 14,
              state: currentCheckerState + ',-14',
            });
          }
        }
        if (isLeftUpKickValid(curMov, kickColor)) {
          console.log('Left up kick valid');
          const nextCheckerState = checkersArray.find(
            (x) => curMov.position - 18 === x.position,
          )?.state;
          const currentCheckerState = checkersArray.find(
            (x) => curMov.position === x.position,
          )?.state;
          if (!nextCheckerState) {
            queue.push({ position: curMov.position - 18 });
            checkersArray.push({
              position: curMov.position - 18,
              state: currentCheckerState + ',-18',
            });
          }
        }
      }
    }
  }
  mustMoves = moves;
}

function growDepth() {
  const obj = {
    id: 1,
    name: 'one',
    next: {
      id: 2,
      name: 'two',
      next: {
        id: 3,
        name: 'three',
      },
    },
  };
  let head = obj;
  while (head != null) {
    head = head.next;
  }
}

// growDepth()

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

function updateCheckersArray(arr, from, to) {
  return arr.map((x) => (x.position === from ? { ...x, position: to } : x));
}

function removeCheckerFromArray(arr, pos) {
  return arr.filter((x) => x.position !== pos);
}

function isMoveMadeWithOrWitoutAMustMove(movingToPosition) {
  if (selectedChecker.position) {
    if (!mustMoves.length) {
      return;
    }
    const findSelectedChecker = mustMoves.find(
      (x) => x.checker.position === selectedChecker.position,
    );
    if (
      findSelectedChecker &&
      findSelectedChecker.hasOwnProperty('moves') &&
      movingToPosition ===
        eval(selectedChecker.position + findSelectedChecker.moves[0])
    ) {
      const removePositionNumber = findSelectedChecker.moves[0].slice(1) / 2;
      const formatedRemovePosition =
        findSelectedChecker.moves[0].charAt(0) + removePositionNumber;
      const actualRemovePosition = eval(
        findSelectedChecker.checker.position + formatedRemovePosition,
      );
      if (whosMove === 'white') {
        whiteCheckersList = updateCheckersArray(
          whiteCheckersList,
          selectedChecker.position,
          movingToPosition,
        );
        blackCheckersList = removeCheckerFromArray(
          blackCheckersList,
          actualRemovePosition,
        );
      }
      if (whosMove === 'black') {
        blackCheckersList = updateCheckersArray(
          blackCheckersList,
          selectedChecker.position,
          movingToPosition,
        );
        whiteCheckersList = removeCheckerFromArray(
          whiteCheckersList,
          actualRemovePosition,
        );
      }
      return;
    }
    const colorMoving = whosMove;
    const checkerSelected = { ...selectedChecker };

    if (
      findSelectedChecker &&
      findSelectedChecker.hasOwnProperty('moves') &&
      movingToPosition !==
        eval(selectedChecker.position + findSelectedChecker.moves[0])
    ) {
      getBoard[mustMoves[0].checker.position].style.backgroundColor = 'red';
      getBoard[
        eval(mustMoves[0].checker.position + mustMoves[0].moves[0])
      ].style.backgroundColor = 'red';
      if (mustMoves.length > 1) {
        function proceedRemoval() {
          if (checkerSelected.position === mustMoves[0].checker.position) {
            getBoard[movingToPosition].removeChild(
              getBoard[movingToPosition].firstChild,
            );
            if (colorMoving === 'white') {
              whiteCheckersList = removeCheckerFromArray(
                whiteCheckersList,
                movingToPosition,
              );
            }
            if (colorMoving === 'black') {
              blackCheckersList = removeCheckerFromArray(
                blackCheckersList,
                movingToPosition,
              );
            }
          } else {
            getBoard[mustMoves[0].checker.position].removeChild(
              getBoard[mustMoves[0].checker.position].firstChild,
            );
            if (colorMoving === 'white') {
              whiteCheckersList = removeCheckerFromArray(
                whiteCheckersList,
                mustMoves[0].checker.position,
              );
            }
            if (colorMoving === 'black') {
              blackCheckersList = removeCheckerFromArray(
                blackCheckersList,
                mustMoves[0].checker.position,
              );
            }
          }
          getBoard[mustMoves[0].checker.position].style.backgroundColor =
            'rgb(166, 195, 111)';
          getBoard[
            eval(mustMoves[0].checker.position + mustMoves[0].moves[0])
          ].style.backgroundColor = 'rgb(166, 195, 111)';
        }
        const timer = setTimeout(proceedRemoval, 2000);
        return;
      }
      function proceedRemoval() {
        if (colorMoving === 'white') {
          whiteCheckersList = removeCheckerFromArray(
            whiteCheckersList,
            movingToPosition,
          );
        }
        if (colorMoving === 'black') {
          blackCheckersList = removeCheckerFromArray(
            blackCheckersList,
            movingToPosition,
          );
        }
        getBoard[mustMoves[0].checker.position].style.backgroundColor =
          'rgb(166, 195, 111)';
        getBoard[
          eval(mustMoves[0].checker.position + mustMoves[0].moves[0])
        ].style.backgroundColor = 'rgb(166, 195, 111)';
        getBoard[movingToPosition].removeChild(
          getBoard[movingToPosition].firstChild,
        );
      }
      const timer = setTimeout(proceedRemoval, 2000);
      return;
    }
    getBoard[mustMoves[0].checker.position].style.backgroundColor = 'red';
    getBoard[
      eval(mustMoves[0].checker.position + mustMoves[0].moves[0])
    ].style.backgroundColor = 'red';
    function proceedRemoval() {
      if (colorMoving === 'white') {
        whiteCheckersList = updateCheckersArray(
          whiteCheckersList,
          selectedChecker.position,
          movingToPosition,
        );
        whiteCheckersList = removeCheckerFromArray(
          whiteCheckersList,
          mustMoves[0].checker.position,
        );
      }
      if (colorMoving === 'black') {
        blackCheckersList = updateCheckersArray(
          blackCheckersList,
          selectedChecker.position,
          movingToPosition,
        );
        blackCheckersList = removeCheckerFromArray(
          blackCheckersList,
          mustMoves[0].checker.position,
        );
      }
      getBoard[mustMoves[0].checker.position].style.backgroundColor =
        'rgb(166, 195, 111)';
      getBoard[
        eval(mustMoves[0].checker.position + mustMoves[0].moves[0])
      ].style.backgroundColor = 'rgb(166, 195, 111)';
      getBoard[mustMoves[0].checker.position].removeChild(
        getBoard[mustMoves[0].checker.position].firstChild,
      );
    }
    const timer = setTimeout(proceedRemoval, 2000);
  }

  // {
  //   "checker": {
  //       "isQueen": false,
  //       "position": 26
  //   },
  //   "moves": [
  //       "+18"
  //   ]
  // }
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
          //Check for any necessary moves
          checkForNecessaryMovies();
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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

            // Resetting moves
            selectedChecker.color = '';
            selectedChecker.position = null;
            whosMove = 'black';
          }
          // White checker moving down right
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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

            // Resetting moves
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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

            // Resetting moves
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
          //Check for any necessary moves
          checkForNecessaryMovies();
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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

            // Resetting moves
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

            // Move validity
            isMoveMadeWithOrWitoutAMustMove(i);

            // Resetting moves
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
