let selectedFilters = [];
let filterScreen = false;
let filtersLoaded = false;


async function fetchGenres() {
    try {
        const res = await fetch("https://api.jikan.moe/v4/genres/anime");
        const data = await res.json();
        
        let genreNames = [];
        for (let i = 0; i < data.data.length; i++) {
        let filterName = data.data[i].name;
        genreNames.push(filterName);
        }
        return genreNames;
    } catch (err) {
        console.error("Error fetching genres:", err);
    }
}

function openFilters() {
    let filterScr = document.querySelector('.filterScreen');
    if (filterScreen == false && filtersLoaded == true)  {
        filterScr.style.display = "Block";
        filterScreen = true;
    }
    else {
        filterScr.style.display = "None";
        filterScreen = false;
    }
}

async function filterAnime() {
    let filterScr = document.querySelector('.filterScreen');
    let possibleGenres = await fetchGenres();
    for (let i=0; i<possibleGenres.length; i++) {
        let genreBtn = document.createElement("button");
        genreBtn.innerHTML = possibleGenres[i];
        genreBtn.onclick = function() {
            if (selectedFilters.includes(possibleGenres[i])) {
                selectedFilters = selectedFilters.filter(g => g !== possibleGenres[i]);
                genreBtn.style.border = "None";
                genreBtn.style.backgroundColor = "rgb(27, 23, 23)";
                genreBtn.style.border = "1px  solid rgb(198, 189, 189)";
                console.log(selectedFilters);
            }
            else {
                selectedFilters.push(possibleGenres[i]);
                console.log(selectedFilters);
                genreBtn.style.border = "1px solid rgb(154, 154, 46)";
                genreBtn.style.backgroundColor = "rgb(41, 41, 38)";
                
            }
            searchAnime();
            filterChange = true;
        }
        filterScr.appendChild(genreBtn);
    }
    filtersLoaded = true;
}

function filterCheck(anime) {
    let match = 0;
    for (let j=0; j<selectedFilters.length; j++) {
        if (anime.genres.includes(selectedFilters[j])) {
            match++;
        }
    }
    if (match == selectedFilters.length) {
        return true;
    }
    else {
        return false;
    }
}