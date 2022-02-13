const body = document.body;
body.style.padding = "50px";

const board = document.createElement("div");
board.style.width = "100%";
board.style.display = "flex";
board.style.flexWrap = "wrap";
board.style.justifyContent = "center";
board.style.boxSizing = "border-box";

const getBoard = board.childNodes;
const rows = 8;
const columns = 8;
const selectedChecker = {
  color: "",
  position: null,
};

const createMainContainer = (board) => {
  const mainContainer = document.createElement("div");
  mainContainer.style.width = "40%";
  mainContainer.style.backgroundColor = "darkblue";
  mainContainer.style.margin = "0 auto";
  mainContainer.style.padding = "20px 10px 20px 10px";
  mainContainer.appendChild(board);
  return mainContainer;
};

const createBlackChecker = () => {
  const checker = document.createElement("div");
  checker.style.width = "80%";
  checker.style.height = "80%";
  checker.style.borderRadius = "50%";
  checker.style.backgroundColor = "black";
  checker.style.display = "flex";
  checker.style.justifyContent = "center";
  checker.style.alignItems = "center";
  checker.setAttribute("name", "black");
  const circle = document.createElement("div");
  circle.style.width = "50%";
  circle.style.height = "50%";
  circle.style.borderRadius = "50%";
  circle.style.border = "1px solid white";
  checker.appendChild(circle);
  return checker;
};
const createWhiteChecker = () => {
  const checker = document.createElement("div");
  checker.style.width = "80%";
  checker.style.height = "80%";
  checker.style.borderRadius = "50%";
  checker.style.backgroundColor = "white";
  checker.style.display = "flex";
  checker.style.justifyContent = "center";
  checker.style.alignItems = "center";
  checker.setAttribute("name", "white");
  const circle = document.createElement("div");
  circle.style.width = "50%";
  circle.style.height = "50%";
  circle.style.borderRadius = "50%";
  circle.style.border = "1px solid black";
  checker.appendChild(circle);
  return checker;
};

const createCell = (checker, color) => {
  const cellHeight = board.clientWidth * 0.123;
  const cell = document.createElement("div");
  cell.style.width = "12%";
  cell.style.height = cellHeight + "px";
  if (color) {
    cell.style.backgroundColor = color;
  } else {
    cell.style.backgroundColor = "white";
  }
  cell.style.display = "flex";
  cell.style.justifyContent = "center";
  cell.style.alignItems = "center";
  cell.classList.add("cell");
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
          board.appendChild(createCell(createWhiteChecker(), "red"));
        } else if ((i % 2 === 1) & (y % 2 === 0)) {
          board.appendChild(createCell(createWhiteChecker(), "red"));
        } else {
          board.appendChild(createCell());
        }
      } else if (i === rows - 1 || i === rows - 2 || i === rows - 3) {
        if ((i % 2 === 0) & (y % 2 === 1)) {
          board.appendChild(createCell(createBlackChecker(), "red"));
        } else if ((i % 2 === 1) & (y % 2 === 0)) {
          board.appendChild(createCell(createBlackChecker(), "red"));
        } else {
          board.appendChild(createCell());
        }
      } else {
        if ((i % 2 === 0) & (y % 2 === 1)) {
          board.appendChild(createCell(null, "red"));
        } else if ((i % 2 === 1) & (y % 2 === 0)) {
          board.appendChild(createCell(null, "red"));
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
      const attributeValue = getBoard[i].firstChild.getAttribute("name");

      if (i !== index) {
        if (getBoard[i].childNodes.length > 0) {
          if (attributeValue === "white") {
            getBoard[i].firstChild.style.backgroundColor = "white";
          }
          if (attributeValue === "black") {
            getBoard[i].firstChild.style.backgroundColor = "black";
          }
        }
      }
    }
  }
};

const checkerClickListener = () => {
  for (let i = 0; i < getBoard.length; i++) {
    getBoard[i].addEventListener("click", () => {
      if (getBoard[i].childNodes.length > 0) {
        getBoard[i].firstChild.style.backgroundColor = "green";
        const attributeValue = getBoard[i].firstChild.getAttribute("name");
        removeColor(i);
        selectedChecker.color = attributeValue;
        selectedChecker.position = i;
      } else {
        return;
      }
    });
  }
};

