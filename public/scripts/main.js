


function closeWindow(windowName) {
    document.querySelector(windowName).style.display = "None";
    document.getElementById("searchResults").style.filter = "None";
}



function searchAnime() {
    let searchTitle = document.getElementById("searchBox").value;
    if (searchTitle != "") {
        console.log("Searching for anime: ",searchTitle);
        fetchAnime(searchTitle);
    }
    else { console.log("Enter an anime name to search."); }
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
    document.getElementById("addBtn").onclick = () => newAnime(thisAnime.id)

}

function showResults(results) {
    let resultsArea = document.getElementById("searchResults");
    resultsArea.innerHTML = "";
    let counter = 100;
    for (let i=0; i<results.length; i++) {
        let animeItem = document.createElement("div");
        animeItem.classList.add("animeItem");

        let cover = document.createElement("img");
        cover.classList.add("animeCover");
        cover.src = results[i].cover;

        let title = document.createElement("h1");
        title.classList.add("animeTitle");
        title.classList.add("lato-bold");
        title.innerHTML = results[i].title;

        animeCheck(title, results[i])

        animeItem.appendChild(cover);
        animeItem.appendChild(title);
        animeItem.onclick = () => animeInfo(results[i]); 
        resultsArea.appendChild(animeItem);
    }
}


let nsfwFilter = true;
function animeCheck(title, thisAnime) {
    if (thisAnime.rating == "Rx - Hentai" && nsfwFilter == true) {
        console.log("Anime skipped due to rating: ",thisAnime.title);
    }
    if (thisAnime.popularity <= 150) {
        title.innerHTML += "<br><span style='color: yellow;'>Popular</span>";
    }

    if (thisAnime.episodes > 1) {
        title.innerHTML += "<br><span style='color: cyan; font-size: 13px;'>TV - Episodes: "+results[i].episodes + "</span>"
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
