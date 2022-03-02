const addBtn = document.querySelector("#add-btn");
const inputtedPlayerName = document.querySelector("#inputted-player-name");
const playerForm = document.querySelector("#player-form");
const players = document.querySelectorAll("#players-list>li");
const playersList = document.querySelector("#players-list");
const errorMsg = document.querySelector("#error-msg");
const deleteBtn = document.querySelector("#delete-btn");
const clearBtn = document.querySelector("#clear-btn");
const remove = (sel) => document.querySelectorAll(sel).forEach(el => el.remove());

addBtn.addEventListener("click", addPlayer);
deleteBtn.addEventListener("click", deletePlayers);
clearBtn.addEventListener("click", clearPlayers);

function addPlayer() {
    let inputtedPlayerNameValue = inputtedPlayerName.value;

    if (doesPlayerExist(inputtedPlayerNameValue)) {
        createErrorMsg("Player added already!", 1500);
    } else if (inputtedPlayerNameValue.value === 0 || inputtedPlayerNameValue === '') {
        createErrorMsg("The field is empty!", 1500);
    } else {
        let newPlayer = document.createElement("li");
        newPlayer.classList.add("player", "ripple");
        newPlayer.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
            }
        });
        newPlayer.textContent = inputtedPlayerNameValue;
        playersList.appendChild(newPlayer);
        playerForm.reset();
        isPlayersListEmpty();
    }
}

function doesPlayerExist(newPlayer) {
    let doesExist = false,
        playersArray = [...document.getElementById("players-list").getElementsByTagName("li")];

    playersArray.forEach(player => {
        if (player.innerText === newPlayer) {
            doesExist = true;
        }
    });

    return doesExist;
}

function createErrorMsg(msg, duration) {
    errorMsg.innerHTML = msg;
    errorMsg.style.display = "block";
    setTimeout(function() {
        errorMsg.style.display = "none";
    }, duration);
}

function deletePlayers() {
    remove(".active");
    isPlayersListEmpty();
}

function clearPlayers() {
    remove("li.player");
    isPlayersListEmpty();
}

function isPlayersListEmpty() {
    if (document.querySelectorAll("#players-list>li").length === 0) {
        playersList.style.display = "none";
    } else {
        playersList.style.display = "block";
    }
}

//for testing
players.forEach(player => {
    player.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
        } else {
            this.classList.add('active');
        }
    });
});