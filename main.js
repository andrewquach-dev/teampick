const addBtn = document.querySelector("#add");
const delBtn = document.querySelector("#delete");

const list = document.querySelector("#playersList");
const nameInput = document.getElementById("name");
const playerForm = document.getElementById("playerForm");

addBtn.addEventListener("click", () => {
    let playerName = nameInput.value;
    let playersNodeList = document.getElementsByTagName("li");
    let players = Array.from(playersNodeList);
    const player = document.createElement("li");
    console.log(players);
    console.log(players.map(e => {
        e.replace(/(<li class="player">).+(<\/li>)/g, '');
    }));
    const match = players.find((name) => {
        if (name.innerText.includes(playerName)) {
            return true;
        }
    });

    if (match !== undefined) {
        console.log("Player added already or the field is empty!");
    } else {
        player.classList.add("player");
        player.textContent = playerName;

        list.appendChild(player);
        playerForm.reset();
    }
});
delBtn.addEventListener("click", () => {

});