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
    matches = []
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
                console.log(ck)
                div.setAttributeNode(ck);
                div.style.backgroundImage = 'url(' + fruits[color] + ')'
                row.push(div)

                div.addEventListener('dragstart', dragStarted, false);
                div.addEventListener('dragover', draggedOver);

                // img = document.createElement('div')
                // img.draggable = 'true'
                // img.classList.add("ims");
                // ck = document.createAttribute('color_Key')
                // color = Object.keys(fruits)[Math.floor(Math.random() * Object.keys(fruits).length)]
                // ck.value = color
                // console.log(ck)
                // img.setAttributeNode(ck);
                // console.log(img.getAttribute("color_Key"))

                // img.style.backgroundImage = 'url(' + fruits[color] + ')'
                // x = (div.offsetLeft + (div.offsetWidth / 3));
                // y = (div.offsetTop + (div.offsetWidth / 3));
                // placeDiv(img, x, y)
                //     // img.style.zIndex = "0";
                // gameArea.appendChild(img);
                // // when the user clicks down on the element
                // // div.style.backgroundImage = fruits[Object.keys(fruits)[Math.floor(Math.random() * Object.keys(fruits).length)]]
                // row.push(img)
            }
            gridList.push(row)
        }

    }
    createGrid()
    let newPosX = 0,
        newPosY = 0,
        startPosX = 0,
        startPosY = 0;
    // gridList.forEach(r => {
    //     r.forEach(el => {


    //         // when the user clicks down on the element
    //         el.addEventListener('mousedown', function(e) {
    //             e.preventDefault();

    //             // get the starting position of the cursor
    //             startPosX = e.clientX;
    //             startPosY = e.clientY;
    //             elBeingDragged = el
    //             document.addEventListener('mousemove', mouseMove);

    //             document.addEventListener('mouseup', function() {
    //                 document.removeEventListener('mousemove', mouseMove);
    //             });

    //         });
    //     });
    // });


    function dragStarted(e) {
        // e.preventDefault();

        div = e.target || e.srcElement;
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
            // div.style.backgroundImage = "none"
        matches.push(div)
        console.log("***", imageDivs.ghostDiv)

        // placeDiv(div, 0, 0)
        console.log("&&&", div)
            // el = div
    }

    function swap_images(drag, drop, div) {
        drag.style.backgroundImage = div.style.backgroundImage

        temp = drag.getAttribute("color_Key")
        console.log(temp)

        console.log("$$$", div.getAttribute("color_Key"))
        drag.setAttribute("color_Key", div.getAttribute("color_Key"))
        div.setAttribute("color_Key", temp)
        drop.style.backgroundImage = 'url(' + fruits[imageDivs.dropDiv.getAttribute("color_Key")] + ')'
            //document.querySelector('body').removeChild(imageDivs.ghostDiv);

    }

    function draggedOver(e) {
        e.preventDefault();

        div = e.target || e.srcElement;
        matches.push(div)
        imageDivs.dropDiv = div

        console.log("dragging", "left:" + imageDivs.dragDiv.offsetLeft, "top:" + imageDivs.dragDiv.offsetTop)
        console.log("draggedOver", "left:" + div.offsetLeft, "top:" + div.offsetTop)

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
        console.log("########")

        div = e.target || e.srcElement;

        // temp = imageDivs.dragDiv.getAttribute("color_Key")
        // console.log(temp)

        // console.log("$$$", div.getAttribute("color_Key"))
        // imageDivs.dragDiv.setAttribute("color_Key", div.getAttribute("color_Key"))
        // div.setAttribute("color_Key", temp)
        // imageDivs.dropDiv.style.backgroundImage = 'url(' + fruits[imageDivs.dropDiv.getAttribute("color_Key")] + ')'

        document.querySelector('body').removeChild(imageDivs.ghostDiv);


    }

    function placeDiv(d, x_pos, y_pos) {
        d.style.position = "absolute";
        d.style.left = x_pos + 'px';
        d.style.top = y_pos + 'px';
    }


    // function mouseMove(e) {
    //     // calculate the new position
    //     newPosX = startPosX - e.clientX;
    //     newPosY = startPosY - e.clientY;
    //     console.log()
    //         // with each move we also want to update the start X and Y
    //     startPosX = e.clientX;
    //     startPosY = e.clientY;
    //     elBeingDragged.style.zIndex = "1";

    //     // set the element's new position:
    //     console.log("@@@@", elBeingDragged.offsetTop, ":::", newPos\en-US\docs\Web\API\DataTransfer\mozItemCountY, "**", elBeingDragged.offsetTop - newPosY)
    //     elBeingDragged.style.top = (elBeingDragged.offsetTop - newPosY) + "px";
    //     elBeingDragged.style.left = (elBeingDragged.offsetLeft - newPosX) + "px";
    // }


    function checkRows() {
        for (let row = 0; row < gridList.length; row++) {
            for (let col = 0; col < gridList.length - 2; col++) {
                if (gridList[row][col].getAttribute("color_Key") == gridList[row][col + 1].getAttribute("color_Key") && gridList[row][col + 1].getAttribute("color_Key") == gridList[row][col + 2].getAttribute("color_Key")) {
                    console.log("ROW 3match::")
                    gridList[row][col].style.backgroundImage = 'none'
                    gridList[row][col + 1].style.backgroundImage = 'none'
                    gridList[row][col + 2].style.backgroundImage = 'none'
                }
            }
        }
    }

    function checkColumns() {


        for (let row = 0, col = 0; row < gridList.length; row++) {
            if (gridList[row][col].getAttribute("color_Key") == gridList[row][col + 1].getAttribute("color_Key") && gridList[row][col + 1].getAttribute("color_Key") == gridList[row][col + 2].getAttribute("color_Key")) {
                console.log("COL 3match::")
                gridList[row][col].style.backgroundImage = 'none'
                gridList[row + 1][col].style.backgroundImage = 'none'
                gridList[row + 2][col].style.backgroundImage = 'none'

            }
        }
    }
    checkRows()
    checkColumns()
        //  document.addEventListener('dragstart', dragStarted, false);
        // document.addEventListener('dragover', draggedOver);
    document.addEventListener("drop", dragDropped);

    // document.addEventListener('mousedown', dragStarted, false);
    //document.addEventListener('mouseover', draggedOver);


})