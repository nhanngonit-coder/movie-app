// ===== DATA PHIM (DÙNG ẢNH ONLINE) =====
const movies = [
  {
    title: "Titanic",
    year: 1997,
    genre: ["Romance", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    description: "Câu chuyện tình yêu trên con tàu định mệnh Titanic."
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    genre: ["Action", "Sci-Fi"],
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    description: "Biệt đội Avengers chiến đấu cứu vũ trụ."
  },
  {
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi"],
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    description: "Đánh cắp giấc mơ trong giấc mơ."
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description: "Batman đối đầu Joker."
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: ["Sci-Fi", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description: "Du hành không gian tìm hành tinh mới."
  },
  {
    title: "Parasite",
    year: 2019,
    genre: ["Drama"],
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    description: "Bộ phim Oscar về khoảng cách giàu nghèo."
  }
];

// ===== DOM =====
const movieList = document.getElementById("movieList");
const genreFilters = document.getElementById("genreFilters");
const searchInput = document.getElementById("search");

let selectedGenres = [];

// ===== HIỂN THỊ PHIM =====
function renderMovies(data) {
  movieList.innerHTML = "";

  if (data.length === 0) {
    movieList.innerHTML = "<p>Không tìm thấy phim 😢</p>";
    return;
  }

  data.forEach(movie => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
    `;

    div.onclick = () => openModal(movie);

    movieList.appendChild(div);
  });
}

// ===== GENRE FILTER =====
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

// ===== FILTER LOGIC =====
function filterMovies() {
  let result = movies;

  // lọc theo genre
  if (selectedGenres.length > 0) {
    result = result.filter(m =>
      selectedGenres.some(g => m.genre.includes(g))
    );
  }

  // lọc theo search
  const keyword = searchInput.value.toLowerCase();
  result = result.filter(m =>
    m.title.toLowerCase().includes(keyword)
  );

  renderMovies(result);
}

// ===== DEBOUNCE =====
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

// ===== MODAL =====
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");

function openModal(movie) {
  modal.classList.remove("hidden");

  modalBody.innerHTML = `
    <h2>${movie.title}</h2>
    <img src="${movie.poster}" width="100%">
    <p><b>Năm:</b> ${movie.year}</p>
    <p><b>Thể loại:</b> ${movie.genre.join(", ")}</p>
    <p>${movie.description}</p>
  `;
}

document.getElementById("closeModal").onclick = () => {
  modal.classList.add("hidden");
};

// ===== DARK MODE =====
const toggle = document.getElementById("toggleMode");

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("mode", document.body.classList.contains("dark"));
};

// load lại trạng thái
if (localStorage.getItem("mode") === "true") {
  document.body.classList.add("dark");
}

// ===== INIT =====
renderMovies(movies);
renderGenres();
