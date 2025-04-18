let watchlist = [];

class myAnime {
    constructor(getAnime) {
        this.watching = false;
        this.finished = false;
        this.dropped = false;
        this.progress = null;
        this.userScore = null;
        this.userReviews = [];
        this.info = getAnime;
    }
}

function openWatchlist() {
    let wl = document.querySelector(".watchList")
    wl.style.display = "Block";
    document.getElementById("searchResults").style.filter = "blur(4px)";
    wl.innerHTML = "";

    let xBtn = document.createElement("button");
    xBtn.classList.add("xBtn");
    xBtn.onclick = () => { closeWindow('.watchList')}
    wl.appendChild(xBtn);

    for (let i=0; i<watchlist.length; i++) {
        let aSection = document.createElement("div");
        aSection.classList.add("animeSection");
        aSection.style.backgroundImage = `url(${watchlist[i].info.coverB})`;
        aSection.onclick = () => animeInfo(watchlist[i].info); 

        let aTitle = document.createElement("h1");
        aTitle.innerHTML = watchlist[i].info.title;
        aTitle.classList.add("aTitle");
        aTitle.classList.add("lato-bold");

        aSection.appendChild(aTitle);
        wl.appendChild(aSection);
    }
}

function removeAnime(anime_id) {
    for (let i=0; i<watchlist.length; i++) {
        if (watchlist[i].info.id == anime_id) {
            watchlist.splice(i, 1);
        }
    }
    console.log(watchlist);
}

function addAnime(theAnime) {
    let newAnime = new myAnime(theAnime);
    watchlist.push(newAnime);
}