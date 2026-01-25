let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;  // player O starts

// All winning patterns
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// disables all boxes when someone wins
const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

// enables all boxes when resetting
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// show winner message
const showWinner = (winner) => {
    msg.innerText = `🎉 Winner: ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// check winner logic
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
            }
        }
    }
};

// box click event
boxes.forEach(box => {
    box.addEventListener("click", () => {

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    });
});

// reset + new game function
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// button listeners
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

