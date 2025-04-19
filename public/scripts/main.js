


function closeWindow(windowName) {
    document.querySelector(windowName).style.display = "None";
    document.getElementById("searchResults").style.filter = "None";
}

setInterval(() => {
    searchAnime();
}, 500); // checks every 500ms


let lastSearch = "";
function searchAnime() {
    let searchTitle = document.getElementById("searchBox").value;
    if (lastSearch != searchTitle) {
        if (searchTitle != "") {
            lastSearch = searchTitle;
            console.log("Searching for anime: ",searchTitle);
            document.getElementById("searchResults").style.opacity = 0.5;
            document.getElementById("searchResults").style.filter = "blur(0.4rem)"
            fetchAnime(searchTitle);
        }
    }
}

async function fetchAnime(query) {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await res.json();
    //cconsole.log(data.data); // it's in .data array

    let animeResults = [];
    for (let i=0; i<data.data.length; i++) {
        let animeObject = new animeItem(
            data.data[i].title, 
            data.data[i].score,
            data.data[i].episodes,
            data.data[i].year,
            data.data[i].genres,
            data.data[i].images.jpg.image_url,
            data.data[i].images.jpg.large_image_url,
            data.data[i].synopsis,
            data.data[i].type,
            data.data[i].rating,
            data.data[i].rank,
            data.data[i].popularity,
            data.data[i].mal_id
        );
        animeResults.push(animeObject);
    }

    animeResults.sort((a, b) => a.popularity - b.popularity);


    if (selectedFilters.length > 0) {
        let filteredResults = filterResults(animeResults);
        showResults(filteredResults);
    }
    else {
        showResults(animeResults);
        console.log(animeResults);
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
            addAnime(thisAnime);
            animeInfo(thisAnime);
        }
    } 

}

function checkId(id) {
    for (let i=0; i<watchlist.length; i++) {
        if (watchlist[i].info.id == id) {
            return true;
        }
    }
    return false;
}

function showResults(results) {
    let resultsArea = document.getElementById("searchResults");
    resultsArea.innerHTML = "";
    let counter = 100;
    for (let i=0; i<results.length; i++) {
        if (results[i].rating == "Rx - Hentai" && nsfwFilter == true) {
            console.log("Anime skipped due to rating: ",results[i].title);
        }
        else {
            let animeItem = document.createElement("div");
            animeItem.classList.add("animeItem");

            let cover = document.createElement("img");
            cover.classList.add("animeCover");
            cover.src = results[i].cover;

            let title = document.createElement("h1");
            title.classList.add("animeTitle");
            title.classList.add("lato-bold");
            title.innerHTML = results[i].title;

            animeCheck(title, cover, results[i])

            animeItem.appendChild(cover);
            animeItem.appendChild(title);
            animeItem.onclick = () => animeInfo(results[i]); 
            resultsArea.appendChild(animeItem);
        }
        
    }
    resultsArea.style.opacity = 1.0;
    document.getElementById("searchResults").style.filter = "None";
}


let nsfwFilter = true;
function animeCheck(title, cover, thisAnime) {
    if (thisAnime.popularity <= 150) {
        title.innerHTML += "<br><span style='color: yellow;'>Popular</span>";
    }

    if (thisAnime.episodes > 1) {
        title.innerHTML += "<br><span style='color: cyan; font-size: 13px;'>TV - Episodes: "+thisAnime.episodes + "</span>"
    }
    else if (thisAnime.episodes <= 1 && thisAnime.type == "Movie") {
        title.innerHTML += "<br><span style='color: red; font-size: 13px;'>Movie</span>"
    }
    else {
        title.innerHTML += "<br><span style='color: pink; font-size: 12px;'>Other/Special</span>"
    }

    if (thisAnime.rating == "R+ - Mild Nudity" || thisAnime.rating == "Rx - Hentai") {
        cover.style.filter = "blur(0.4rem)"
    }
}

class animeItem {
    constructor(title, score, episodes, year, genres, cover, coverB, desc, type, rating, rank, popularity, id) {
        this.title = title;
        this.score = score;
        this.episodes = episodes;
        this.year = year;
        this.genres = [];
        this.cover = cover;
        this.coverB = coverB;
        this.desc = desc;
        this.type = type;
        this.rating = rating;
        this.rank = rank;
        this.popularity = popularity;
        this.id = id;

        this.fixGenre(genres);
    }

    fixGenre(themes) {
        for (let i=0; i<themes.length; i++) {
            this.genres.push(themes[i].name);
        }
    }
}
