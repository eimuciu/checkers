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