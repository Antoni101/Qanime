
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
    //console.log(data.data); // it's in .data array

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

function exitDetails() {
    let details = document.getElementById("animeDetails");
    details.style.display = "None";
    document.getElementById("searchResults").style.filter = "None";
}

let nsfwFilter = true;
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
            cover.style.opacity = 0.0
            cover.style.transition = "2s"

            let title = document.createElement("h1");
            title.classList.add("animeTitle");
            title.classList.add("lato-bold");
            title.style.opacity = 0.0
            title.style.transition = "2s"
            title.innerHTML = results[i].title;

            if (results[i].popularity <= 150) {
                title.innerHTML += "<br><span style='color: yellow;'>Popular</span>";
            }

            if (results[i].episodes > 1) {
                title.innerHTML += "<br><span style='color: cyan; font-size: 13px;'>TV - Episodes: "+results[i].episodes + "</span>"
            }
            else if (results[i].episodes <= 1 && results[i].type == "Movie") {
                title.innerHTML += "<br><span style='color: red; font-size: 13px;'>Movie</span>"
            }
            else {
                title.innerHTML += "<br><span style='color: pink; font-size: 12px;'>Other/Special</span>"
            }
           
            if (results[i].rating == "R+ - Mild Nudity" || results[i].rating == "Rx - Hentai") {
                cover.style.filter = "blur(0.4rem)"
            }
            animeItem.appendChild(cover);
            animeItem.appendChild(title);

            animeItem.onclick = function() {
                let details = document.getElementById("animeDetails");
                details.style.display = "Block";
                document.getElementById("searchResults").style.filter = "blur(4px)";
                document.getElementById("animeCard").src = results[i].coverB;
                document.getElementById("animeDesc").innerHTML = results[i].desc;
            }

            counter += 100;
            setTimeout(function() {
                resultsArea.appendChild(animeItem);
                setTimeout(function() {
                    cover.style.opacity = "1.0"
                    title.style.opacity = "1.0"
                    setTimeout(function() {
                        cover.style.transition = "0.2s"
                        title.style.transition = "0.2s"
                    },1000)
                },100)
            },counter)

        }
    }
}

class animeItem {
    constructor(title, score, episodes, year, genres, cover, coverB, desc, type, rating, rank, popularity) {
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

        this.fixGenre(genres);
    }

    fixGenre(themes) {
        for (let i=0; i<themes.length; i++) {
            this.genres.push(themes[i].name);
        }
    }
}
  