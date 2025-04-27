
document.addEventListener("DOMContentLoaded", () => {
    filterAnime();
});

function closeWindow(windowName) {
    document.querySelector(windowName).style.display = "None";
    document.getElementById("searchResults").style.filter = "None";
}

function addXbtn(element, windowClass) {
    let xBtn = document.createElement("button");
    xBtn.classList.add("xBtn");
    xBtn.onclick = () => { closeWindow(windowClass)}
    element.appendChild(xBtn);
}

let searchCooldown = false;
async function searchAnime() {
    if (searchCooldown != true) {
        searchCooldown = true;
        document.getElementById("searchResults").style.opacity = 0.0;
        setTimeout(async function() {
            document.getElementById("searchResults").innerHTML = "";
            let searchValue = document.getElementById("searchBox").value;
            let searchId = parseInt(searchValue);
            if (Number.isInteger(searchId)) {
                showResult(await searchID(searchId));
            }
            else if (searchValue != "") {
                await searchTitle(searchValue);
            }
            searchCooldown = false;
            document.getElementById("searchResults").style.opacity = 1.0;
        },300);
    }
}

function sortAnime(animeData) {
    let animeObject = new animeItem(
        animeData.title, 
        animeData.score,
        animeData.episodes,
        animeData.year,
        animeData.genres,
        animeData.images.jpg.image_url,
        animeData.images.jpg.large_image_url,
        animeData.synopsis,
        animeData.type,
        animeData.rating,
        animeData.rank,
        animeData.popularity,
        animeData.mal_id
    );
    return animeObject;
}

async function searchTitle(query) {
    try {
        let searchResults = [];
        const res = await fetch(`/api/anime?q=${query}`);
        const data = await res.json();
        for (let i=0; i<data.data.length; i++) {
            searchResults.push(sortAnime(data.data[i]));
        }

        searchResults.sort((a, b) => a.popularity - b.popularity);

        let index = 0;
        let loadAnimes = setInterval(function() {
            if (index < searchResults.length) {
                showResult(searchResults[index]);
                index++;
            }
            else {
                clearInterval(loadAnimes);
            }
        },50);
    } catch (err) {
        console.error("Failed to fetch any anime by that Title:", err);
    }
}

async function searchID(animeID) {
    try {
        const res = await fetch(`/api/anime/${animeID}`);
        const json = await res.json();
        let animeData = sortAnime(json.data);
        return animeData;
  
    } catch (err) {
        console.error("Failed to fetch anime by ID:", err);
    }
}


function animeInfo(thisAnime) {
    const animeDetails = document.querySelector('.animeDetails')
    animeDetails.style.display = "Block";

    document.getElementById("searchResults").style.filter = "blur(4px)";
    document.getElementById("animeCard").src = thisAnime.coverB;
    document.getElementById("animeDesc").innerHTML = thisAnime.desc;

    if (checkId(thisAnime.id) == true) {
        document.getElementById("addBtn").innerHTML = "Remove from Watchlist";
        document.getElementById("addBtn").onclick = () => { 
            removeAnime(thisAnime.id); 
            animeInfo(thisAnime);
        }
    }
    else {
        document.getElementById("addBtn").innerHTML = "Add to Watchlist";
        document.getElementById("addBtn").onclick = () => { 
            watchDetails(thisAnime); 
        }
    } 
}

function showResult(result) {
    let resultsArea = document.getElementById("searchResults");

    if (animeCheck(result) != false && filterCheck(result) != false) {
        let animeItem = document.createElement("div");
        animeItem.classList.add("animeItem");

        let cover = document.createElement("img");
        cover.classList.add("animeCover");
        cover.src = result.cover;

        let title = document.createElement("h1");
        title.classList.add("animeTitle");
        title.classList.add("lato-bold");
        title.innerHTML = result.title;

        if (result.type == "TV") {
            title.innerHTML += "<br><span style='color: cyan; font-size: 13px;'>TV</span>"
        }
        else if (result.episodes <= 1 && result.type == "Movie") {
            title.innerHTML += "<br><span style='color: red; font-size: 13px;'>Movie</span>"
        }
        else {
            title.innerHTML += "<br><span style='color: pink; font-size: 12px;'>Other/Special</span>"
        };

        animeItem.appendChild(cover);
        animeItem.appendChild(title);
        animeItem.onclick = () => animeInfo(result); 
        resultsArea.appendChild(animeItem);

        animeItem.style.opacity = 0.0;
        setTimeout(function() {
            animeItem.style.opacity = 0.9;
        },100)
    }     
}

function checkId(id) {
    for (let i=0; i<watchlist.length; i++) {
        if (watchlist[i].id == id) {
            return true;
        }
    }
    return false;
}

class animeItem {
    constructor(title, score, episodes, year, getgenres, cover, coverB, desc, type, rating, rank, popularity, id) {
        this.title = title;
        this.score = score;
        this.episodes = episodes;
        this.year = year;
        this.cover = cover;
        this.coverB = coverB;
        this.desc = desc;
        this.type = type;
        this.rating = rating;
        this.rank = rank;
        this.popularity = popularity;
        this.id = id;
        this.genres = [];
        for (let i=0; i<getgenres.length; i++) {
            this.genres.push(getgenres[i].name);
        }
    }
}
