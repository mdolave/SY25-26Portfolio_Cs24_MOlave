// ghibli-movies.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const movieForm = document.getElementById('movieForm');
    const titleInput = document.getElementById('title');
    const yearInput = document.getElementById('year');
    const genreSelect = document.getElementById('genre');
    const ratingInput = document.getElementById('rating');
    const starRating = document.getElementById('starRating');
    const stars = starRating.querySelectorAll('i');
    const addMovieBtn = document.getElementById('addMovie');
    const clearFormBtn = document.getElementById('clearForm');
    const movieList = document.getElementById('movieList');

    // Load movies from localStorage on page load
    loadMovies();

    // Star Rating Interaction
    stars.forEach(star => {
        // Click event
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            setRating(rating);
        });

        // Hover events
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });

        star.addEventListener('mouseleave', function() {
            const currentRating = parseInt(ratingInput.value) || 0;
            highlightStars(currentRating);
        });
    });

    // Function to set rating
    function setRating(rating) {
        ratingInput.value = rating;
        highlightStars(rating);
    }

    // Function to highlight stars
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            const starRating = index + 1;
            if (starRating <= rating) {
                star.className = 'fa fa-star';
            } else {
                star.className = 'fa fa-star-o';
            }
        });
    }

    // Clear form
    clearFormBtn.addEventListener('click', function() {
        movieForm.reset();
        setRating(0);
    });

    // Add Movie
    movieForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        const title = titleInput.value.trim();
        const year = yearInput.value.trim();
        const genre = genreSelect.value;
        const rating = ratingInput.value;

        if (!title || !year || !genre || rating === '0') {
            alert('Please fill in all fields and select a rating!');
            return;
        }

        // Create movie object
        const movie = {
            id: Date.now(),
            title: title,
            year: year,
            genre: genre,
            rating: parseInt(rating)
        };

        // Save to localStorage
        saveMovie(movie);

        // Clear form
        movieForm.reset();
        setRating(0);

        // Reload movie list
        loadMovies();
    });

    // Function to save movie to localStorage
    function saveMovie(movie) {
        let movies = JSON.parse(localStorage.getItem('movies')) || [];
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    // Function to load movies from localStorage
    function loadMovies() {
        const movies = JSON.parse(localStorage.getItem('movies')) || [];
        displayMovies(movies);
    }

    // Function to display movies
    function displayMovies(movies) {
        if (movies.length === 0) {
            movieList.innerHTML = '<div class="empty-state">No movies added yet. Add your first Ghibli movie!</div>';
            return;
        }

        let movieHTML = '';
        movies.forEach(movie => {
            movieHTML += createMovieCard(movie);
        });
        movieList.innerHTML = movieHTML;
    }

    // Function to create movie card HTML
    function createMovieCard(movie) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= movie.rating) {
                stars.push('<i class="fa fa-star"></i>');
            } else {
                stars.push('<i class="fa fa-star-o"></i>');
            }
        }

        return `
            <div class="movie-card" data-id="${movie.id}">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-year">${movie.year}</div>
                <span class="movie-genre">${movie.genre}</span>
                <div class="movie-rating">
                    ${stars.join('')}
                </div>
            </div>
        `;
    }

    // Optional: Add sample data for demonstration
    function addSampleMovies() {
        const sampleMovies = [
            { id: 1, title: 'Spirited Away', year: '2001', genre: 'Fantasy', rating: 5 },
            { id: 2, title: 'My Neighbor Totoro', year: '1988', genre: 'Family', rating: 5 },
            { id: 3, title: 'Howl\'s Moving Castle', year: '2004', genre: 'Fantasy', rating: 4 }
        ];
        
        if (!localStorage.getItem('movies')) {
            localStorage.setItem('movies', JSON.stringify(sampleMovies));
        }
    }

    // Uncomment to add sample movies on first load
    // addSampleMovies();
});