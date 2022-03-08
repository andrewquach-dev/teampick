/** 
 *  Constants
 */
const addPlayerBtn = document.querySelector("#add-btn");
const inputtedPlayerName = document.querySelector("#inputted-player-name");
const addPlayerForm = document.querySelector("#player-form");
const addedPlayers = document.querySelectorAll("ul#players-list>li");
const playersList = document.querySelector("#players-list");
const errorMsg = document.querySelector("#error-msg");
const deletePlayerBtn = document.querySelector("#delete-btn");
const clearPlayersBtn = document.querySelector("#clear-btn");
const randomizePlayersBtn = document.querySelector("#rando-btn");
const teamOneList = document.querySelector("#team-one");
const teamTwoList = document.querySelector("#team-two");

/** 
 *  Function expressions
 */
const addPlayer = function() {
    const inputtedPlayerNameValue = inputtedPlayerName.value;

    if (doesPlayerExist(inputtedPlayerNameValue)) {
        createErrorMsg("Player added already!", 1500);
    } else if (
        inputtedPlayerNameValue.value === 0 ||
        inputtedPlayerNameValue === ""
    ) {
        createErrorMsg("The field is empty!", 1500);
    } else {
        let newPlayer = document.createElement("li");
        newPlayer.classList.add("player", "ripple");
        newPlayer.addEventListener("click", function() {
            if (this.classList.contains("active")) {
                this.classList.remove("active");
            } else {
                this.classList.add("active");
            }
        });
        newPlayer.textContent = inputtedPlayerNameValue;
        playersList.appendChild(newPlayer);
        addPlayerForm.reset();
        isListEmpty();
    }
};
const doesPlayerExist = (newPlayer) => [...addedPlayers].map((player) => player.innerText).includes(newPlayer);
const createErrorMsg = function(msg, duration) {
    errorMsg.innerHTML = msg;
    errorMsg.style.display = "block";
    setTimeout(function() {
        errorMsg.style.display = "none";
    }, duration);
};
const remove = (sel) =>
    document.querySelectorAll(sel).forEach((el) => el.remove());
const isListEmpty = () =>
    document.querySelectorAll("#players-list>li").length === 0 ?
    (playersList.style.display = "none") :
    (playersList.style.display = "block");
const randomlyFillTeam = (randomPlayers, team) =>
    randomPlayers.forEach((playerName) => {
        const ele = document.createElement("li");
        ele.classList.add("team-player");
        ele.textContent = playerName;
        team.appendChild(ele);
    });
const randomize = function(players) {
    let playersArray = [...players].map((node) => node.innerText);
    let currentIndex = playersArray.length,
        temporaryValue,
        randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = playersArray[currentIndex];
        playersArray[currentIndex] = playersArray[randomIndex];
        playersArray[randomIndex] = temporaryValue;
    }

    return playersArray;
};
const assignTeams = function(players) {
    const halfLength = Math.ceil(players.length / 2);
    const teamOne = players.splice(0, halfLength);
    const teamTwo = players;
    const randomNum = Math.floor(Math.random() * 2);

    teamOneList.innerText = "";
    teamTwoList.innerText = "";

    if (randomNum === 0) {
        randomlyFillTeam(teamOne, teamOneList);
        randomlyFillTeam(teamTwo, teamTwoList);
    } else {
        randomlyFillTeam(teamTwo, teamOneList);
        randomlyFillTeam(teamOne, teamTwoList);
    }
};
const randomizeAndAssign = () =>
    assignTeams(randomize(document.querySelectorAll("#players-list>li")));
/** 
 *  Event listeners
 */
addPlayerBtn.addEventListener("click", addPlayer);
deletePlayerBtn.addEventListener("click", function() {
    remove(".active");
    isListEmpty();
});
clearPlayersBtn.addEventListener("click", function() {
    remove("li.player");
    isListEmpty();
});
randomizePlayersBtn.addEventListener("click", randomizeAndAssign);


addedPlayers.forEach((player) => {
    player.addEventListener("click", function() {
        if (this.classList.contains("active")) {
            this.classList.remove("active");
        } else {
            this.classList.add("active");
        }
    });
});