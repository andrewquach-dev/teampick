//addPlayerBtn give 3 word names

/*
 ██████╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗ ███╗   ██╗████████╗███████╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║╚══██╔══╝██╔════╝
██║     ██║   ██║██╔██╗ ██║███████╗   ██║   ███████║██╔██╗ ██║   ██║   ███████╗
██║     ██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██║██║╚██╗██║   ██║   ╚════██║
╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║██║ ╚████║   ██║   ███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝                                                                              
*/

const addPlayerBtn = document.querySelector("#add-btn");
const inputtedPlayerName = document.querySelector("#inputted-player-name");
const playerForm = document.querySelector(".main__form");
const playersList = document.querySelector("#players-list");
const addErrorMsg = document.querySelector("#add-error-msg");
const randoErrorMsg = document.querySelector("#rando-error-msg");
const deleteBtn = document.querySelector("#delete-btn");
const clearBtn = document.querySelector("#clear-btn");
const randoBtn = document.querySelector("#rando-btn");
const teamOneList = document.querySelector("#team-one");
const teamTwoList = document.querySelector("#team-two");
let players = document.querySelectorAll("ul#players-list>li");
let playersInTeams;

let teams;
let draggablePlayer;

/*
███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗    ███████╗██╗  ██╗██████╗ ██████╗ ███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║    ██╔════╝╚██╗██╔╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║██╔════╝
█████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║    █████╗   ╚███╔╝ ██████╔╝██████╔╝█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║███████╗
██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║    ██╔══╝   ██╔██╗ ██╔═══╝ ██╔══██╗██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║╚════██║
██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║    ███████╗██╔╝ ██╗██║     ██║  ██║███████╗███████║███████║██║╚██████╔╝██║ ╚████║███████║
╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝                                                                                                                                                           
*/

const toggleActiveState = function() {
    this.classList.contains("active") ?
        this.classList.remove("active") : this.classList.add("active");
};
const updatePlayersList = () => players = document.querySelectorAll("ul#players-list>li");
const addPlayer = function() {
    const inputtedPlayerNameValue = inputtedPlayerName.value;

    if (doesPlayerExist(inputtedPlayerNameValue)) {
        createErrorMsg("Player added already!", 1500, addErrorMsg);
    } else if (
        inputtedPlayerNameValue.value === 0 ||
        inputtedPlayerNameValue === ""
    ) {
        createErrorMsg("The field is empty!", 1500, addErrorMsg);
    } else {
        let newPlayer = document.createElement("li");
        newPlayer.classList.add("player", "--ripple");
        newPlayer.addEventListener("click", toggleActiveState);
        newPlayer.textContent = inputtedPlayerNameValue;
        playersList.appendChild(newPlayer);
        playerForm.reset();
        updatePlayersList();
        removeListLine();
    }
};
const doesPlayerExist = (newPlayer) => [...players].map((player) => player.innerText).includes(newPlayer);
const createErrorMsg = function(msg, duration, ele) {
    ele.innerHTML = msg;
    ele.style.display = "block";
    setTimeout(function() {
        ele.style.display = "none";
    }, duration);
};
const remove = (sel) =>
    document.querySelectorAll(sel).forEach((el) => el.remove());
const isListEmpty = (selector) =>
    document.querySelectorAll(selector).length === 0;
const removeListLine = () =>
    isListEmpty("#players-list>li") ?
    (playersList.style.display = "none") :
    (playersList.style.display = "block");
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
const randomlyFillTeam = (randomPlayers, team) =>
    randomPlayers.forEach((playerName) => {
        const ele = document.createElement("li");
        ele.classList.add("player");
        ele.setAttribute("draggable", true);
        ele.textContent = playerName;
        team.appendChild(ele);
        playersInTeams = document.querySelectorAll(".player");
    });
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

    teams = document.querySelector("h3+ul");
    makeDraggable();
    makeDroppable();
};
const randomizeAndAssign = () => isListEmpty("#players-list>li") ? createErrorMsg("There are no players to randomize!", 1500, randoErrorMsg) :
    assignTeams(randomize(document.querySelectorAll("#players-list>li")));

const makeDraggable = () => {
    playersInTeams.forEach((player) => {
        player.addEventListener("dragstart", dragStart);
        player.addEventListener("dragend", dragEnd);
    });
};
const makeDroppable = () => {
    teams.forEach((team) => {
        team.addEventListener("dragover", dragOver);
        team.addEventListener("dragenter", dragEnter);
        team.addEventListener("dragleave", dragLeave);
        team.addEventListener("drop", dragDrop);
    })
};
const dragStart = () => draggablePlayer = this;
const dragEnd = () => draggablePlayer = null;
const dragOver = (e) => e.preventDefault();
const dragEnter = () => console.log("dragEnter");
const dragLeave = () => console.log("dragLeave");
const dragDrop = () => {
    this.appendChild(draggablePlayer);
};
/*
███████╗██╗   ██╗███████╗███╗   ██╗████████╗    ██╗     ██╗███████╗████████╗███████╗███╗   ██╗███████╗██████╗ ███████╗
██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝    ██║     ██║██╔════╝╚══██╔══╝██╔════╝████╗  ██║██╔════╝██╔══██╗██╔════╝
█████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║       ██║     ██║███████╗   ██║   █████╗  ██╔██╗ ██║█████╗  ██████╔╝███████╗
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║       ██║     ██║╚════██║   ██║   ██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗╚════██║
███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║       ███████╗██║███████║   ██║   ███████╗██║ ╚████║███████╗██║  ██║███████║
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚══════╝                                                                                                                      
*/

addPlayerBtn.addEventListener("click", addPlayer);
deleteBtn.addEventListener("click", function() {
    remove(".active");
    updatePlayersList();
    isListEmpty("#players-list");
});
clearBtn.addEventListener("click", function() {
    remove("li.player");
    isListEmpty("#players-list");
    updatePlayersList();
    removeListLine();
});
randoBtn.addEventListener("click", randomizeAndAssign);
players

//FOR TESTING! Adds players on startup (The Joeys)
players.forEach((player) => {
    player.addEventListener("click", toggleActiveState);
});