window.onload = function () {

    var startButton = document.getElementById('startButton');
    var stopButton = document.getElementById('stopButton');
    var parent = document.getElementById('container');
    var score = document.getElementById('score');
    var lastScore = document.getElementById('lastScore');
    var squareCreatingTimer;
    var counter = 0;

    stopButton.disabled = true;

    //run timeout to create new squares in game, disabled start-button
    startButton.onclick = function startGame() {
        setTimeout(repeatTimeout, 1);
        function repeatTimeout () {
            createNewElement();
            var newSquareWaitingTime = getRandomNumber(100, 3000);
            squareCreatingTimer = setTimeout(repeatTimeout, newSquareWaitingTime);
        }
        stopButton.disabled = false;
        startButton.disabled = true;
    }

    //clear timeout, reset counter,remove div-elements from DOM, disabled stop-button
    stopButton.onclick = function stopGame() {
        clearTimeout(squareCreatingTimer);
        removeElements();
        lastScore.innerHTML = counter;
        counter = 0;
        score.innerHTML = counter;
        stopButton.disabled = true;
        startButton.disabled = false;
    }

    //create elements with random position, color, speed
    function createNewElement() {
        var newSquare = document.getElementById('container').appendChild(document.createElement('div'));
        newSquare.className = 'square';
        newSquare.style.left = getRandomNumber(0, parent.clientWidth - newSquare.clientWidth);
        newSquare.style.animationDuration = getRandomNumber(2, 8) + "s";
        newSquare.style.backgroundColor = createRandomColor();
        newSquare.onclick = removeElement;


        // it's need to remove square when it will hide under the parent bottom
        var checkTop = setInterval(function () {
            if (newSquare.offsetTop === parent.clientHeight) {
                parent.removeChild(newSquare);
                clearInterval(checkTop);
            }
        }, 1000)
    }

    // remove clicked element, change score in view
    function removeElement (event) {
        parent.removeChild(event.target);
        counter++;
        score.innerHTML = counter;
    }

    // remove all elements from DOM
    function removeElements() {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // create random HEX color
    function createRandomColor() {
        return "#" + Math.random().toString(16).slice(2, 8);
    }

    // geting random number to make parameters of square
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