checkerMoveClickListener = () => {
  for (let i = 0; i < getBoard.length; i++) {
    getBoard[i].addEventListener("click", () => {
      if (selectedChecker.position) {
        // White checker move
        if (selectedChecker.color === "white") {
          if (
            i === selectedChecker.position + 7 &&
            getBoard[i].childNodes.length <= 0 &&
            selectedChecker.color === "white"
          ) {
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }
          if (
            i === selectedChecker.position + 9 &&
            getBoard[i].childNodes.length <= 0 &&
            selectedChecker.color === "white"
          ) {
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }
          // White checker beat left
          if (
            getBoard[selectedChecker.position + 7].childNodes.length > 0 &&
            getBoard[selectedChecker.position + 7].firstChild.getAttribute(
              "name"
            ) !== "white" &&
            getBoard[selectedChecker.position + 14].childNodes.length <= 0 &&
            i === selectedChecker.position + 14
          ) {
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            getBoard[selectedChecker.position + 7].removeChild(
              getBoard[selectedChecker.position + 7].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }

          // White checker beat right
          if (
            getBoard[selectedChecker.position + 9].childNodes.length > 0 &&
            getBoard[selectedChecker.position + 9].firstChild.getAttribute(
              "name"
            ) !== "white" &&
            getBoard[selectedChecker.position + 18].childNodes.length <= 0 &&
            i === selectedChecker.position + 18
          ) {
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            getBoard[selectedChecker.position + 9].removeChild(
              getBoard[selectedChecker.position + 9].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }

          // White checker beat back right
          if (
            getBoard[selectedChecker.position - 7].childNodes.length > 0 &&
            getBoard[selectedChecker.position - 7].firstChild.getAttribute(
              "name"
            ) !== "white" &&
            getBoard[selectedChecker.position - 14].childNodes.length <= 0 &&
            i === selectedChecker.position - 14
          ) {
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            getBoard[selectedChecker.position - 7].removeChild(
              getBoard[selectedChecker.position - 7].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }

          // White checker beat back left
          if (
            getBoard[selectedChecker.position - 9].childNodes.length > 0 &&
            getBoard[selectedChecker.position - 9].firstChild.getAttribute(
              "name"
            ) !== "white" &&
            getBoard[selectedChecker.position - 18].childNodes.length <= 0 &&
            i === selectedChecker.position - 18
          ) {
            getBoard[i].appendChild(createWhiteChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            getBoard[selectedChecker.position - 9].removeChild(
              getBoard[selectedChecker.position - 9].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }
        }

        // Black checker move
        if (selectedChecker.color === "black") {
          if (
            i === selectedChecker.position - 7 &&
            getBoard[i].childNodes.length <= 0 &&
            selectedChecker.color === "black"
          ) {
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }
          if (
            i === selectedChecker.position - 9 &&
            getBoard[i].childNodes.length <= 0 &&
            selectedChecker.color === "black"
          ) {
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }

          // Black checker beat right
          if (
            getBoard[selectedChecker.position - 7].childNodes.length > 0 &&
            getBoard[selectedChecker.position - 7].firstChild.getAttribute(
              "name"
            ) !== "black" &&
            getBoard[selectedChecker.position - 14].childNodes.length <= 0 &&
            i === selectedChecker.position - 14
          ) {
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            getBoard[selectedChecker.position - 7].removeChild(
              getBoard[selectedChecker.position - 7].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }

          // Black checker beat left
          if (
            getBoard[selectedChecker.position - 9].childNodes.length > 0 &&
            getBoard[selectedChecker.position - 9].firstChild.getAttribute(
              "name"
            ) !== "black" &&
            getBoard[selectedChecker.position - 18].childNodes.length <= 0 &&
            i === selectedChecker.position - 18
          ) {
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            getBoard[selectedChecker.position - 9].removeChild(
              getBoard[selectedChecker.position - 9].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }

          // Black checker beat back left
          if (
            getBoard[selectedChecker.position + 7].childNodes.length > 0 &&
            getBoard[selectedChecker.position + 7].firstChild.getAttribute(
              "name"
            ) !== "black" &&
            getBoard[selectedChecker.position + 14].childNodes.length <= 0 &&
            i === selectedChecker.position + 14
          ) {
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            getBoard[selectedChecker.position + 7].removeChild(
              getBoard[selectedChecker.position + 7].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
          }

          // Black checker beat right
          if (
            getBoard[selectedChecker.position + 9].childNodes.length > 0 &&
            getBoard[selectedChecker.position + 9].firstChild.getAttribute(
              "name"
            ) !== "black" &&
            getBoard[selectedChecker.position + 18].childNodes.length <= 0 &&
            i === selectedChecker.position + 18
          ) {
            getBoard[i].appendChild(createBlackChecker());
            getBoard[selectedChecker.position].removeChild(
              getBoard[selectedChecker.position].firstChild
            );
            getBoard[selectedChecker.position + 9].removeChild(
              getBoard[selectedChecker.position + 9].firstChild
            );
            selectedChecker.color = "";
            selectedChecker.position = null;
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
