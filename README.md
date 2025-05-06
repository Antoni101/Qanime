# AnimeWatchlist


Qanime - Anime Watchlist Tracker

Qanime is a lightweight, responsive anime watchlist web app. This was a school project, so I was mainly just trying to get it done, but I still wanted it to be clean and easy to use. I kept things super simple—just the main stuff like searching anime, adding to your watchlist, and tracking / saving progress in a local database. I didn’t add any extra features that weren’t needed. I do plan to polish it more and improve things over time though.

built using HTML, CSS, and vanilla JavaScript. It integrates the Jikan API for anime data and uses Node.js + Express + SQLite for backend storage.

Users can search anime by title or ID, view details and reviews, filter by genre/type, and manage their personalized watchlist with ratings, progress tracking, and comments.

Features
- Search by Title or ID 
- Detailed View with cover, description, and top reviews
- Watchlist stored in SQLite database
- Track Progress, Rate, and Comment per anime
- Instant Save (adds to DB as soon as user adds to watchlist)
- Filter by Genre
- Config Menu for toggling safe search, movies, TV, and specials
- Fully styled with CSS and responsive layout

Setup Instructions
- git clone https://github.com/Antoni101/Qanime
- cd Qanime
- npm install
- node server.js

Now enter this link on any browser url
- http://localhost:8888

Credits
- Jikan API for anime data
- MyAnimeList as data source
