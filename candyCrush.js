document.addEventListener('DOMContentLoaded', () => {
    gameArea = document.querySelector(".gameArea")
    grid = document.querySelector(".grid")
    length = 9;
    fruits = {
        'blue': 'url(images/blue-candy.png)',
        'green': 'url(images/green-candy.png)',
        'orange': 'url(images/orange-candy.png)',
        'purple': 'url(images/purple-candy.png)',
        'red': 'url(images/red-candy.png)',
        'yellow': 'url(images/yellow-candy.png)',
    }
    gridList = []
    matches = []
    currId = 0

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

                img = document.createElement('div')
                img.draggable = 'true'
                img.classList.add("ims");
                img.style.backgroundImage = fruits[Object.keys(fruits)[Math.floor(Math.random() * Object.keys(fruits).length)]]
                x = (div.offsetLeft + (div.offsetWidth / 2) - 10);
                y = (div.offsetTop + (div.offsetWidth / 2) - 10);
                placeDiv(img, x, y)
                    // img.style.zIndex = "0";
                gameArea.appendChild(img);
                // when the user clicks down on the element
                // div.style.backgroundImage = fruits[Object.keys(fruits)[Math.floor(Math.random() * Object.keys(fruits).length)]]
                row.push(img)
            }
            gridList.push(row)
        }
    }
    createGrid()
    let newPosX = 0,
        newPosY = 0,
        startPosX = 0,
        startPosY = 0;
    gridList.forEach(r => {
        r.forEach(el => {


            // when the user clicks down on the element
            el.addEventListener('mousedown', function(e) {
                e.preventDefault();

                // get the starting position of the cursor
                startPosX = e.clientX;
                startPosY = e.clientY;
                elBeingDragged = el
                document.addEventListener('mousemove', mouseMove);

                document.addEventListener('mouseup', function() {
                    document.removeEventListener('mousemove', mouseMove);
                });

            });
        });
    });


    function dragStarted(e) {
        div = e.target || e.srcElement;
        console.log(div)
            // div.style.backgroundImage = 'none'
        matches.push(div)
            // placeDiv(div, 0, 0)
            // el.style.zIndex = "1";
        console.log("&&&", div)
            // el = div

    }

    function placeDiv(d, x_pos, y_pos) {
        d.style.position = "absolute";
        d.style.left = x_pos + 'px';
        d.style.top = y_pos + 'px';
    }


    function mouseMove(e) {
        // calculate the new position
        newPosX = startPosX - e.clientX;
        newPosY = startPosY - e.clientY;

        // with each move we also want to update the start X and Y
        startPosX = e.clientX;
        startPosY = e.clientY;
        elBeingDragged.style.zIndex = "1";

        // set the element's new position:
        elBeingDragged.style.top = (elBeingDragged.offsetTop - newPosY) + "px";
        elBeingDragged.style.left = (elBeingDragged.offsetLeft - newPosX) + "px";
    }

    document.addEventListener('dragstart', dragStarted);


})