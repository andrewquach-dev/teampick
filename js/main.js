// Variables
const addBtn = document.querySelector("#add");
const delBtn = document.querySelector("#delete");
const clearBtn = document.querySelector("#clear");
const randBtn = document.querySelector("#random");
const list = document.querySelector("#playerSelect");
const nameInput = document.getElementById("name");
const playerForm = document.getElementById("playerForm");
const teamA = document.querySelector("#teamA");
const teamB = document.querySelector("#teamB");
const msg = document.querySelector("msg");

let playersNodeList = document.getElementsByTagName("option");
let players = Array.from(playersNodeList);


// Event listeners
addBtn.addEventListener("click", () => {
    let playerName = nameInput.value;
    const player = document.createElement("option");

    const match = players.find((name) => {
        if (name.innerText.includes(playerName)) {
            return true;
        }
    });

    if (match !== undefined || name.innerText === "") {
        console.log("Player added already or the field is empty!");
    } else {
        player.classList.add("player");
        player.textContent = playerName;

        list.appendChild(player);
        playerForm.reset();
    }
    updatePlayers();
});
delBtn.addEventListener("click", () => {
    let selection = document.getElementById("playerSelect");
    selection.remove(selection.selectedIndex);
    updatePlayers();
});
clearBtn.addEventListener("click", () => {
    while (list.options.length) list.remove(0);
    updatePlayers();
});
randBtn.addEventListener("click", () => {
    let formattedPlayers = players.map(p => p.innerText.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, 'f'));
    let randomPlayers = shuffle(formattedPlayers);
    let halfLength = Math.ceil(randomPlayers.length / 2);
    let teamB = randomPlayers.splice(0, halfLength);

    document.getElementById("teamA").innerHTML = "";
    document.getElementById("teamB").innerHTML = "";
    assignTeamA(randomPlayers);
    assignTeamB(teamB);

    console.log(formattedPlayers);
    console.log(shuffle(formattedPlayers));

});

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function assignTeamA(array) {
    array.forEach(p => {
        let player = document.createElement("li");
        player.classList.add("player");
        player.textContent = p;

        teamA.appendChild(player);
    });
}

function assignTeamB(array) {
    array.forEach(p => {
        let player = document.createElement("li");
        player.classList.add("player");
        player.textContent = p;

        teamB.appendChild(player);
    });
}

function updatePlayers() {
    playersNodeList = document.getElementsByTagName("option");
    players = Array.from(playersNodeList);
}