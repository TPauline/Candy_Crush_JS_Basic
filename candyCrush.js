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
    imageDivs = { dragDiv: '', dropDiv: '', ghostDiv: '', tempImage: '', dataTransfer: '' }

    function createGrid() {
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

    function dragStarted(e) {
        div = e.target || e.srcElement || e.targetTouches[0];
        imageDivs.dragDiv = div
        var ghostDiv = document.createElement("img");
        ghostDiv.src = fruits[div.getAttribute("color_Key")];
        var ghostHolder = document.createElement('div');
        ghostHolder.appendChild(ghostDiv);
        ghostHolder.style.position = "absolute";
        ghostHolder.style.top = "0px";
        ghostHolder.style.left = "-500px";
        imageDivs.ghostDiv = ghostHolder
        document.querySelector('body').appendChild(imageDivs.ghostDiv);
        imageDivs.dataTransfer = e.dataTransfer
        imageDivs.dataTransfer.setDragImage(ghostHolder, 50, 50);
        dragImhg = div.style.backgroundImage
    }

    function swap_images(drag, drop, div) {
        drag.style.backgroundImage = div.style.backgroundImage
        temp = drag.getAttribute("color_Key")
        drag.setAttribute("color_Key", div.getAttribute("color_Key"))
        div.setAttribute("color_Key", temp)
        drop.style.backgroundImage = 'url(' + fruits[imageDivs.dropDiv.getAttribute("color_Key")] + ')'
    }

    function draggedOver(e) {
        e.preventDefault();
        div = e.target || e.srcElement;
        imageDivs.dropDiv = div

        if (imageDivs.dragDiv.offsetLeft - div.offsetLeft == -80 && imageDivs.dragDiv.offsetTop - div.offsetTop == 0) {
            console.log("same row to RIGHT")
            swap_images(imageDivs.dragDiv, imageDivs.dropDiv, div)
        } else if (imageDivs.dragDiv.offsetLeft - div.offsetLeft == 80 && imageDivs.dragDiv.offsetTop - div.offsetTop == 0) {
            console.log("same row to LEFT")
            swap_images(imageDivs.dragDiv, imageDivs.dropDiv, div)
        } else if (imageDivs.dragDiv.offsetLeft - div.offsetLeft == 0 && imageDivs.dragDiv.offsetTop - div.offsetTop == 80) {
            console.log("same column to top ")
            swap_images(imageDivs.dragDiv, imageDivs.dropDiv, div)
        } else if (imageDivs.dragDiv.offsetLeft - div.offsetLeft == 0 && imageDivs.dragDiv.offsetTop - div.offsetTop == -80) {
            console.log("same column to bottom ")
            swap_images(imageDivs.dragDiv, imageDivs.dropDiv, div)
        }
        imageDivs.dataTransfer.clearData()
    }

    function dragDropped(e) {
        div = e.target || e.srcElement;
        document.querySelector('body').removeChild(imageDivs.ghostDiv);
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
            console.log("temp", temp)
            for (let i = 0; i < ((9 - temp.length)); i++) {
                color = Object.keys(fruits)[Math.floor(Math.random() * Object.keys(fruits).length)]
                temp.unshift(color)
            }
            console.log("updated Temp", temp)
            for (let row = 0; row < temp.length; row++) {
                gridList[row][col].setAttribute("color_Key", temp[row])
                gridList[row][col].style.backgroundImage = 'url(' + fruits[temp[row]] + ')'
            }
        }
    }

    setInterval(checkRows, 100);
    setInterval(checkColumns, 100);
    setInterval(fillrows, 100);
    document.addEventListener("drop", dragDropped);
})