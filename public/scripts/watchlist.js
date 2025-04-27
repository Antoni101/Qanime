let watchlist = [];

class myAnime {
    constructor(info, animeSet, getrating, comment, getprogress) {
        this.status = animeSet;
        this.progress = getprogress;
        this.userScore = getrating;
        this.userComment = comment;
        this.id = info.id;
        this.image = info.cover;
        this.title = info.title;
    }
}

async function openWatchlist() {
    let wl = document.querySelector(".watchList");
    document.getElementById("searchResults").style.filter = "blur(4px)";
    wl.innerHTML = "";

    addXbtn(wl,".watchList");

    for (let i=0; i<watchlist.length; i++) {
        let aSection = document.createElement("div");
        aSection.classList.add("animeSection");
        aSection.style.backgroundImage = `url(${watchlist[i].image})`;
        aSection.onclick = async () => {
            let details = await searchID(watchlist[i].id);
            animeInfo(details);
        }

        let aTitle = document.createElement("h1");
        aTitle.innerHTML = watchlist[i].title;
        aTitle.classList.add("aTitle");
        aTitle.classList.add("lato-bold");

        aSection.appendChild(aTitle);
        wl.appendChild(aSection);
    }
    wl.style.display = "flex";
}

function removeAnime(anime_id) {
    for (let i=0; i<watchlist.length; i++) {
        if (watchlist[i].id == anime_id) {
            watchlist.splice(i, 1);
            openWatchlist();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const epSlider = document.getElementById("episodeValue");
    const epValue = document.getElementById("episodeNum");
    epValue.classList.add("lato-light");

    epSlider.addEventListener("input", () => {
        epValue.textContent = "Episode Progress: " + epSlider.value + "/" + epSlider.max;
    });
});


function watchDetails(theAnime) {
    document.querySelector(".addScreen").style.display = "Block";
    let ep = document.getElementById("episodeValue");
    
    if (theAnime.episodes < 2) {
        ep.style.display = "None";
        document.getElementById("episodeNum").style.display = "None";
    }
    else {
        ep.style.display = "Block";
        document.getElementById("episodeNum").style.display = "Block";
    }
    ep.max = theAnime.episodes;
    closeWindow('.animeDetails');
    closeWindow('.watchList');
    document.getElementById("searchResults").style.filter = "blur(4px)";
    document.getElementById("episodeNum").innerHTML = "Episode Progress: " + 0 + "/" + theAnime.episodes;
    document.getElementById("doneBtn").onclick = () => {
        closeWindow('.addScreen');
        let progress = ep.value;
        let comment = document.getElementById("animeComment").value;
        let rating = document.getElementById("animeRating").value;
        let animeSet = document.getElementById("animeSet").value;

        if (rating > 10) { rating = 10 }
        else if (rating < 0) { rating = 0 };

        let newAnime = new myAnime(theAnime, animeSet, rating, comment, progress);
        watchlist.push(newAnime);
        document.getElementById("searchResults").style.filter = "None";
    }
}

