const state = {
    gameElement: document.querySelector(".game"),
    //cells: [null, null, null, null, null, null, null, null, null]
    cells: Array(9).fill(null),
    symbols: ["o", "x"],
    winningCombinations:[
        [0, 1, 2], //top row
        [3, 4, 5], //middle row
        [6, 7, 8], //bottom row
        [0, 3, 6], //left column
        [1, 4, 7], //middle column
        [2, 5, 8], //right column
        [0, 4, 8], //left diag
        [2, 4, 6] //right diag
    ],
    gameFinished: false
}

function drawBoard() {
    state.gameElement.innerHTML = " "


    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")

        if(state.cells[i]) { //does the cell have an x or an o? if so, the following code runs
            const cellSymbol = document.createElement("p") //creates p tags with class=symbol
            cellSymbol.innerText = state.cells[i]
            cellSymbol.classList.add("symbol")
            cell.append(cellSymbol)

        } else { //otheriwse it must be empty so run this next section
            cell.addEventListener("click", function() {
                if (state.gameFinished) {
                    return
                }


                state.symbols.reverse() //helps with turn based playing by reversing the symbols array for alteratives.
                state.cells[i] = state.symbols[0]


                drawBoard()

                if (checkForWinner()) {
                    drawMessage(`${state.symbols[0]} won!`)
                    state.gameFinished = true //winner code goes here
                   return
                }

                if (checkForDraw()) {
                    drawMessage("its a draw!")
                    state.gameFinished = true
                } 
            })
        }


        

        state.gameElement.append(cell)
    }
}
function drawMessage(message) {
    const banner = document.createElement("div")
    banner.classList.add("banner")

    const h1 = document.createElement("h1")
    h1.innerHTML = message

    banner.append(h1)
    state.gameElement.append(banner)
}

function checkForDraw() {
    return state.cells.every(function(cell) {
        return cell !== null
    })
}
function checkForWinner() {
    return state.winningCombinations.some(function (combo) {
        const cells = combo.map(function(index) {
            return state.cells[index]
        })

        return !(cells.includes(null)) && new Set(cells).size === 1
    })
}
drawBoard()