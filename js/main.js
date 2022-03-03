const addBtn = document.querySelector("#add-btn");
const inputtedPlayerName = document.querySelector("#inputted-player-name");
const playerForm = document.querySelector("#player-form");
const players = document.querySelectorAll("#players-list>li");
const playersList = document.querySelector("#players-list");
const errorMsg = document.querySelector("#error-msg");
const deleteBtn = document.querySelector("#delete-btn");
const clearBtn = document.querySelector("#clear-btn");
const randoBtn = document.querySelector("#rando-btn");
const remove = (sel) => document.querySelectorAll(sel).forEach(el => el.remove());
const teamOneList = document.querySelector("#team-one");
const teamTwoList = document.querySelector("#team-two");

addBtn.addEventListener("click", addPlayer);
deleteBtn.addEventListener("click", deletePlayers);
clearBtn.addEventListener("click", clearPlayers);
randoBtn.addEventListener("click", randomizeAndAssign);

function addPlayer() {
    let inputtedPlayerNameValue = inputtedPlayerName.value,
        newPlayer;

    if (doesPlayerExist(inputtedPlayerNameValue)) {
        createErrorMsg("Player added already!", 1500);
    } else if (inputtedPlayerNameValue.value === 0 || inputtedPlayerNameValue === '') {
        createErrorMsg("The field is empty!", 1500);
    } else {
        newPlayer = document.createElement("li");
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
        isListEmpty();
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
    isListEmpty();
}

function clearPlayers() {
    remove("li.player");
    isListEmpty();
}

function isListEmpty() {
    if (document.querySelectorAll("#players-list>li").length === 0) {
        playersList.style.display = "none";
    } else {
        playersList.style.display = "block";
    }
}

function randomizeAndAssign() {
    let randomizedPlayersList = randomize(document.querySelectorAll("#players-list>li"));
    assignTeams(randomizedPlayersList);
}

function randomize(players) {
    let playersArray = [...players].map(node => node.innerText);
    let currentIndex = playersArray.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = playersArray[currentIndex];
        playersArray[currentIndex] = playersArray[randomIndex];
        playersArray[randomIndex] = temporaryValue;
    }

    return playersArray;
}

function assignTeams(players) {
    let halfLength = Math.ceil(players.length / 2);
    let teamOne = players.splice(0, halfLength);
    let teamTwo = players;

    teamOne.forEach(playerName => {
        let ele = document.createElement("li");
        ele.classList.add("team-player");
        ele.textContent = playerName;
        teamOneList.appendChild(ele);
    });
    teamTwo.forEach(playerName => {
        let ele = document.createElement("li");
        ele.classList.add("team-player");
        ele.textContent = playerName;
        teamTwoList.appendChild(ele);
    });
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