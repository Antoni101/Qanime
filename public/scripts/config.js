
let configs = [
    {name: "Show Movies", toggle: true },
    {name: "Show TV", toggle: true },
    {name: "Blur Covers", toggle: true },
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