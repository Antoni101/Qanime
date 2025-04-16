let watchlist = [];

class myAnime {
    constructor() {
        this.watchlist = false;
        this.watching = false;
        this.finished = false;
        this.dropped = false;
        this.progress = null;
        this.userScore = null;
        this.userReviews = [];
    }
}

function openWatchlist() {
    document.querySelector(".watchList").style.display = "Flex";
}

function removeAnime(id) {
    let animeIndex = watchlist.indexOf(id);
    watchlist.splice(animeIndex, 1);
}

function addAnime(id) {
    watchlist.push(id);
}