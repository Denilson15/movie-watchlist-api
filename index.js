const apikey = import.meta.env.VITE_API_KEY;
const searchInput = document.getElementById("search-bar")
const searchBtn = document.getElementById("search-btn")
const searchResults = document.getElementById("results")

searchBtn.addEventListener("click", getData);

async function getData(){
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${searchInput.value}`);
    const data = await res.json();
    console.log(data);
    for(let child of searchResults.children)
        child.style.display = "none";
        
    let moviesHtml = "";
    for(let movie of data.Search){
        moviesHtml += `<h3>${movie.Title}</h3>`;
    }
    searchResults.innerHTML = moviesHtml;
}