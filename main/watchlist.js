const apikey = "a861c2bc";
const watchListContainer = document.getElementById("watchlist-arr")
const watchList = JSON.parse(localStorage.getItem("watchlist"))  || [];

async function renderPage(){
    let watchListHtml = "";
    for (let movie of watchList){
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${movie}`);
        const data = await res.json();
        watchListHtml += `
        <div class="movies">
            <img class="movie-poster" src="${data.Poster}" alt="${data.Title} Poster">
            <div class="movie-wrapper">
                <div class="movie-title-rating">
                    <h3 class="movie-title">${data.Title}</h3>
                    <div class="rating">
                        <img src="/images/star.png" alt="Yellow Star">
                        <p>${data.imdbRating}</p>
                    </div>
                </div>
                <div class="movie-runtime-genre">
                    <p>${data.Runtime}</p>
                    <p>${data.Genre}</p>
                    <div class="btn-wrapper">
                        <button class="remove-btn" data-movie-id="${movie}">-</button>
                        <p>Remove<p>
                    </div>
                </div>
                <div class="movie-description">
                    <p>${data.Plot}</p>
                </div>
            </div>
        </div>
        `;
    }
    watchListContainer.innerHTML = watchListHtml;
}

renderPage();

               
document.addEventListener("click", function(e){
    if (e.target.classList.contains("remove-btn")){
        const movieID = e.target.dataset.movieId;
        const index = watchList.indexOf(movieID);
        watchList.splice(index, 1);
        localStorage.setItem("watchlist", JSON.stringify(watchList));
    }
    renderPage();
})
