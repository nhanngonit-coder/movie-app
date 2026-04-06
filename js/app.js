const movies = [
  {
    title: "Titanic",
    year: 1997,
    genre: ["Romance", "Drama"],
    poster: "images/titanic.jpg",
    description: "Phim tình cảm kinh điển"
  },
  {
    title: "Avengers",
    year: 2019,
    genre: ["Action", "Sci-Fi"],
    poster: "images/avengers.jpg",
    description: "Siêu anh hùng Marvel"
  }
];

const movieList = document.getElementById("movieList");
const genreFilters = document.getElementById("genreFilters");
const searchInput = document.getElementById("search");

let selectedGenres = [];

/* HIỂN THỊ PHIM */
function renderMovies(data) {
  movieList.innerHTML = "";
  data.forEach(movie => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${movie.poster}">
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
    `;

    div.onclick = () => openModal(movie);
    movieList.appendChild(div);
  });
}

/* LẤY GENRE */
function renderGenres() {
  const genres = [...new Set(movies.flatMap(m => m.genre))];

  genres.forEach(g => {
    const label = document.createElement("label");

    label.innerHTML = `
      <input type="checkbox" value="${g}"> ${g}
    `;

    label.querySelector("input").onchange = (e) => {
      if (e.target.checked) {
        selectedGenres.push(g);
      } else {
        selectedGenres = selectedGenres.filter(x => x !== g);
      }
      filterMovies();
    };

    genreFilters.appendChild(label);
  });
}

/* FILTER */
function filterMovies() {
  let result = movies;

  if (selectedGenres.length > 0) {
    result = result.filter(m =>
      selectedGenres.some(g => m.genre.includes(g))
    );
  }

  const keyword = searchInput.value.toLowerCase();
  result = result.filter(m =>
    m.title.toLowerCase().includes(keyword)
  );

  renderMovies(result);
}

/* DEBOUNCE */
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

searchInput.addEventListener(
  "input",
  debounce(filterMovies, 400)
);

/* MODAL */
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

function openModal(movie) {
  modal.classList.remove("hidden");

  modalBody.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="${movie.poster}" width="200">
    <p>${movie.description}</p>
  `;
}

document.getElementById("closeModal").onclick = () => {
  modal.classList.add("hidden");
};

/* DARK MODE */
const toggle = document.getElementById("toggleMode");

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("mode", document.body.classList.contains("dark"));
};

if (localStorage.getItem("mode") === "true") {
  document.body.classList.add("dark");
}

/* INIT */
renderMovies(movies);
renderGenres();
