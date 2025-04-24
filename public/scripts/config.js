
let configs = [
    {name: "Show Movies", toggle: true },
    {name: "Show TV", toggle: true },
    {name: "Safe Search", toggle: true }
]

let showOptions = false;

function configMenu() {
    let options = document.querySelector(".configMenu");
    if (showOptions == true) {
        options.style.display = "None";
        showOptions = false;
    } else { 
        options.style.display = "Block"; 
        showOptions = true;
        updateConfigs(options);
    }
}

function updateConfigs(options) {
    options.innerHTML = "";
    for (let i=0; i<configs.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = configs[i].name;

        if (configs[i].toggle == true) {
            btn.style.opacity = 1.0;
            btn.onclick = () => {
                configs[i].toggle = false;
                updateConfigs(options);
                searchAnime();
            }
        }
        else {
            btn.style.opacity = 0.2;
            btn.onclick = () => {
                configs[i].toggle = true;
                updateConfigs(options);
                searchAnime();
            }
        }
        options.appendChild(btn);
    }
}

function animeCheck(anime) {
    if (anime.rating != "G - All Ages" && anime.rating != "PG - Children" && anime.rating != "PG-13 - Teens 13 or older" && anime.rating != "R - 17+ (violence & profanity)" && configs[2].toggle == true) {
        return false;
    }
    else if (anime.type == "Movie" && configs[0].toggle == false) {
        return false;
    }
    else if (anime.type == "TV" && configs[1].toggle == false) {
        return false;
    }
    else {
        return true;
    }
}