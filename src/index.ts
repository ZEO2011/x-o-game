import "./index.scss";
import { toast } from "./ts/toast";
const app = document.getElementById("app") as HTMLDivElement;

const playerOne = ["X", "O"][
    Math.floor(Math.random() * 2)
] as boxesType["player"];
const playerTwo = playerOne === "X" ? "O" : "X";
let playerOneTurn = true;

let boxes: boxesType[] = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    player: null,
}));
function render() {
    app.innerHTML = `
    <div class="container">
    <h1 class="caption">${playerOneTurn ? "your" : "player two"} turn</h1>
    <div class="grid">
        ${boxes
            .map(
                (box) =>
                    `<button data-id="${box.id}" data-player="${box.player}" class="grid-item"></button>`,
            )
            .join("")}
    </div>
</div>

            `;
    const buttonItems =
        document.querySelectorAll<HTMLButtonElement>(".grid-item");
    const nullBoxes = boxes.filter((box) => box.player === null);
    if (checkWin(playerOne)) {
        toast.success("you win!");
        return;
    }
    if (checkWin(playerTwo)) {
        toast.error("you lose!");
        return;
    }
    if (nullBoxes.length === 0) {
        toast.draw("draw!");
        return;
    }
    if (playerOneTurn) {
        for (const item of buttonItems) {
            const abortController = new AbortController();
            item.addEventListener(
                "click",
                (e) => {
                    const clickedItem = e.currentTarget as HTMLButtonElement;
                    if (clickedItem.dataset.player !== "null") return;
                    const id: boxesType["id"] = parseInt(
                        clickedItem.dataset.id as string,
                    );
                    boxes = boxes.map((box) => {
                        if (box.id === id) {
                            return { id, player: playerOne };
                        }
                        return box;
                    });
                    playerOneTurn = false;
                    abortController.abort();
                    render();
                },
                { signal: abortController.signal },
            );
        }
    } else {
        setTimeout(() => {
            const id = nullBoxes[Math.floor(Math.random() * nullBoxes.length)].id;
            boxes = boxes.map((box) => {
                if (box.id === id) {
                    return { id, player: playerTwo };
                }
                return box;
            });
            playerOneTurn = true;
            render();
        }, 500);
    }
}
render();

function checkWin(player: boxesType["player"]) {
    const winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            boxes[a - 1].player === player &&
            boxes[b - 1].player === player &&
            boxes[c - 1].player === player
        ) {
            return true;
        }
    }
    return false;
}
