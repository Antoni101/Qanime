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

function newAnime(id) {
    if (watchlist.includes(id)) {
        console.log("Anime already in watchlist.")
    }
    else {
        watchlist.push(id);
        console.log(watchlist);
    }
}