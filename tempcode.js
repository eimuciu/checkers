if (isRightDownKickValid(curMov, kickColor)) {
    console.log("Right down kick valid")
    // // Check if the move is going backwards and terminate it if it does
    const backPosition = checkersArray.find(x => x.position === curMov.position + 18)
    if (backPosition) {
        const splitState = backPosition.state.split(',');
        if (splitState.includes('-18')) {
            checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + "" } : x)
        } else {
            checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + ",+18" } : x)
        }
    } else {
        checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + ",+18" } : x)
    }
    const nextCell = checkersArray.find(x => x.position === curMov.position + 18)
    if (!nextCell) {
        const manifestCellChecker = { position: curMov.position + 18, state: '' }
        checkersArray.push(manifestCellChecker)
        queue.push(manifestCellChecker)
    }
}

if (isLeftDownKickValid(curMov, kickColor)) {
    console.log("Left down kick valid")
    // // Check if the move is going backwards and terminate it if it does
    const backPosition = checkersArray.find(x => x.position === curMov.position + 14)
    if (backPosition) {
        const splitState = backPosition.state.split(',');
        if (splitState.includes('-14')) {
            checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + "" } : x)
        } else {
            checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + ",+14" } : x)
        }
    } else {
        checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + ",+14" } : x)
    }
    const nextCell = checkersArray.find(x => x.position === curMov.position + 14)
    if (!nextCell) {
        const manifestCellChecker = { position: curMov.position + 14, state: '' }
        checkersArray.push(manifestCellChecker)
        queue.push(manifestCellChecker)
    }
}

if (isRightUpKickValid(curMov, kickColor)) {
    console.log("Right up kick valid")
    // // Check if the move is going backwards and terminate it if it does
    const backPosition = checkersArray.find(x => x.position === curMov.position - 14)
    if (backPosition) {
        const splitState = backPosition.state.split(',');
        if (splitState.includes('+14')) {
            checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + "" } : x)
        } else {
            checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + ",-14" } : x)
        }
    } else {
        checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + ",-14" } : x)
    }
    const nextCell = checkersArray.find(x => x.position === curMov.position - 14)
    if (!nextCell) {
        const manifestCellChecker = { position: curMov.position - 14, state: '' }
        checkersArray.push(manifestCellChecker)
        queue.push(manifestCellChecker)
    }
}

if (isLeftUpKickValid(curMov, kickColor)) {
    console.log("Left up kick valid")
    // // Check if the move is going backwards and terminate it if it does
    const backPosition = checkersArray.find(x => x.position === curMov.position - 18)
    if (backPosition) {
        const splitState = backPosition.state.split(',');
        if (splitState.includes('+18')) {
            checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + "" } : x)
        } else {
            checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + ",-18" } : x)
        }
    } else {
        checkersArray = checkersArray.map(x => x.position === curMov.position ? { ...x, state: x.state + ",-18" } : x)
    }
    const nextCell = checkersArray.find(x => x.position === curMov.position - 18)
    if (!nextCell) {
        const manifestCellChecker = { position: curMov.position - 18, state: '' }
        checkersArray.push(manifestCellChecker)
        queue.push(manifestCellChecker)
    }
}