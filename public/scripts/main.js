
let nav = false;
function sidebar() {
    if (nav == false) {
        document.getElementById("nav").style.left = "0%";
        document.getElementById("navBtn").style.left = "22vh";
        nav = true;
    }
    else {
        document.getElementById("nav").style.left = "-100%";
        document.getElementById("navBtn").style.left = "2vh";
        nav = false;
    }
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
    console.log(data.data); // it's in .data array

    let animeResults = [];
    for (let i=0; i<data.data.length; i++) {
        let animeObject = new animeItem(
            data.data[i].title, 
            data.data[i].score,
            data.data[i].episodes,
            data.data[i].year,
            data.data[i].genres,
            data.data[i].images.jpg.image_url,
            data.data[i].synopsis,
            data.data[i].type,
            data.data[i].rating
        );
        animeResults.push(animeObject);
    }

    if (selectedFilters.length > 0) {
        let filteredResults = filterResults(animeResults);
        showResults(filteredResults);
    }
    else {
        showResults(animeResults);
        console.log(animeResults);
    }
}

function showResults(results) {
    let resultsArea = document.getElementById("searchResults");
    resultsArea.innerHTML = "";

    for (let i=0; i<results.length; i++) {
        let animeItem = document.createElement("div");
        animeItem.classList.add("animeItem");

        let cover = document.createElement("img");
        cover.classList.add("animeCover");
        cover.src = results[i].cover;

        let title = document.createElement("h1");
        title.classList.add("animeTitle");
        title.classList.add("lato-bold");
        title.innerHTML = results[i].title

        animeItem.appendChild(cover);
        animeItem.appendChild(title);
        resultsArea.appendChild(animeItem);
    }
}

class animeItem {
    constructor(title, score, episodes, year, genres, cover, desc, type, rating) {
        this.title = title;
        this.score = score;
        this.episodes = episodes;
        this.year = year;
        this.genres = [];
        this.cover = cover;
        this.desc = desc;
        this.type = type;
        this.rating = rating

        this.fixGenre(genres);
    }

    fixGenre(themes) {
        for (let i=0; i<themes.length; i++) {
            this.genres.push(themes[i].name);
        }
    }
}
  