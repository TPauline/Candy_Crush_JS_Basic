document.addEventListener('DOMContentLoaded', () => {
    gameArea = document.querySelector(".gameArea")
    grid = document.querySelector(".grid")
    length = 9;
    fruits = {
        'blue': 'images/blue-candy.png',
        'green': 'images/green-candy.png',
        'orange': 'images/orange-candy.png',
        'purple': 'images/purple-candy.png',
        'red': 'images/red-candy.png',
        'yellow': 'images/yellow-candy.png',
    }
    gridList = []
    currId = 0
    varibaleHolder = { dragDiv: '', dropDiv: '', ghostDiv: '', tempImage: '', dataTransfer: '', go: false }

    function createGrid() {
        var ghostDiv = document.createElement("img");
        var ghostHolder = document.createElement('div');
        ghostHolder.appendChild(ghostDiv);
        ghostHolder.style.position = "absolute";
        ghostHolder.style.top = "0px";
        ghostHolder.style.left = "-500px";
        varibaleHolder.ghostDiv = ghostHolder
        document.querySelector('body').appendChild(varibaleHolder.ghostDiv);
        for (let r = 0; r < length; r++) {
            row = []
            for (let c = 0; c < length; c++) {
                div = document.createElement('div')
                div.id = "div" + currId;
                // div.draggable = 'true'
                if (currId < 9) {
                    div.style.borderTop = "none"
                }
                if (currId > 26) {
                    div.style.borderBottom = "none"
                }
                if (currId % 9 == 0) {
                    div.style.borderLeft = "none"

                } else if (c == length - 1) {
                    div.style.borderRight = "none"
                }
                currId++
                grid.appendChild(div)
                ck = document.createAttribute('color_Key')
                color = Object.keys(fruits)[Math.floor(Math.random() * Object.keys(fruits).length)]
                ck.value = color
                div.setAttributeNode(ck);
                div.style.backgroundImage = 'url(' + fruits[color] + ')'
                row.push(div)
                div.addEventListener('dragstart', dragStarted);
                div.addEventListener('dragover', draggedOver);
            }
            gridList.push(row)
        }
    }
    createGrid()

    function validSwap(x, y) {
        //check up,down, left,right
        val = false
        console.log(x + " " + y)
        if (x - 2 >= 0 && (varibaleHolder.dragDiv.getAttribute("color_Key") == gridList[x - 2][y].getAttribute("color_Key") && gridList[x - 1][y].getAttribute("color_Key") == gridList[x - 2][y].getAttribute("color_Key"))) {
            val = true
        } else if (x + 2 < gridList.length && (varibaleHolder.dragDiv.getAttribute("color_Key") == gridList[x + 2][y].getAttribute("color_Key") && gridList[x + 1][y].getAttribute("color_Key") == gridList[x + 2][y].getAttribute("color_Key"))) {
            val = true
        } else if (y - 2 >= 0 && (varibaleHolder.dragDiv.getAttribute("color_Key") == gridList[x][y - 2].getAttribute("color_Key") && gridList[x][y - 1].getAttribute("color_Key") == gridList[x][y - 2].getAttribute("color_Key"))) {
            val = true
        } else
        if (y + 2 < gridList.length && (varibaleHolder.dragDiv.getAttribute("color_Key") == gridList[x][y + 2].getAttribute("color_Key") && gridList[x][y + 1].getAttribute("color_Key") == gridList[x][y + 2].getAttribute("color_Key"))) {
            val = true
        }

        if (x - 2 >= 0 && (varibaleHolder.dropDiv.getAttribute("color_Key") == gridList[x - 2][y].getAttribute("color_Key") && gridList[x - 1][y].getAttribute("color_Key") == gridList[x - 2][y].getAttribute("color_Key"))) {
            val = true
        } else if (x + 2 < gridList.length && (varibaleHolder.dropDiv.getAttribute("color_Key") == gridList[x + 2][y].getAttribute("color_Key") && gridList[x + 1][y].getAttribute("color_Key") == gridList[x + 2][y].getAttribute("color_Key"))) {
            val = true
        } else if (y - 2 >= 0 && (varibaleHolder.dropDiv.getAttribute("color_Key") == gridList[x][y - 2].getAttribute("color_Key") && gridList[x][y - 1].getAttribute("color_Key") == gridList[x][y - 2].getAttribute("color_Key"))) {
            val = true
        } else
        if (y + 2 < gridList.length && (varibaleHolder.dropDiv.getAttribute("color_Key") == gridList[x][y + 2].getAttribute("color_Key") && gridList[x][y + 1].getAttribute("color_Key") == gridList[x][y + 2].getAttribute("color_Key"))) {
            val = true
        }
        return val
    }

    function funcPositionInGrid(div) {
        for (let row = 0; row < gridList.length; row++) {
            for (let col = 0; col < gridList[0].length; col++) {
                if (gridList[row][col] == div) {
                    console.log([row, col])
                    return [row, col]
                }
            }
        }
    }



    function dragStarted(e) {
        div = e.target || e.srcElement || e.targetTouches[0];
        varibaleHolder.dragDiv = div
            // varibaleHolder.ghostDiv.style.backgroundImage = 'url(' + fruits[div.getAttribute("color_Key")] + ')'
        varibaleHolder.ghostDiv.lastChild.src = fruits[div.getAttribute("color_Key")];
        varibaleHolder.dataTransfer = e.dataTransfer
        varibaleHolder.dataTransfer.setDragImage(varibaleHolder.ghostDiv, 50, 50);
    }

    function swap_images(drag, drop, div) {
        drag.style.backgroundImage = div.style.backgroundImage
        temp = drag.getAttribute("color_Key")
        drag.setAttribute("color_Key", div.getAttribute("color_Key"))
        div.setAttribute("color_Key", temp)
        drop.style.backgroundImage = 'url(' + fruits[varibaleHolder.dropDiv.getAttribute("color_Key")] + ')'
    }

    function draggedOver(e) {
        e.preventDefault();
        div = e.target || e.srcElement;
        varibaleHolder.dropDiv = div
        if (varibaleHolder.dragDiv.offsetLeft - div.offsetLeft == -70 && varibaleHolder.dragDiv.offsetTop - div.offsetTop == 0) {
            //console.log("same row to RIGHT")
            pos = funcPositionInGrid(varibaleHolder.dragDiv)
            swap_images(varibaleHolder.dragDiv, varibaleHolder.dropDiv, div)
            if (!validSwap(pos[0], pos[1])) {
                console.log("no unswap")
                setTimeout(function() { swap_images(varibaleHolder.dragDiv, varibaleHolder.dropDiv, div) }, 800)
            }
        } else if (varibaleHolder.dragDiv.offsetLeft - div.offsetLeft == 70 && varibaleHolder.dragDiv.offsetTop - div.offsetTop == 0) {
            // console.log("same row to LEFT")
            pos = funcPositionInGrid(varibaleHolder.dragDiv)
            swap_images(varibaleHolder.dragDiv, varibaleHolder.dropDiv, div)
            if (!validSwap(pos[0], pos[1])) {
                console.log("no unswap")
                setTimeout(function() { swap_images(varibaleHolder.dragDiv, varibaleHolder.dropDiv, div) }, 800)
            }
        } else if (varibaleHolder.dragDiv.offsetLeft - div.offsetLeft == 0 && varibaleHolder.dragDiv.offsetTop - div.offsetTop == 70) {
            //console.log("same column to top ")
            pos = funcPositionInGrid(varibaleHolder.dragDiv)
            swap_images(varibaleHolder.dragDiv, varibaleHolder.dropDiv, div)
            if (!validSwap(pos[0], pos[1])) {
                console.log("no unswap")
                setTimeout(function() { swap_images(varibaleHolder.dragDiv, varibaleHolder.dropDiv, div) }, 800)
            }
        } else if (varibaleHolder.dragDiv.offsetLeft - div.offsetLeft == 0 && varibaleHolder.dragDiv.offsetTop - div.offsetTop == -70) {
            //console.log("same column to bottom ")
            pos = funcPositionInGrid(varibaleHolder.dragDiv)
            swap_images(varibaleHolder.dragDiv, varibaleHolder.dropDiv, div)
            if (!validSwap(pos[0], pos[1])) {
                console.log("no unswap")
                setTimeout(function() { swap_images(varibaleHolder.dragDiv, varibaleHolder.dropDiv, div) }, 800)
            }
        }
        //varibaleHolder.dataTransfer.clearData()
    }

    function dragDropped(e) {
        div = e.target || e.srcElement;
        // document.querySelector('body').removeChild(varibaleHolder.ghostDiv);
    }

    function checkRows() {
        for (let row = 0; row < gridList.length; row++) {
            for (let col = 0; col < gridList.length - 2; col++) {
                if (gridList[row][col].getAttribute("color_Key") == gridList[row][col + 1].getAttribute("color_Key") && gridList[row][col + 1].getAttribute("color_Key") == gridList[row][col + 2].getAttribute("color_Key")) {
                    gridList[row][col].style.backgroundImage = 'none'
                    gridList[row][col + 1].style.backgroundImage = 'none'
                    gridList[row][col + 2].style.backgroundImage = 'none'

                    gridList[row][col].setAttribute("color_Key", 'none')
                    gridList[row][col + 1].setAttribute("color_Key", 'none')
                    gridList[row][col + 2].setAttribute("color_Key", 'none')
                }
            }
        }
    }

    function checkRows() {
        for (let row = 0; row < gridList.length; row++) {
            for (let col = 0; col < gridList.length - 2; col++) {
                if (gridList[row][col].getAttribute("color_Key") == gridList[row][col + 1].getAttribute("color_Key") && gridList[row][col + 1].getAttribute("color_Key") == gridList[row][col + 2].getAttribute("color_Key")) {
                    gridList[row][col].style.backgroundImage = 'none'
                    gridList[row][col + 1].style.backgroundImage = 'none'
                    gridList[row][col + 2].style.backgroundImage = 'none'

                    gridList[row][col].setAttribute("color_Key", 'none')
                    gridList[row][col + 1].setAttribute("color_Key", 'none')
                    gridList[row][col + 2].setAttribute("color_Key", 'none')
                }
            }
        }
    }

    function checkColumns() {
        for (let col = 0; col < gridList.length; col++) {
            for (let row = 0; row < gridList.length - 2; row++) {
                if (gridList[row][col].getAttribute("color_Key") == gridList[row + 1][col].getAttribute("color_Key") && gridList[row + 1][col].getAttribute("color_Key") == gridList[row + 2][col].getAttribute("color_Key")) {
                    gridList[row][col].style.backgroundImage = 'none'
                    gridList[row + 1][col].style.backgroundImage = 'none'
                    gridList[row + 2][col].style.backgroundImage = 'none'

                    gridList[row][col].setAttribute("color_Key", 'none')
                    gridList[row + 1][col].setAttribute("color_Key", 'none')
                    gridList[row + 2][col].setAttribute("color_Key", 'none')
                }
            }
        }
    }

    function fillrows() {
        for (let col = 0; col < gridList.length; col++) {
            temp = []
            for (let row = 0; row < gridList.length; row++) {
                if (gridList[row][col].getAttribute("color_Key") != 'none') {
                    temp.push(gridList[row][col].getAttribute("color_Key"))
                }
            }
            //   console.log("temp", temp)
            for (let i = 0; i < ((9 - temp.length)); i++) {
                color = Object.keys(fruits)[Math.floor(Math.random() * Object.keys(fruits).length)]
                temp.unshift(color)
            }
            //  console.log("updated Temp", temp)
            for (let row = 0; row < temp.length; row++) {
                gridList[row][col].setAttribute("color_Key", temp[row])
                gridList[row][col].style.backgroundImage = 'url(' + fruits[temp[row]] + ')'
            }
        }
    }

    // setInterval(checkRows, 2000);
    // setInterval(checkColumns, 2000);

    setInterval(() => {
        checkRows();
        checkColumns();
        fillrows();
    }, 1000);
    //setInterval(fillrows, 1000);
    document.addEventListener("drop", dragDropped);
})