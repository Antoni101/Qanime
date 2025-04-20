let selectedFilters = [];
let filterScreen = false;
let filtersLoaded = false;


async function fetchGenres() {
    try {
      const res = await fetch("https://api.jikan.moe/v4/genres/anime");
      const data = await res.json();
      
      let genreNames = [];
      for (let i = 0; i < data.data.length; i++) {
        genreNames.push(data.data[i].name);
      }
  
      return genreNames;
    } catch (err) {
      console.error("Error fetching genres:", err);
      return [];
    }
}

let filterChange = false;
async function filterAnime() {
    let filterScr = document.querySelector('.filterScreen');
    if (filterScreen == false) {
        filterScr.style.display = "Block";

        if (filtersLoaded == false) {
            filterScr.innerHTML = "";

            let possibleGenres = await fetchGenres();
            for (let i=0; i<possibleGenres.length; i++) {
                let genreBtn = document.createElement("button");
                genreBtn.innerHTML = possibleGenres[i];
                genreBtn.onclick = function() {
                    if (selectedFilters.includes(possibleGenres[i])) {
                        selectedFilters = selectedFilters.filter(g => g !== possibleGenres[i]);
                        genreBtn.style.border = "None";
                        genreBtn.style.backgroundColor = "rgb(27, 23, 23)";
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
        filterScreen = true;
    }
    else {
        filterScr.style.display = "None";
        filterScreen = false;
    }
}

function filterResults(oldResults) {
    let newResults = [];
    for (let i=0; i<oldResults.length; i++) {
        let match = 0;
        let thisAnime = oldResults[i];
        for (let j=0; j<selectedFilters.length; j++) {
            if (thisAnime.genres.includes(selectedFilters[j])) {
                match++;
            }
        }
        if (match > 0) {
            newResults.push(thisAnime);
        }
    }
    return newResults;
}