const apikey = import.meta.env.VITE_API_KEY;
const searchInput = document.getElementById("search-bar")
const searchBtn = document.getElementById("search-btn")
const searchResults = document.getElementById("results")
let watchList = JSON.parse(localStorage.getItem("watchlist"));

searchBtn.addEventListener("click", getData);

async function getData(){
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${searchInput.value}`);
    const data = await res.json();
    for(let child of searchResults.children)
        child.style.display = "none";
        
    let moviesHtml = "";
    let foundMovie = false;
    if(data.Search){
        for(let movie of data.Search){
            let res2 = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${movie.imdbID}`)
            let fullData = await res2.json();
            if(fullData.Response === "True"){
                foundMovie = true;
                moviesHtml += `
                    <div class="movies">
                        <img class="movie-poster" src="${fullData.Poster}" alt="${fullData.Title} Poster">
                        <div class="movie-wrapper">
                            <div class="movie-title-rating">
                                <h3 class="movie-title">${fullData.Title}</h3>
                                <div class="rating">
                                    <img src="/images/star.png" alt="Yellow Star">
                                    <p>${fullData.imdbRating}</p>
                                </div>
                            </div>
                            <div class="movie-runtime-genre">
                                <p>${fullData.Runtime}</p>
                                <p>${fullData.Genre}</p>
                                <div class="btn-wrapper">
                                    <button class="watchlist-btn" data-movie-id="${movie.imdbID}">+</button>
                                    <p>Watchlist<p>
                                </div>
                            </div>
                            <div class="movie-description">
                                <p>${fullData.Plot}</p>
                            </div>
                        </div>
                    </div>
                    `;
            }
        }
    }
    if(!foundMovie) moviesHtml = `<p class="result-not-found">Unable to find what you’re looking for. Please try another search.</p>`
    searchResults.innerHTML = moviesHtml;
}

document.addEventListener("click", function(e){
    if (e.target.classList.contains("watchlist-btn")){
        const movieID = e.target.dataset.movieId;
        if(!watchList.includes(movieID))
            watchList.push(movieID);
        localStorage.setItem("watchlist", JSON.stringify(watchList));
    }
})
