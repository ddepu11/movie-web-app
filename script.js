const moviesURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=1ceba6e7e89a5257b3c318819850da51&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1";

const posterURL = "https://image.tmdb.org/t/p/w500";

const searchURL =
  "https://api.themoviedb.org/3/search/movie?api_key=1ceba6e7e89a5257b3c318819850da51&query=";

const trendingURL =
  "https://api.themoviedb.org/3/trending/all/day?api_key=1ceba6e7e89a5257b3c318819850da51";

const hero = document.getElementById("hero");
const form = document.querySelector("form");
const query = document.querySelector("input");
const trending = document.getElementById("trending");
let reviewBtn;

// Showing movies in DOM
const showMoviesInDOM = (movies) => {
  hero.innerHTML = "";
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie");
    const data = `
    <div class="poster">
      <img src="${posterURL}${movie.poster_path}" />

      <div class="title">
        <h3>${movie.title}</h3>
      </div>
    
    </div>
    <div class="info ">
      <h2>${movie.title}</h2>
      <p class="date"><strong>Releasing:</strong> ${movie.release_date}</p>
      <p class="vote"><strong>ImDB Rating:</strong> ${movie.vote_average}</p>
      <p><strong>Overview:</strong> ${movie.overview}</p>
      <button class="review-btn" data-movieId="${movie.id}">Show Reviews</button>
    </div>
    `;
    div.innerHTML = data;
    hero.appendChild(div);
  });
  reviewBtn = document.querySelectorAll(".review-btn");
  fetchReviews(reviewBtn);
};

// Fetching movies
const getMovies = async (moviesURL) => {
  const res = await fetch(moviesURL);
  const data = await res.json();

  // console.log(data);
  showMoviesInDOM(data.results);
};

getMovies(moviesURL);

// Event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if ((query.value !== null) & (query.value !== "")) {
    getMovies(searchURL + `${query.value}`);
  }

  query.value = "";
});

// Show Trending Movies
trending.addEventListener("click", () => {
  getMovies(trendingURL);
});

// Fetching Reviews by Movie ID
function fetchReviews(reviewBtns) {
  reviewBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      
      const id = btn.getAttribute("data-movieId");
      let reviewsURL = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=1ceba6e7e89a5257b3c318819850da51&language=en-US&page=1`;

      const res = await fetch(reviewsURL);
      const data = await res.json();

      // console.log(data.results);
      showReviewsInDOM(data.results);
    });
  });
}

// Showing reviews in DOM
function showReviewsInDOM(reviews) {
  reviews.forEach((review) => {
    console.log(review);
  });
}
